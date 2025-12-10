"""Speaker schemas for speaker management."""
from marshmallow import Schema, fields, validate


class SpeakerCreateSchema(Schema):
    """Schema for creating a new speaker."""
    name = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    designation = fields.Str(required=True, validate=validate.Length(min=1, max=300))
    is_aiims = fields.Bool(required=False, dump_default=True)


class SpeakerUpdateSchema(Schema):
    """Schema for updating a speaker (all fields optional)."""
    name = fields.Str(required=False, validate=validate.Length(min=1, max=200))
    designation = fields.Str(required=False, validate=validate.Length(min=1, max=300))
    is_aiims = fields.Bool(required=False)


class SpeakerResponseSchema(Schema):
    """Schema for speaker response."""
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    designation = fields.Str(required=True)
    is_aiims = fields.Bool(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
