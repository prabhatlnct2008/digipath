"""Public endpoints for website visitors."""
from flask import Blueprint, request, jsonify, Response
from datetime import date
from sqlalchemy import or_, desc, asc, extract

from app.services import SessionService, RecordingService, CalendarService, TagService
from app.schemas import SessionResponseSchema, RecordingResponseSchema, TagResponseSchema
from app.utils.errors import NotFoundError

bp = Blueprint('public', __name__, url_prefix='/public')

# Initialize schemas
session_schema = SessionResponseSchema()
recording_schema = RecordingResponseSchema()
tag_schema = TagResponseSchema()


def serialize_session(session):
    """Helper to serialize a session with all relationships."""
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None
    return session_schema.dump(session_dict)


def serialize_recording_with_session(recording):
    """Helper to serialize a recording with full session info including tags."""
    recording_dict = recording.to_dict()
    if recording.session:
        session = recording.session
        recording_dict['session'] = {
            'id': session.id,
            'title': session.title,
            'summary': session.summary,
            'abstract': session.abstract,
            'objectives': session.objectives,
            'date': session.date.isoformat(),
            'time': session.time.isoformat(),
            'duration_minutes': session.duration_minutes,
            'status': session.status,
            'speaker': session.speaker.to_dict() if session.speaker else None,
            'organ_tag': session.organ_tag.to_dict() if session.organ_tag else None,
            'type_tag': session.type_tag.to_dict() if session.type_tag else None,
            'level_tag': session.level_tag.to_dict() if session.level_tag else None,
        }
        # Also add flattened fields for easier frontend access
        recording_dict['title'] = session.title
        recording_dict['abstract'] = session.abstract
        recording_dict['objectives'] = session.objectives
        recording_dict['date'] = session.date.isoformat()
        recording_dict['duration_minutes'] = session.duration_minutes
        recording_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
        recording_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
        recording_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
        recording_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    return recording_schema.dump(recording_dict)


@bp.route('/home', methods=['GET'])
def get_home_data():
    """
    Get landing page data (recent sessions and recordings).

    Returns:
        200: Home page data with recent sessions and recordings
    """
    from app.models import Recording, Session

    # Get upcoming published sessions (limit 4)
    upcoming_sessions = SessionService.list_upcoming_sessions()[:4]

    # Get recent recordings (limit 4)
    recent_recordings = Recording.query.order_by(
        Recording.recorded_date.desc()
    ).limit(4).all()

    # Get stats
    total_sessions = Session.query.count()
    total_recordings = Recording.query.count()

    # Serialize data
    sessions_data = [serialize_session(s) for s in upcoming_sessions]
    recordings_data = [serialize_recording_with_session(r) for r in recent_recordings]

    return jsonify({
        'upcoming_sessions': sessions_data,
        'recent_recordings': recordings_data,
        'stats': {
            'total_sessions': total_sessions,
            'total_recordings': total_recordings
        }
    }), 200


@bp.route('/sessions/upcoming', methods=['GET'])
def list_upcoming_sessions():
    """
    List published upcoming sessions with optional filters and search.

    Query Parameters:
        organ_tag_id: Filter by organ tag
        type_tag_id: Filter by type tag
        level_tag_id: Filter by level tag
        search: Search in title, summary, abstract, speaker name, tag labels
        page: Page number (default: 1)
        per_page: Items per page (default: 20)

    Returns:
        200: Paginated list of upcoming sessions
    """
    from app.models import Session, Speaker, Tag

    # Build base query for published upcoming sessions
    query = Session.query.filter(
        Session.status == 'published',
        Session.date >= date.today()
    )

    # Apply tag filters
    if request.args.get('organ_tag_id'):
        query = query.filter(Session.organ_tag_id == request.args.get('organ_tag_id'))
    if request.args.get('type_tag_id'):
        query = query.filter(Session.type_tag_id == request.args.get('type_tag_id'))
    if request.args.get('level_tag_id'):
        query = query.filter(Session.level_tag_id == request.args.get('level_tag_id'))

    # Apply search filter
    search = request.args.get('search', '').strip()
    if search:
        search_pattern = f'%{search}%'
        query = query.outerjoin(Speaker, Session.speaker_id == Speaker.id)
        query = query.outerjoin(Tag, or_(
            Session.organ_tag_id == Tag.id,
            Session.type_tag_id == Tag.id,
            Session.level_tag_id == Tag.id
        ))
        query = query.filter(or_(
            Session.title.ilike(search_pattern),
            Session.summary.ilike(search_pattern),
            Session.abstract.ilike(search_pattern),
            Speaker.name.ilike(search_pattern),
            Tag.label.ilike(search_pattern)
        )).distinct()

    # Order by date ascending (soonest first)
    query = query.order_by(Session.date, Session.time)

    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    # Get total count before pagination
    total = query.count()

    # Paginate
    sessions = query.offset((page - 1) * per_page).limit(per_page).all()

    # Serialize
    sessions_data = [serialize_session(s) for s in sessions]

    return jsonify({
        'items': sessions_data,
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': (total + per_page - 1) // per_page if per_page > 0 else 0
    }), 200


