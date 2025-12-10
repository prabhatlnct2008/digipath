"""Marshmallow schemas for request/response validation and serialization."""
from app.schemas.auth_schema import (
    LoginRequestSchema,
    TokenResponseSchema,
    AdminUserResponseSchema
)
from app.schemas.session_schema import (
    SessionCreateSchema,
    SessionUpdateSchema,
    SessionResponseSchema,
    SessionListSchema
)
from app.schemas.recording_schema import (
    RecordingCreateSchema,
    RecordingUpdateSchema,
    RecordingResponseSchema
)
from app.schemas.speaker_schema import (
    SpeakerCreateSchema,
    SpeakerUpdateSchema,
    SpeakerResponseSchema
)
from app.schemas.tag_schema import (
    TagCreateSchema,
    TagUpdateSchema,
    TagResponseSchema,
    TagUsageResponseSchema
)

__all__ = [
    'LoginRequestSchema',
    'TokenResponseSchema',
    'AdminUserResponseSchema',
    'SessionCreateSchema',
    'SessionUpdateSchema',
    'SessionResponseSchema',
    'SessionListSchema',
    'RecordingCreateSchema',
    'RecordingUpdateSchema',
    'RecordingResponseSchema',
    'SpeakerCreateSchema',
    'SpeakerUpdateSchema',
    'SpeakerResponseSchema',
    'TagCreateSchema',
    'TagUpdateSchema',
    'TagResponseSchema',
    'TagUsageResponseSchema',
]
