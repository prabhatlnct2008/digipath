"""Admin endpoints for recording management."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError as MarshmallowValidationError

from app.services import RecordingService
from app.schemas import (
    RecordingCreateSchema,
    RecordingUpdateSchema,
    RecordingResponseSchema
)
from app.utils.errors import ValidationError

bp = Blueprint('admin_recordings', __name__, url_prefix='/admin/recordings')

# Initialize schemas
recording_create_schema = RecordingCreateSchema()
recording_update_schema = RecordingUpdateSchema()
recording_response_schema = RecordingResponseSchema()


@bp.route('', methods=['POST'])
@jwt_required()
def create_recording():
    """
    Add a recording to a session.

    Request Body:
        RecordingCreateSchema

    Returns:
        201: Recording created
        400: Validation error
        409: Recording already exists for session
    """
    # Validate request data
    try:
        data = recording_create_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Create recording
    recording = RecordingService.add_recording(data['session_id'], data)

    # Serialize response
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

    return jsonify(recording_response_schema.dump(recording_dict)), 201


@bp.route('/<recording_id>', methods=['PUT'])
@jwt_required()
def update_recording(recording_id):
    """
    Update a recording.

    Args:
        recording_id: ID of the recording

    Request Body:
        RecordingUpdateSchema

    Returns:
        200: Recording updated
        400: Validation error
        404: Recording not found
    """
    # Validate request data
    try:
        data = recording_update_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Update recording
    recording = RecordingService.update_recording(recording_id, data)

    # Serialize response
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

    return jsonify(recording_response_schema.dump(recording_dict)), 200


@bp.route('/<recording_id>', methods=['DELETE'])
@jwt_required()
def delete_recording(recording_id):
    """
    Delete a recording.

    Args:
        recording_id: ID of the recording

    Returns:
        204: Recording deleted
        404: Recording not found
    """
    RecordingService.delete_recording(recording_id)
    return '', 204
