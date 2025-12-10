"""Admin endpoints for session management."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError as MarshmallowValidationError

from app.services import SessionService
from app.schemas import (
    SessionCreateSchema,
    SessionUpdateSchema,
    SessionResponseSchema,
    SessionListSchema
)
from app.utils.errors import ValidationError
from math import ceil

bp = Blueprint('admin_sessions', __name__, url_prefix='/admin/sessions')

# Initialize schemas
session_create_schema = SessionCreateSchema()
session_update_schema = SessionUpdateSchema()
session_response_schema = SessionResponseSchema()
session_list_schema = SessionListSchema()


@bp.route('', methods=['GET'])
@jwt_required()
def list_sessions():
    """
    List all sessions (admin view - any status).

    Query Parameters:
        status: Filter by status (draft, published, completed)
        speaker_id: Filter by speaker
        organ_tag_id: Filter by organ tag
        type_tag_id: Filter by type tag
        level_tag_id: Filter by level tag
        page: Page number (default: 1)
        per_page: Items per page (default: 20)

    Returns:
        200: Paginated list of sessions
    """
    # Get filters from query parameters
    filters = {}
    if request.args.get('status'):
        filters['status'] = request.args.get('status')
    if request.args.get('speaker_id'):
        filters['speaker_id'] = request.args.get('speaker_id')
    if request.args.get('organ_tag_id'):
        filters['organ_tag_id'] = request.args.get('organ_tag_id')
    if request.args.get('type_tag_id'):
        filters['type_tag_id'] = request.args.get('type_tag_id')
    if request.args.get('level_tag_id'):
        filters['level_tag_id'] = request.args.get('level_tag_id')

    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    pagination = {
        'page': page,
        'per_page': per_page
    }

    # Get sessions
    sessions, total = SessionService.list_sessions(filters, pagination)

    # Serialize with nested relationships
    sessions_data = []
    for session in sessions:
        session_dict = session.to_dict()
        session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
        session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
        session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
        session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
        if session.recording:
            session_dict['recording'] = session.recording.to_dict()
        session_dict['has_recording'] = session.recording is not None
        sessions_data.append(session_response_schema.dump(session_dict))

    # Create response
    response_data = session_list_schema.dump({
        'items': sessions_data,
        'total': total,
        'page': page,
        'per_page': per_page,
        'pages': ceil(total / per_page) if per_page > 0 else 0
    })

    return jsonify(response_data), 200


@bp.route('', methods=['POST'])
@jwt_required()
def create_session():
    """
    Create a new session.

    Request Body:
        SessionCreateSchema

    Returns:
        201: Session created
        400: Validation error
        401: Unauthorized
    """
    current_user_id = get_jwt_identity()

    # Validate request data
    try:
        data = session_create_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Create session
    session = SessionService.create_session(data, current_user_id)

    # Serialize response
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    session_dict['has_recording'] = False

    return jsonify(session_response_schema.dump(session_dict)), 201


@bp.route('/<session_id>', methods=['GET'])
@jwt_required()
def get_session(session_id):
    """
    Get session detail.

    Args:
        session_id: ID of the session

    Returns:
        200: Session detail
        404: Session not found
    """
    session = SessionService.get_session(session_id)

    # Serialize with nested relationships
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None

    return jsonify(session_response_schema.dump(session_dict)), 200


@bp.route('/<session_id>', methods=['PUT'])
@jwt_required()
def update_session(session_id):
    """
    Update a session.

    Args:
        session_id: ID of the session

    Request Body:
        SessionUpdateSchema (partial updates allowed)

    Returns:
        200: Session updated
        400: Validation error
        404: Session not found
    """
    # Validate request data
    try:
        data = session_update_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Update session
    session = SessionService.update_session(session_id, data)

    # Serialize response
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None

    return jsonify(session_response_schema.dump(session_dict)), 200


@bp.route('/<session_id>', methods=['DELETE'])
@jwt_required()
def delete_session(session_id):
    """
    Delete a session (only draft sessions can be deleted).

    Args:
        session_id: ID of the session

    Returns:
        204: Session deleted
        400: Cannot delete (not draft)
        404: Session not found
    """
    SessionService.delete_session(session_id)
    return '', 204


@bp.route('/<session_id>/publish', methods=['POST'])
@jwt_required()
def publish_session(session_id):
    """
    Publish a session.

    Args:
        session_id: ID of the session

    Returns:
        200: Session published
        400: Validation error (missing meeting link or past date)
        404: Session not found
    """
    session = SessionService.publish_session(session_id)

    # Serialize response
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None

    return jsonify(session_response_schema.dump(session_dict)), 200


@bp.route('/<session_id>/unpublish', methods=['POST'])
@jwt_required()
def unpublish_session(session_id):
    """
    Unpublish a session (revert to draft).

    Args:
        session_id: ID of the session

    Returns:
        200: Session unpublished
        400: Cannot unpublish completed sessions
        404: Session not found
    """
    session = SessionService.unpublish_session(session_id)

    # Serialize response
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None

    return jsonify(session_response_schema.dump(session_dict)), 200


@bp.route('/<session_id>/complete', methods=['POST'])
@jwt_required()
def complete_session(session_id):
    """
    Mark session as completed and add recording.

    Args:
        session_id: ID of the session

    Request Body:
        {
            "youtube_url": "https://youtube.com/watch?v=...",
            "pdf_url": "https://..." (optional)
        }

    Returns:
        200: Session marked as completed
        400: Validation error
        404: Session not found
    """
    data = request.json
    if not data or 'youtube_url' not in data:
        raise ValidationError("youtube_url is required")

    session = SessionService.complete_session(
        session_id,
        data['youtube_url'],
        data.get('pdf_url')
    )

    # Serialize response
    session_dict = session.to_dict()
    session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
    session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
    session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
    session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
    if session.recording:
        session_dict['recording'] = session.recording.to_dict()
    session_dict['has_recording'] = session.recording is not None

    return jsonify(session_response_schema.dump(session_dict)), 200


@bp.route('/upcoming', methods=['GET'])
@jwt_required()
def list_upcoming_sessions():
    """
    List upcoming sessions (admin view).

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
        if session.recording:
            session_dict['recording'] = session.recording.to_dict()
        session_dict['has_recording'] = session.recording is not None
        sessions_data.append(session_response_schema.dump(session_dict))

    return jsonify({'sessions': sessions_data}), 200