@bp.route('/sessions/<session_id>', methods=['GET'])
def get_session_detail(session_id):
    """
    Get session detail.

    Args:
        session_id: ID of the session

    Returns:
        200: Session detail
        404: Session not found or not published
    """
    session = SessionService.get_session(session_id)

    # Only allow access to published or completed sessions
    if session.status != 'published' and session.status != 'completed':
        raise NotFoundError('Session not found', 'SESSION_NOT_FOUND')

    return jsonify(serialize_session(session)), 200


@bp.route('/sessions/<session_id>/calendar', methods=['GET'])
def download_calendar(session_id):
    """
    Download ICS calendar file for a session.

    Args:
        session_id: ID of the session

    Returns:
        200: ICS file download
        404: Session not found or not published
    """
    session = SessionService.get_session(session_id)

    # Only allow access to published sessions
    if session.status != 'published':
        raise NotFoundError('Session not found or not available', 'SESSION_NOT_FOUND')

    # Generate ICS content
    ics_content = CalendarService.generate_ics(session)

    # Return as downloadable file
    filename = f"session-{session_id}.ics"
    return Response(
        ics_content,
        mimetype='text/calendar',
        headers={
            'Content-Disposition': f'attachment; filename={filename}'
        }
    )


@bp.route('/recordings', methods=['GET'])
def list_recordings():
    """
    List recordings with optional filters, search, and sorting.

    Query Parameters:
        organ_tag_id: Filter by organ tag
        type_tag_id: Filter by type tag
        level_tag_id: Filter by level tag
        year: Filter by recording year
        search: Search in title, speaker name, tags
        sort_by: Sort by (newest, oldest, most_viewed) - default: newest
        page: Page number (default: 1)
        per_page: Items per page (default: 20)

    Returns:
        200: Paginated list of recordings
    """
    from app.models import Recording, Session, Speaker, Tag

    # Build query
    query = Recording.query.join(Session)

    # Apply tag filters
    if request.args.get('organ_tag_id'):
        query = query.filter(Session.organ_tag_id == request.args.get('organ_tag_id'))
    if request.args.get('type_tag_id'):
        query = query.filter(Session.type_tag_id == request.args.get('type_tag_id'))
    if request.args.get('level_tag_id'):
        query = query.filter(Session.level_tag_id == request.args.get('level_tag_id'))

    # Apply year filter
    year = request.args.get('year', type=int)
    if year:
        query = query.filter(extract('year', Recording.recorded_date) == year)

    # Apply search filter
    search = request.args.get('search', '').strip()
    if search:
        search_pattern = f'%{search}%'
        query = query.outerjoin(Speaker, Session.speaker_id == Speaker.id)
        query = query.outerjoin(Tag, or_(
            Session.organ_tag_id == Tag.id,
            Session.type_tag_id == Tag.id,
            Session.level_tag_id == Tag.id
        ))
        query = query.filter(or_(
            Session.title.ilike(search_pattern),
            Session.summary.ilike(search_pattern),
            Speaker.name.ilike(search_pattern),
            Tag.label.ilike(search_pattern)
        )).distinct()

    # Apply sorting
    sort_by = request.args.get('sort_by', 'newest')
    if sort_by == 'oldest':
        query = query.order_by(asc(Recording.recorded_date))
    elif sort_by == 'most_viewed':
        query = query.order_by(desc(Recording.views_count))
    else:  # newest (default)
        query = query.order_by(desc(Recording.recorded_date))

    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    # Get total count
    total = query.count()

    # Paginate
    recordings = query.offset((page - 1) * per_page).limit(per_page).all()

    # Serialize recordings
    recordings_data = [serialize_recording_with_session(r) for r in recordings]

    return jsonify({
        'items': recordings_data,
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': (total + per_page - 1) // per_page if per_page > 0 else 0
    }), 200


@bp.route('/recordings/<recording_id>', methods=['GET'])
def get_recording_detail(recording_id):
    """
    Get recording detail.

    Args:
        recording_id: ID of the recording (or session_id)

    Returns:
        200: Recording detail with full session info
        404: Recording not found
    """
    from app.models import Recording, Session
    from app.extensions import db

    # Try to find by recording ID first
    recording = Recording.query.get(recording_id)

    # If not found, try to find by session_id
    if not recording:
        recording = Recording.query.filter_by(session_id=recording_id).first()

    if not recording:
        raise NotFoundError('Recording not found', 'RECORDING_NOT_FOUND')

    # Increment view count
    recording.views_count += 1
    db.session.commit()

    return jsonify(serialize_recording_with_session(recording)), 200


@bp.route('/tags', methods=['GET'])
def get_tags():
    """
    Get all active tags grouped by category.

    Returns:
        200: Tags grouped by category (organ, type, level)
    """
    tags_grouped = TagService.get_tags_grouped()

    # Serialize - use to_dict() for consistent field names
    response_data = {
        'organ': [tag.to_dict() for tag in tags_grouped['organ']],
        'type': [tag.to_dict() for tag in tags_grouped['type']],
        'level': [tag.to_dict() for tag in tags_grouped['level']]
    }

    return jsonify(response_data), 200
