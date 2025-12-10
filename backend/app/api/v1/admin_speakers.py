"""Admin endpoints for speaker management."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError as MarshmallowValidationError

from app.services import SpeakerService
from app.schemas import (
    SpeakerCreateSchema,
    SpeakerUpdateSchema,
    SpeakerResponseSchema
)
from app.utils.errors import ValidationError

bp = Blueprint('admin_speakers', __name__, url_prefix='/admin/speakers')

# Initialize schemas
speaker_create_schema = SpeakerCreateSchema()
speaker_update_schema = SpeakerUpdateSchema()
speaker_response_schema = SpeakerResponseSchema()


@bp.route('', methods=['GET'])
@jwt_required()
def list_speakers():
    """
    List all speakers.

    Returns:
        200: List of all speakers
    """
    speakers = SpeakerService.list_speakers()

    # Serialize
    speakers_data = [speaker_response_schema.dump(speaker.to_dict()) for speaker in speakers]

    return jsonify({'speakers': speakers_data}), 200


@bp.route('', methods=['POST'])
@jwt_required()
def create_speaker():
    """
    Create a new speaker.

    Request Body:
        SpeakerCreateSchema

    Returns:
        201: Speaker created
        400: Validation error
    """
    # Validate request data
    try:
        data = speaker_create_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Create speaker
    speaker = SpeakerService.create_speaker(data)

    return jsonify(speaker_response_schema.dump(speaker.to_dict())), 201


@bp.route('/<speaker_id>', methods=['PUT'])
@jwt_required()
def update_speaker(speaker_id):
    """
    Update a speaker.

    Args:
        speaker_id: ID of the speaker

    Request Body:
        SpeakerUpdateSchema

    Returns:
        200: Speaker updated
        400: Validation error
        404: Speaker not found
    """
    # Validate request data
    try:
        data = speaker_update_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Update speaker
    speaker = SpeakerService.update_speaker(speaker_id, data)

    return jsonify(speaker_response_schema.dump(speaker.to_dict())), 200


@bp.route('/<speaker_id>', methods=['DELETE'])
@jwt_required()
def delete_speaker(speaker_id):
    """
    Delete a speaker (only if not associated with any sessions).

    Args:
        speaker_id: ID of the speaker

    Returns:
        204: Speaker deleted
        400: Speaker is in use
        404: Speaker not found
    """
    SpeakerService.delete_speaker(speaker_id)
    return '', 204
