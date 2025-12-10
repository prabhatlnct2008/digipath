"""Authentication and authorization decorators."""
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from app.models.admin_user import AdminUser


def admin_required(fn):
    """
    Decorator to require admin authentication.

    Verifies JWT token and checks that the user exists and is an admin.
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Verify JWT is present and valid
        verify_jwt_in_request()

        # Get the identity from the JWT
        current_user_id = get_jwt_identity()

        # Load the user from the database
        user = AdminUser.query.get(current_user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        if user.role not in ['admin', 'super_admin']:
            return jsonify({'error': 'Admin access required'}), 403

        # Pass the user to the route handler
        return fn(current_user=user, *args, **kwargs)

    return wrapper


def super_admin_required(fn):
    """
    Decorator to require super admin authentication.

    Verifies JWT token and checks that the user exists and is a super admin.
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Verify JWT is present and valid
        verify_jwt_in_request()

        # Get the identity from the JWT
        current_user_id = get_jwt_identity()

        # Load the user from the database
        user = AdminUser.query.get(current_user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        if user.role != 'super_admin':
            return jsonify({'error': 'Super admin access required'}), 403

        # Pass the user to the route handler
        return fn(current_user=user, *args, **kwargs)

    return wrapper
