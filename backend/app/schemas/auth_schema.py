"""Authentication schemas for login and token management."""
from marshmallow import Schema, fields, validate


class LoginRequestSchema(Schema):
    """Schema for login request validation."""
    email = fields.Email(required=True, validate=validate.Length(max=255))
    password = fields.Str(required=True, validate=validate.Length(min=1))


class TokenResponseSchema(Schema):
    """Schema for JWT token response."""
    access_token = fields.Str(required=True)
    refresh_token = fields.Str(required=True)
    token_type = fields.Str(dump_default="bearer")


class AdminUserResponseSchema(Schema):
    """Schema for admin user response."""
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    role = fields.Str(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
