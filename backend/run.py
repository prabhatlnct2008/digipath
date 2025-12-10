"""Application entry point."""
import os
from dotenv import load_dotenv
from app import create_app

# Load environment variables
load_dotenv()

# Create the Flask application
app = create_app()

if __name__ == '__main__':
    # Get host and port from environment
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'

    print(f"Starting server on {host}:{port}")

    # Run the application
    app.run(host=host, port=port, debug=debug)
