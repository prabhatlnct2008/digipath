"""Flask application factory."""
import os
from flask import Flask
from app.config import config
from app.extensions import db, migrate, jwt, cors


def create_app(config_name=None):
    """
    Create and configure the Flask application.

    Args:
        config_name (str): Configuration name (development, production, testing)

    Returns:
        Flask: Configured Flask application instance
    """
    # Determine configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')

    # Create Flask app
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config[config_name])

    # Initialize extensions
    initialize_extensions(app)

    # Register blueprints (placeholder for Phase 2)
    # register_blueprints(app)

    # Register error handlers
    register_error_handlers(app)

    # Add health check route
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'service': 'digipath-backend'}, 200

    return app


def initialize_extensions(app):
    """Initialize Flask extensions."""
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, origins=app.config['CORS_ORIGINS'])

    # Import models to ensure they are registered with SQLAlchemy
    with app.app_context():
        from app.models import AdminUser, Speaker, Tag, Session, Recording


def register_error_handlers(app):
    """Register error handlers."""
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Resource not found'}, 404

    @app.errorhandler(500)
    def internal_error(error):
        return {'error': 'Internal server error'}, 500

    @app.errorhandler(400)
    def bad_request(error):
        return {'error': 'Bad request'}, 400

    @app.errorhandler(403)
    def forbidden(error):
        return {'error': 'Forbidden'}, 403

    @app.errorhandler(401)
    def unauthorized(error):
        return {'error': 'Unauthorized'}, 401
