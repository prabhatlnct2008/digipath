"""Recording service for business logic."""
import re
from typing import Dict, Optional
from app.extensions import db
from app.models import Recording, Session
from app.utils.errors import ValidationError, NotFoundError


class RecordingService:
    """Service class for recording-related operations."""

    @staticmethod
    def add_recording(session_id: str, data: Dict) -> Recording:
        """
        Add a recording to a session.

        Args:
            session_id: ID of the session
            data: Recording data dictionary

        Returns:
            Created Recording object

        Raises:
            NotFoundError: If session not found
            ValidationError: If recording already exists
        """
        # Validate session exists
        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")

        # Check if recording already exists
        existing = Recording.query.filter_by(session_id=session_id).first()
        if existing:
            raise ValidationError(f"Recording already exists for session {session_id}")

        # Extract thumbnail URL from YouTube URL
        thumbnail_url = RecordingService.extract_youtube_thumbnail(data['youtube_url'])

        # Create recording
        recording = Recording(
            session_id=session_id,
            youtube_url=data['youtube_url'],
            thumbnail_url=thumbnail_url,
            pdf_url=data.get('pdf_url'),
            recorded_date=data['recorded_date'],
            views_count=0
        )

        db.session.add(recording)
        db.session.commit()
        return recording

    @staticmethod
    def update_recording(recording_id: str, data: Dict) -> Recording:
        """
        Update an existing recording.

        Args:
            recording_id: ID of the recording to update
            data: Updated recording data

        Returns:
            Updated Recording object

        Raises:
            NotFoundError: If recording not found
        """
        recording = Recording.query.get(recording_id)
        if not recording:
            raise NotFoundError(f"Recording with id {recording_id} not found")

        # Update fields
        if 'youtube_url' in data:
            recording.youtube_url = data['youtube_url']
            # Update thumbnail URL if YouTube URL changed
            recording.thumbnail_url = RecordingService.extract_youtube_thumbnail(
                data['youtube_url']
            )

        if 'pdf_url' in data:
            recording.pdf_url = data['pdf_url']

        if 'recorded_date' in data:
            recording.recorded_date = data['recorded_date']

        db.session.commit()
        return recording

    @staticmethod
    def delete_recording(recording_id: str) -> bool:
        """
        Delete a recording.

        Args:
            recording_id: ID of the recording to delete

        Returns:
            True if deleted successfully

        Raises:
            NotFoundError: If recording not found
        """
        recording = Recording.query.get(recording_id)
        if not recording:
            raise NotFoundError(f"Recording with id {recording_id} not found")

        # Update session status back to published if it was completed
        session = recording.session
        if session and session.status == 'completed':
            session.status = 'published'

        db.session.delete(recording)
        db.session.commit()
        return True

    @staticmethod
    def extract_youtube_thumbnail(youtube_url: str) -> str:
        """
        Extract YouTube video ID and generate thumbnail URL.

        Args:
            youtube_url: YouTube video URL

        Returns:
            YouTube thumbnail URL

        Example URLs:
            - https://www.youtube.com/watch?v=VIDEO_ID
            - https://youtu.be/VIDEO_ID
            - https://www.youtube.com/embed/VIDEO_ID
        """
        # Regular expressions to extract video ID
        patterns = [
            r'(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)',
            r'(?:youtu\.be\/)([a-zA-Z0-9_-]+)',
            r'(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)',
        ]

        video_id = None
        for pattern in patterns:
            match = re.search(pattern, youtube_url)
            if match:
                video_id = match.group(1)
                break

        if video_id:
            # Use maxresdefault for highest quality thumbnail
            return f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"

        # Return default placeholder if video ID cannot be extracted
        return None
