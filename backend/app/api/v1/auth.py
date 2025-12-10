"""Authentication endpoints."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from marshmallow import ValidationError as MarshmallowValidationError

from app.models import AdminUser
from app.schemas import LoginRequestSchema, TokenResponseSchema, AdminUserResponseSchema
from app.utils.errors import AuthError, NotFoundError

bp = Blueprint('auth', __name__, url_prefix='/auth')

# Initialize schemas
login_schema = LoginRequestSchema()
token_schema = TokenResponseSchema()
admin_user_schema = AdminUserResponseSchema()


@bp.route('/login', methods=['POST'])
def login():
    """
    Admin user login.

    Request Body:
        {
            "email": "admin@example.com",
            "password": "password123"
        }

    Returns:
        200: Login successful with JWT tokens
        400: Validation error
        401: Invalid credentials
    """
    # Validate request data
    try:
        data = login_schema.load(request.json)
    except MarshmallowValidationError as e:
        raise AuthError('Invalid login credentials', 'INVALID_CREDENTIALS')

    # Find user by email
    user = AdminUser.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        raise AuthError('Invalid email or password', 'INVALID_CREDENTIALS')

    # Create JWT tokens
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    # Return tokens
    response_data = token_schema.dump({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'token_type': 'bearer'
    })

    return jsonify(response_data), 200


@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """
    Refresh access token using refresh token.

    Headers:
        Authorization: Bearer <refresh_token>

    Returns:
        200: New access token
        401: Invalid or expired refresh token
    """
    current_user_id = get_jwt_identity()

    # Create new access token
    access_token = create_access_token(identity=current_user_id)

    response_data = {
        'access_token': access_token,
        'token_type': 'bearer'
    }

    return jsonify(response_data), 200


@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Logout (token blacklisting can be implemented here if needed).

    Headers:
        Authorization: Bearer <access_token>

    Returns:
        200: Logout successful
    """
    # Note: Token blacklisting would require additional setup with Redis or similar
    # For now, just return success - client should delete the token
    return jsonify({'message': 'Logged out successfully'}), 200


@bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """
    Get current authenticated admin user information.

    Headers:
        Authorization: Bearer <access_token>

    Returns:
        200: User information
        401: Invalid or expired token
        404: User not found
    """
    current_user_id = get_jwt_identity()

    # Get user from database
    user = AdminUser.query.get(current_user_id)
    if not user:
        raise NotFoundError('User not found', 'USER_NOT_FOUND')

    # Return user data
    response_data = admin_user_schema.dump(user)
    return jsonify(response_data), 200
