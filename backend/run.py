"""Application entry point."""
import os
from app import create_app

# Create the Flask application
app = create_app()

if __name__ == '__main__':
    # Get port from environment or default to 5000
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'

    # Run the application
    app.run(host='0.0.0.0', port=port, debug=debug)
