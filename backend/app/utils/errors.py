"""Custom error classes and error handling utilities."""


class APIError(Exception):
    """Base class for API errors."""

    def __init__(self, message: str, code: str = None, status_code: int = 500):
        """
        Initialize API error.

        Args:
            message: Error message
            code: Error code identifier
            status_code: HTTP status code
        """
        super().__init__(message)
        self.message = message
        self.code = code or self.__class__.__name__
        self.status_code = status_code

    def to_dict(self):
        """Convert error to dictionary for JSON response."""
        return {
            'error': {
                'code': self.code,
                'message': self.message
            }
        }


class ValidationError(APIError):
    """Raised when request validation fails."""

    def __init__(self, message: str, code: str = 'VALIDATION_ERROR'):
        """Initialize validation error."""
        super().__init__(message, code, 400)


class NotFoundError(APIError):
    """Raised when a resource is not found."""

    def __init__(self, message: str, code: str = 'NOT_FOUND'):
        """Initialize not found error."""
        super().__init__(message, code, 404)


class AuthError(APIError):
    """Raised when authentication or authorization fails."""

    def __init__(self, message: str, code: str = 'AUTH_ERROR'):
        """Initialize authentication error."""
        super().__init__(message, code, 401)


class ForbiddenError(APIError):
    """Raised when access is forbidden."""

    def __init__(self, message: str, code: str = 'FORBIDDEN'):
        """Initialize forbidden error."""
        super().__init__(message, code, 403)


class ConflictError(APIError):
    """Raised when there's a conflict (e.g., duplicate resource)."""

    def __init__(self, message: str, code: str = 'CONFLICT'):
        """Initialize conflict error."""
        super().__init__(message, code, 409)


def register_error_handlers(app):
    """
    Register error handlers for the Flask application.

    Args:
        app: Flask application instance
    """
    from flask import jsonify
    from marshmallow import ValidationError as MarshmallowValidationError
    from werkzeug.exceptions import HTTPException

    @app.errorhandler(APIError)
    def handle_api_error(error):
        """Handle custom API errors."""
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(MarshmallowValidationError)
    def handle_marshmallow_error(error):
        """Handle Marshmallow validation errors."""
        return jsonify({
            'error': {
                'code': 'VALIDATION_ERROR',
                'message': 'Request validation failed',
                'details': error.messages
            }
        }), 400

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        """Handle Werkzeug HTTP exceptions."""
        return jsonify({
            'error': {
                'code': error.name.upper().replace(' ', '_'),
                'message': error.description
            }
        }), error.code

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        """Handle unexpected errors."""
        # Log the error
        app.logger.error(f"Unexpected error: {str(error)}", exc_info=True)

        # Don't expose internal error details in production
        if app.config.get('DEBUG'):
            message = str(error)
        else:
            message = 'An unexpected error occurred'

        return jsonify({
            'error': {
                'code': 'INTERNAL_ERROR',
                'message': message
            }
        }), 500
