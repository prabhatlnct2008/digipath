"""Admin endpoints for tag management."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError as MarshmallowValidationError

from app.services import TagService
from app.schemas import (
    TagCreateSchema,
    TagUpdateSchema,
    TagResponseSchema,
    TagUsageResponseSchema
)
from app.utils.errors import ValidationError

bp = Blueprint('admin_tags', __name__, url_prefix='/admin/tags')

# Initialize schemas
tag_create_schema = TagCreateSchema()
tag_update_schema = TagUpdateSchema()
tag_response_schema = TagResponseSchema()
tag_usage_schema = TagUsageResponseSchema()


@bp.route('', methods=['GET'])
@jwt_required()
def list_tags():
    """
    List all tags.

    Query Parameters:
        category: Filter by category (organ, type, level)
        active_only: Only return active tags (true/false)

    Returns:
        200: List of tags
    """
    category = request.args.get('category')
    active_only = request.args.get('active_only', '').lower() == 'true'

    tags = TagService.list_tags(category=category, active_only=active_only)

    # Serialize
    tags_data = [tag_response_schema.dump(tag.to_dict()) for tag in tags]

    return jsonify({'tags': tags_data}), 200


@bp.route('', methods=['POST'])
@jwt_required()
def create_tag():
    """
    Create a new tag.

    Request Body:
        TagCreateSchema

    Returns:
        201: Tag created
        400: Validation error or duplicate
    """
    # Validate request data
    try:
        data = tag_create_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Create tag
    tag = TagService.create_tag(data)

    return jsonify(tag_response_schema.dump(tag.to_dict())), 201


@bp.route('/<tag_id>', methods=['PUT'])
@jwt_required()
def update_tag(tag_id):
    """
    Update a tag.

    Args:
        tag_id: ID of the tag

    Request Body:
        TagUpdateSchema

    Returns:
        200: Tag updated
        400: Validation error or duplicate
        404: Tag not found
    """
    # Validate request data
    try:
        data = tag_update_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise ValidationError(f"Validation failed: {e.messages}")

    # Update tag
    tag = TagService.update_tag(tag_id, data)

    return jsonify(tag_response_schema.dump(tag.to_dict())), 200


@bp.route('/<tag_id>', methods=['DELETE'])
@jwt_required()
def delete_tag(tag_id):
    """
    Delete a tag (only if not in use).

    Args:
        tag_id: ID of the tag

    Returns:
        204: Tag deleted
        400: Tag is in use
        404: Tag not found
    """
    TagService.delete_tag(tag_id)
    return '', 204


@bp.route('/<tag_id>/usage', methods=['GET'])
@jwt_required()
def get_tag_usage(tag_id):
    """
    Get tag usage information.

    Args:
        tag_id: ID of the tag

    Returns:
        200: Tag usage information
        404: Tag not found
    """
    usage_info = TagService.get_tag_usage(tag_id)

    return jsonify(tag_usage_schema.dump(usage_info)), 200
