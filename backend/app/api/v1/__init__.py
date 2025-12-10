"""API v1 blueprint initialization and registration."""
from flask import Blueprint

# Create main v1 blueprint
api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1')


def register_blueprints(app):
    """
    Register all v1 API blueprints with the Flask app.

    Args:
        app: Flask application instance
    """
    from app.api.v1 import auth, public, admin_sessions, admin_recordings, admin_speakers, admin_tags

    # Register sub-blueprints
    api_v1.register_blueprint(auth.bp)
    api_v1.register_blueprint(public.bp)
    api_v1.register_blueprint(admin_sessions.bp)
    api_v1.register_blueprint(admin_recordings.bp)
    api_v1.register_blueprint(admin_speakers.bp)
    api_v1.register_blueprint(admin_tags.bp)

    # Register main v1 blueprint with app
    app.register_blueprint(api_v1)
