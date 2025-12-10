"""Tag schemas for tag management."""
from marshmallow import Schema, fields, validate


class TagCreateSchema(Schema):
    """Schema for creating a new tag."""
    category = fields.Str(
        required=True,
        validate=validate.OneOf(['organ', 'type', 'level'])
    )
    label = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    is_active = fields.Bool(required=False, dump_default=True)


class TagUpdateSchema(Schema):
    """Schema for updating a tag (all fields optional)."""
    label = fields.Str(required=False, validate=validate.Length(min=1, max=100))
    is_active = fields.Bool(required=False)


class TagResponseSchema(Schema):
    """Schema for tag response."""
    id = fields.Str(required=True)
    category = fields.Str(required=True)
    label = fields.Str(required=True)
    is_active = fields.Bool(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)


class TagUsageResponseSchema(Schema):
    """Schema for tag usage count response."""
    tag_id = fields.Str(required=True)
    category = fields.Str(required=True)
    label = fields.Str(required=True)
    usage_count = fields.Int(required=True)
    can_delete = fields.Bool(required=True)