@bp.route('/past', methods=['GET'])
@jwt_required()
def list_past_sessions():
    """
    List past sessions (admin view) with search and pagination.

    Query Parameters:
        status: Filter by status
        organ_tag_id: Filter by organ tag
        type_tag_id: Filter by type tag
        level_tag_id: Filter by level tag
        search: Search in title, summary, abstract, speaker name, tag labels
        page: Page number (default: 1)
        per_page: Items per page (default: 20)

    Returns:
        200: Paginated list of past sessions
    """
    # Get filters from query parameters
    filters = {}
    if request.args.get('status'):
        filters['status'] = request.args.get('status')
    if request.args.get('organ_tag_id'):
        filters['organ_tag_id'] = request.args.get('organ_tag_id')
    if request.args.get('type_tag_id'):
        filters['type_tag_id'] = request.args.get('type_tag_id')
    if request.args.get('level_tag_id'):
        filters['level_tag_id'] = request.args.get('level_tag_id')
    if request.args.get('search'):
        filters['search'] = request.args.get('search')

    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    pagination = {
        'page': page,
        'per_page': per_page
    }

    # Get sessions with pagination
    sessions, total = SessionService.list_past_sessions(filters, pagination)

    # Serialize with nested relationships
    sessions_data = []
    for session in sessions:
        session_dict = session.to_dict()
        session_dict['speaker'] = session.speaker.to_dict() if session.speaker else None
        session_dict['organ_tag'] = session.organ_tag.to_dict() if session.organ_tag else None
        session_dict['type_tag'] = session.type_tag.to_dict() if session.type_tag else None
        session_dict['level_tag'] = session.level_tag.to_dict() if session.level_tag else None
        if session.recording:
            session_dict['recording'] = session.recording.to_dict()
        session_dict['has_recording'] = session.recording is not None
        sessions_data.append(session_response_schema.dump(session_dict))

    return jsonify({
        'items': sessions_data,
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': ceil(total / per_page) if per_page > 0 else 0
    }), 200
