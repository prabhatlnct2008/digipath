"""Speaker service for business logic."""
from typing import List, Dict
from app.extensions import db
from app.models import Speaker, Session
from app.utils.errors import ValidationError, NotFoundError


class SpeakerService:
    """Service class for speaker-related operations."""

    @staticmethod
    def create_speaker(data: Dict) -> Speaker:
        """
        Create a new speaker.

        Args:
            data: Speaker data dictionary

        Returns:
            Created Speaker object
        """
        speaker = Speaker(
            name=data['name'],
            designation=data['designation'],
            is_aiims=data.get('is_aiims', True)
        )

        db.session.add(speaker)
        db.session.commit()
        return speaker

    @staticmethod
    def update_speaker(speaker_id: str, data: Dict) -> Speaker:
        """
        Update an existing speaker.

        Args:
            speaker_id: ID of the speaker to update
            data: Updated speaker data

        Returns:
            Updated Speaker object

        Raises:
            NotFoundError: If speaker not found
        """
        speaker = Speaker.query.get(speaker_id)
        if not speaker:
            raise NotFoundError(f"Speaker with id {speaker_id} not found")

        # Update fields
        if 'name' in data:
            speaker.name = data['name']
        if 'designation' in data:
            speaker.designation = data['designation']
        if 'is_aiims' in data:
            speaker.is_aiims = data['is_aiims']

        db.session.commit()
        return speaker

    @staticmethod
    def get_speaker(speaker_id: str) -> Speaker:
        """
        Get a speaker by ID.

        Args:
            speaker_id: ID of the speaker

        Returns:
            Speaker object

        Raises:
            NotFoundError: If speaker not found
        """
        speaker = Speaker.query.get(speaker_id)
        if not speaker:
            raise NotFoundError(f"Speaker with id {speaker_id} not found")
        return speaker

    @staticmethod
    def list_speakers() -> List[Speaker]:
        """
        List all speakers.

        Returns:
            List of all speakers
        """
        return Speaker.query.order_by(Speaker.name).all()

    @staticmethod
    def delete_speaker(speaker_id: str) -> bool:
        """
        Delete a speaker (only if not associated with any sessions).

        Args:
            speaker_id: ID of the speaker to delete

        Returns:
            True if deleted successfully

        Raises:
            NotFoundError: If speaker not found
            ValidationError: If speaker is in use
        """
        speaker = Speaker.query.get(speaker_id)
        if not speaker:
            raise NotFoundError(f"Speaker with id {speaker_id} not found")

        # Check if speaker has any sessions
        session_count = Session.query.filter_by(speaker_id=speaker_id).count()
        if session_count > 0:
            raise ValidationError(
                f"Cannot delete speaker. Associated with {session_count} session(s)"
            )

        db.session.delete(speaker)
        db.session.commit()
        return True
