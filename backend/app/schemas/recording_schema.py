"""Recording schemas for session recordings."""
from datetime import date
from marshmallow import Schema, fields, validate, pre_load


class RecordingCreateSchema(Schema):
    """Schema for creating a new recording."""
    session_id = fields.Str(required=True)
    youtube_url = fields.Str(required=True, validate=validate.Length(min=1, max=500))
    pdf_url = fields.Str(required=False, allow_none=True, validate=validate.Length(max=500))
    recorded_date = fields.Date(required=False, load_default=None)

    @pre_load
    def process_input(self, data, **kwargs):
        """Handle field aliases and defaults."""
        # Accept video_url as alias for youtube_url
        if 'video_url' in data and 'youtube_url' not in data:
            data['youtube_url'] = data.pop('video_url')
        # Default recorded_date to today if not provided
        if not data.get('recorded_date'):
            data['recorded_date'] = date.today().isoformat()
        return data


class RecordingUpdateSchema(Schema):
    """Schema for updating a recording (all fields optional)."""
    youtube_url = fields.Str(required=False, validate=validate.Length(min=1, max=500))
    pdf_url = fields.Str(required=False, allow_none=True, validate=validate.Length(max=500))
    recorded_date = fields.Date(required=False)


class SessionNestedSchema(Schema):
    """Nested schema for session in recording response."""
    id = fields.Str(required=True)
    title = fields.Str(required=True)
    summary = fields.Str(required=True)
    date = fields.Date(required=True)
    time = fields.Time(required=True)
    duration_minutes = fields.Int(required=True)
    status = fields.Str(required=True)
    speaker = fields.Nested('SpeakerNestedSchema', required=False, allow_none=True)


class SpeakerNestedSchema(Schema):
    """Nested schema for speaker in session."""
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    designation = fields.Str(required=True)


class RecordingResponseSchema(Schema):
    """Schema for recording response."""
    id = fields.Str(required=True)
    session_id = fields.Str(required=True)
    youtube_url = fields.Str(required=True)
    thumbnail_url = fields.Str(allow_none=True)
    pdf_url = fields.Str(allow_none=True)
    recorded_date = fields.Date(required=True)
    views_count = fields.Int(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)

    # Nested relationship
    session = fields.Nested(SessionNestedSchema, required=False, allow_none=True)
