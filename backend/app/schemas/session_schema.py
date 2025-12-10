"""Session schemas for session management."""
from marshmallow import Schema, fields, validate


class SessionCreateSchema(Schema):
    """Schema for creating a new session."""
    title = fields.Str(required=True, validate=validate.Length(min=1, max=300))
    summary = fields.Str(required=True, validate=validate.Length(min=1))
    abstract = fields.Str(required=True, validate=validate.Length(min=1))
    objectives = fields.List(fields.Str(), required=False, allow_none=True)
    date = fields.Date(required=True)
    time = fields.Time(required=True)
    duration_minutes = fields.Int(required=True, validate=validate.Range(min=1))
    platform = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    meeting_link = fields.Str(required=False, allow_none=True, validate=validate.Length(max=500))
    meeting_id = fields.Str(required=False, allow_none=True, validate=validate.Length(max=100))
    meeting_password = fields.Str(required=False, allow_none=True, validate=validate.Length(max=100))
    speaker_id = fields.Str(required=True)
    organ_tag_id = fields.Str(required=True)
    type_tag_id = fields.Str(required=True)
    level_tag_id = fields.Str(required=True)


class SessionUpdateSchema(Schema):
    """Schema for updating a session (all fields optional for partial updates)."""
    title = fields.Str(required=False, validate=validate.Length(min=1, max=300))
    summary = fields.Str(required=False, validate=validate.Length(min=1))
    abstract = fields.Str(required=False, validate=validate.Length(min=1))
    objectives = fields.List(fields.Str(), required=False, allow_none=True)
    date = fields.Date(required=False)
    time = fields.Time(required=False)
    duration_minutes = fields.Int(required=False, validate=validate.Range(min=1))
    platform = fields.Str(required=False, validate=validate.Length(min=1, max=100))
    meeting_link = fields.Str(required=False, allow_none=True, validate=validate.Length(max=500))
    meeting_id = fields.Str(required=False, allow_none=True, validate=validate.Length(max=100))
    meeting_password = fields.Str(required=False, allow_none=True, validate=validate.Length(max=100))
    speaker_id = fields.Str(required=False)
    organ_tag_id = fields.Str(required=False)
    type_tag_id = fields.Str(required=False)
    level_tag_id = fields.Str(required=False)


class SpeakerNestedSchema(Schema):
    """Nested schema for speaker in session response."""
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    designation = fields.Str(required=True)
    is_aiims = fields.Bool(required=True)


class TagNestedSchema(Schema):
    """Nested schema for tag in session response."""
    id = fields.Str(required=True)
    category = fields.Str(required=True)
    label = fields.Str(required=True)


class RecordingNestedSchema(Schema):
    """Nested schema for recording in session response."""
    id = fields.Str(required=True)
    youtube_url = fields.Str(required=True)
    thumbnail_url = fields.Str(allow_none=True)
    pdf_url = fields.Str(allow_none=True)
    recorded_date = fields.Date(required=True)
    views_count = fields.Int(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)


class SessionResponseSchema(Schema):
    """Schema for session response."""
    id = fields.Str(required=True)
    title = fields.Str(required=True)
    summary = fields.Str(required=True)
    abstract = fields.Str(required=True)
    objectives = fields.List(fields.Str(), allow_none=True)
    date = fields.Date(required=True)
    time = fields.Time(required=True)
    duration_minutes = fields.Int(required=True)
    status = fields.Str(required=True)
    platform = fields.Str(required=True)
    meeting_link = fields.Str(allow_none=True)
    meeting_id = fields.Str(allow_none=True)
    meeting_password = fields.Str(allow_none=True)
    speaker_id = fields.Str(required=True)
    organ_tag_id = fields.Str(required=True)
    type_tag_id = fields.Str(required=True)
    level_tag_id = fields.Str(required=True)
    created_by = fields.Str(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)

    # Nested relationships
    speaker = fields.Nested(SpeakerNestedSchema, required=False, allow_none=True)
    organ_tag = fields.Nested(TagNestedSchema, required=False, allow_none=True)
    type_tag = fields.Nested(TagNestedSchema, required=False, allow_none=True)
    level_tag = fields.Nested(TagNestedSchema, required=False, allow_none=True)
    recording = fields.Nested(RecordingNestedSchema, required=False, allow_none=True)
    has_recording = fields.Bool(dump_default=False)


class SessionListSchema(Schema):
    """Schema for paginated session list response."""
    items = fields.List(fields.Nested(SessionResponseSchema), required=True)
    total = fields.Int(required=True)
    page = fields.Int(required=True)
    per_page = fields.Int(required=True)
    pages = fields.Int(required=True)
