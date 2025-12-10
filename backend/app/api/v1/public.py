"""Public endpoints for website visitors."""
from flask import Blueprint, request, jsonify, Response
from datetime import date

from app.services import SessionService, RecordingService, CalendarService, TagService
from app.schemas import SessionResponseSchema, RecordingResponseSchema, TagResponseSchema
from app.utils.errors import NotFoundError

bp = Blueprint('public', __name__, url_prefix='/public')

# Initialize schemas
session_schema = SessionResponseSchema()
recording_schema = RecordingResponseSchema()
tag_schema = TagResponseSchema()


@bp.route('/home', methods=['GET'])
def get_home_data():
    """
    Get landing page data (recent sessions and recordings).

    Returns:
        200: Home page data with recent sessions and recordings
    """
    # Get upcoming published sessions (limit 6)
    upcoming_sessions = SessionService.list_upcoming_sessions()[:6]

    # Get recent recordings (limit 6)
    from app.models import Recording
    recent_recordings = Recording.query.order_by(
        Recording.recorded_date.desc()
    ).limit(6).all()

    # Serialize data
    sessions_data = []
    for session in upcoming_sessions:
        session_dict = session.to_dict()
        session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
        session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
        session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
        session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
        session_dict['has_recording'] = session.recording is not None
        sessions_data.append(session_schema.dump(session_dict))

    recordings_data = []
    for recording in recent_recordings:
        recording_dict = recording.to_dict()
        if recording.session:
            recording_dict['session'] = {
                'id': recording.session.id,
                'title': recording.session.title,
                'summary': recording.session.summary,
                'date': recording.session.date.isoformat(),
                'time': recording.session.time.isoformat(),
                'duration_minutes': recording.session.duration_minutes,
                'status': recording.session.status,
                'speaker': recording.session.speaker.to_dict() if recording.session.speaker else None
            }
        recordings_data.append(recording_schema.dump(recording_dict))

    return jsonify({
        'upcoming_sessions': sessions_data,
        'recent_recordings': recordings_data
    }), 200


@bp.route('/sessions/upcoming', methods=['GET'])
def list_upcoming_sessions():
    """
    List published upcoming sessions with optional filters.

    Query Parameters:
        organ_tag_id: Filter by organ tag
        type_tag_id: Filter by type tag
        level_tag_id: Filter by level tag

    Returns:
        200: List of upcoming sessions
    """
    # Get filters from query parameters
    filters = {}
    if request.args.get('organ_tag_id'):
        filters['organ_tag_id'] = request.args.get('organ_tag_id')
    if request.args.get('type_tag_id'):
        filters['type_tag_id'] = request.args.get('type_tag_id')
    if request.args.get('level_tag_id'):
        filters['level_tag_id'] = request.args.get('level_tag_id')

    # Get sessions
    sessions = SessionService.list_upcoming_sessions(filters)

    # Serialize with nested relationships
    sessions_data = []
    for session in sessions:
        session_dict = session.to_dict()
        session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
        session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
        session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
        session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
        session_dict['has_recording'] = session.recording is not None
        sessions_data.append(session_schema.dump(session_dict))

    return jsonify({'sessions': sessions_data}), 200


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

    # Only allow access to published sessions
    if session.status != 'published' and session.status != 'completed':
        raise NotFoundError('Session not found', 'SESSION_NOT_FOUND')

    # Serialize with nested relationships
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None

    return jsonify(session_schema.dump(session_dict)), 200


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
    List recordings with optional filters and sorting.

    Query Parameters:
        organ_tag_id: Filter by organ tag
        type_tag_id: Filter by type tag
        level_tag_id: Filter by level tag
        sort: Sort by (recent, views) - default: recent
        page: Page number (default: 1)
        per_page: Items per page (default: 20)

    Returns:
        200: List of recordings with pagination
    """
    from app.models import Recording, Session
    from sqlalchemy import desc

    # Build query
    query = Recording.query.join(Session)

    # Apply filters
    if request.args.get('organ_tag_id'):
        query = query.filter(Session.organ_tag_id == request.args.get('organ_tag_id'))
    if request.args.get('type_tag_id'):
        query = query.filter(Session.type_tag_id == request.args.get('type_tag_id'))
    if request.args.get('level_tag_id'):
        query = query.filter(Session.level_tag_id == request.args.get('level_tag_id'))

    # Apply sorting
    sort_by = request.args.get('sort', 'recent')
    if sort_by == 'views':
        query = query.order_by(desc(Recording.views_count))
    else:  # recent
        query = query.order_by(desc(Recording.recorded_date))

    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    # Paginate
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    # Serialize recordings
    recordings_data = []
    for recording in pagination.items:
        recording_dict = recording.to_dict()
        if recording.session:
            recording_dict['session'] = {
                'id': recording.session.id,
                'title': recording.session.title,
                'summary': recording.session.summary,
                'date': recording.session.date.isoformat(),
                'time': recording.session.time.isoformat(),
                'duration_minutes': recording.session.duration_minutes,
                'status': recording.session.status,
                'speaker': recording.session.speaker.to_dict() if recording.session.speaker else None
            }
        recordings_data.append(recording_schema.dump(recording_dict))

    return jsonify({
        'recordings': recordings_data,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': pagination.total,
            'pages': pagination.pages
        }
    }), 200


@bp.route('/recordings/<recording_id>', methods=['GET'])
def get_recording_detail(recording_id):
    """
    Get recording detail.

    Args:
        recording_id: ID of the recording

    Returns:
        200: Recording detail
        404: Recording not found
    """
    from app.models import Recording

    recording = Recording.query.get(recording_id)
    if not recording:
        raise NotFoundError('Recording not found', 'RECORDING_NOT_FOUND')

    # Increment view count
    recording.views_count += 1
    from app.extensions import db
    db.session.commit()

    # Serialize with session info
    recording_dict = recording.to_dict()
    if recording.session:
        recording_dict['session'] = {
            'id': recording.session.id,
            'title': recording.session.title,
            'summary': recording.session.summary,
            'date': recording.session.date.isoformat(),
            'time': recording.session.time.isoformat(),
            'duration_minutes': recording.session.duration_minutes,
            'status': recording.session.status,
            'speaker': recording.session.speaker.to_dict() if recording.session.speaker else None
        }

    return jsonify(recording_schema.dump(recording_dict)), 200


@bp.route('/tags', methods=['GET'])
def get_tags():
    """
    Get all active tags grouped by category.

    Returns:
        200: Tags grouped by category (organ, type, level)
    """
    tags_grouped = TagService.get_tags_grouped()

    # Serialize
    response_data = {
        'organ': [tag_schema.dump(tag.to_dict()) for tag in tags_grouped['organ']],
        'type': [tag_schema.dump(tag.to_dict()) for tag in tags_grouped['type']],
        'level': [tag_schema.dump(tag.to_dict()) for tag in tags_grouped['level']]
    }

    return jsonify(response_data), 200
