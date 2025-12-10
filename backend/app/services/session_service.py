"""Session service for business logic."""
from datetime import datetime, date
from typing import List, Dict, Optional
from sqlalchemy import and_, or_, desc
from app.extensions import db
from app.models import Session, Speaker, Tag
from app.utils.errors import ValidationError, NotFoundError


class SessionService:
    """Service class for session-related operations."""

    @staticmethod
    def create_session(data: Dict, admin_id: str) -> Session:
        """
        Create a new session.

        Args:
            data: Session data dictionary
            admin_id: ID of the admin creating the session

        Returns:
            Created Session object

        Raises:
            ValidationError: If validation fails
            NotFoundError: If related entities not found
        """
        # Validate speaker exists
        speaker = Speaker.query.get(data.get('speaker_id'))
        if not speaker:
            raise NotFoundError(f"Speaker with id {data.get('speaker_id')} not found")

        # Validate tags exist and are active
        organ_tag = Tag.query.get(data.get('organ_tag_id'))
        if not organ_tag or organ_tag.category != 'organ' or not organ_tag.is_active:
            raise ValidationError("Invalid or inactive organ tag")

        type_tag = Tag.query.get(data.get('type_tag_id'))
        if not type_tag or type_tag.category != 'type' or not type_tag.is_active:
            raise ValidationError("Invalid or inactive type tag")

        level_tag = Tag.query.get(data.get('level_tag_id'))
        if not level_tag or level_tag.category != 'level' or not level_tag.is_active:
            raise ValidationError("Invalid or inactive level tag")

        # Create session
        session = Session(
            title=data['title'],
            summary=data['summary'],
            abstract=data['abstract'],
            objectives=data.get('objectives'),
            date=data['date'],
            time=data['time'],
            duration_minutes=data['duration_minutes'],
            platform=data['platform'],
            meeting_link=data.get('meeting_link'),
            meeting_id=data.get('meeting_id'),
            meeting_password=data.get('meeting_password'),
            speaker_id=data['speaker_id'],
            organ_tag_id=data['organ_tag_id'],
            type_tag_id=data['type_tag_id'],
            level_tag_id=data['level_tag_id'],
            created_by=admin_id,
            status='draft'
        )

        db.session.add(session)
        db.session.commit()
        return session

    @staticmethod
    def update_session(session_id: str, data: Dict) -> Session:
        """
        Update an existing session.

        Args:
            session_id: ID of the session to update
            data: Updated session data

        Returns:
            Updated Session object

        Raises:
            NotFoundError: If session not found
            ValidationError: If validation fails
        """
        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")

        # Cannot update completed sessions
        if session.status == 'completed':
            raise ValidationError("Cannot update completed sessions")

        # Update fields
        if 'title' in data:
            session.title = data['title']
        if 'summary' in data:
            session.summary = data['summary']
        if 'abstract' in data:
            session.abstract = data['abstract']
        if 'objectives' in data:
            session.objectives = data['objectives']
        if 'date' in data:
            session.date = data['date']
        if 'time' in data:
            session.time = data['time']
        if 'duration_minutes' in data:
            session.duration_minutes = data['duration_minutes']
        if 'platform' in data:
            session.platform = data['platform']
        if 'meeting_link' in data:
            session.meeting_link = data['meeting_link']
        if 'meeting_id' in data:
            session.meeting_id = data['meeting_id']
        if 'meeting_password' in data:
            session.meeting_password = data['meeting_password']

        # Validate and update speaker
        if 'speaker_id' in data:
            speaker = Speaker.query.get(data['speaker_id'])
            if not speaker:
                raise NotFoundError(f"Speaker with id {data['speaker_id']} not found")
            session.speaker_id = data['speaker_id']

        # Validate and update tags
        if 'organ_tag_id' in data:
            tag = Tag.query.get(data['organ_tag_id'])
            if not tag or tag.category != 'organ' or not tag.is_active:
                raise ValidationError("Invalid or inactive organ tag")
            session.organ_tag_id = data['organ_tag_id']

        if 'type_tag_id' in data:
            tag = Tag.query.get(data['type_tag_id'])
            if not tag or tag.category != 'type' or not tag.is_active:
                raise ValidationError("Invalid or inactive type tag")
            session.type_tag_id = data['type_tag_id']

        if 'level_tag_id' in data:
            tag = Tag.query.get(data['level_tag_id'])
            if not tag or tag.category != 'level' or not tag.is_active:
                raise ValidationError("Invalid or inactive level tag")
            session.level_tag_id = data['level_tag_id']

        db.session.commit()
        return session

    @staticmethod
    def get_session(session_id: str) -> Session:
        """
        Get a session by ID.

        Args:
            session_id: ID of the session

        Returns:
            Session object

        Raises:
            NotFoundError: If session not found
        """
        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")
        return session

    @staticmethod
    def list_sessions(
        filters: Optional[Dict] = None,
        pagination: Optional[Dict] = None
    ) -> tuple[List[Session], int]:
        """
        List sessions with optional filters and pagination.

        Args:
            filters: Dictionary of filter criteria (status, speaker_id, tag_id, etc.)
            pagination: Dictionary with page and per_page

        Returns:
            Tuple of (list of sessions, total count)
        """
        query = Session.query

        # Apply filters
        if filters:
            if 'status' in filters:
                query = query.filter(Session.status == filters['status'])
            if 'speaker_id' in filters:
                query = query.filter(Session.speaker_id == filters['speaker_id'])
            if 'organ_tag_id' in filters:
                query = query.filter(Session.organ_tag_id == filters['organ_tag_id'])
            if 'type_tag_id' in filters:
                query = query.filter(Session.type_tag_id == filters['type_tag_id'])
            if 'level_tag_id' in filters:
                query = query.filter(Session.level_tag_id == filters['level_tag_id'])

        # Order by date descending
        query = query.order_by(desc(Session.date), desc(Session.time))

        # Get total count
        total = query.count()

        # Apply pagination
        if pagination:
            page = pagination.get('page', 1)
            per_page = pagination.get('per_page', 20)
            query = query.limit(per_page).offset((page - 1) * per_page)

        sessions = query.all()
        return sessions, total

    @staticmethod
    def list_upcoming_sessions(filters: Optional[Dict] = None) -> List[Session]:
        """
        List upcoming sessions (published, date >= today).

        Args:
            filters: Optional additional filters

        Returns:
            List of upcoming sessions
        """
        query = Session.query.filter(
            and_(
                Session.status == 'published',
                Session.date >= date.today()
            )
        )

        # Apply additional filters
        if filters:
            if 'organ_tag_id' in filters:
                query = query.filter(Session.organ_tag_id == filters['organ_tag_id'])
            if 'type_tag_id' in filters:
                query = query.filter(Session.type_tag_id == filters['type_tag_id'])
            if 'level_tag_id' in filters:
                query = query.filter(Session.level_tag_id == filters['level_tag_id'])

        # Order by date ascending (soonest first)
        query = query.order_by(Session.date, Session.time)
        return query.all()

    @staticmethod
    def list_past_sessions(
        filters: Optional[Dict] = None,
        pagination: Optional[Dict] = None
    ) -> tuple[List[Session], int]:
        """
        List past sessions (date < today) with search and pagination.

        Args:
            filters: Optional additional filters including search
            pagination: Dictionary with page and per_page

        Returns:
            Tuple of (list of sessions, total count)
        """
        query = Session.query.filter(Session.date < date.today())

        # Apply additional filters
        if filters:
            if 'status' in filters:
                query = query.filter(Session.status == filters['status'])
            if 'organ_tag_id' in filters:
                query = query.filter(Session.organ_tag_id == filters['organ_tag_id'])
            if 'type_tag_id' in filters:
                query = query.filter(Session.type_tag_id == filters['type_tag_id'])
            if 'level_tag_id' in filters:
                query = query.filter(Session.level_tag_id == filters['level_tag_id'])

            # Apply search filter
            search = filters.get('search', '').strip()
            if search:
                search_pattern = f'%{search}%'
                query = query.outerjoin(Speaker, Session.speaker_id == Speaker.id)
                query = query.outerjoin(Tag, or_(
                    Session.organ_tag_id == Tag.id,
                    Session.type_tag_id == Tag.id,
                    Session.level_tag_id == Tag.id
                ))
                query = query.filter(or_(
                    Session.title.ilike(search_pattern),
                    Session.summary.ilike(search_pattern),
                    Session.abstract.ilike(search_pattern),
                    Speaker.name.ilike(search_pattern),
                    Tag.label.ilike(search_pattern)
                )).distinct()

        # Order by date descending (most recent first)
        query = query.order_by(desc(Session.date), desc(Session.time))

        # Get total count before pagination
        total = query.count()

        # Apply pagination
        if pagination:
            page = pagination.get('page', 1)
            per_page = pagination.get('per_page', 20)
            query = query.limit(per_page).offset((page - 1) * per_page)

        sessions = query.all()
        return sessions, total

    @staticmethod
    def publish_session(session_id: str) -> Session:
        """
        Publish a session (validate meeting_link exists and date is future).

        Args:
            session_id: ID of the session to publish

        Returns:
            Updated Session object

        Raises:
            NotFoundError: If session not found
            ValidationError: If validation fails
        """
        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")

        # Validate meeting link exists
        if not session.meeting_link:
            raise ValidationError("Cannot publish session without meeting link")

        # Validate date is in the future
        if session.date < date.today():
            raise ValidationError("Cannot publish session with past date")

        session.status = 'published'
        db.session.commit()
        return session

    @staticmethod
    def unpublish_session(session_id: str) -> Session:
        """
        Unpublish a session (set status back to draft).

        Args:
            session_id: ID of the session to unpublish

        Returns:
            Updated Session object

        Raises:
            NotFoundError: If session not found
            ValidationError: If session is completed
        """
        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")

        if session.status == 'completed':
            raise ValidationError("Cannot unpublish completed sessions")

        session.status = 'draft'
        db.session.commit()
        return session

    @staticmethod
    def complete_session(
        session_id: str,
        youtube_url: str,
        pdf_url: Optional[str] = None
    ) -> Session:
        """
        Mark session as completed and add recording.

        Args:
            session_id: ID of the session
            youtube_url: YouTube URL for the recording
            pdf_url: Optional PDF URL

        Returns:
            Updated Session object

        Raises:
            NotFoundError: If session not found
            ValidationError: If validation fails
        """
        from app.services.recording_service import RecordingService

        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")

        # Create recording
        recording_data = {
            'session_id': session_id,
            'youtube_url': youtube_url,
            'pdf_url': pdf_url,
            'recorded_date': date.today()
        }
        RecordingService.add_recording(session_id, recording_data)

        # Update session status
        session.status = 'completed'
        db.session.commit()
        return session

    @staticmethod
    def delete_session(session_id: str) -> bool:
        """
        Delete a session (only if it's in draft status).

        Args:
            session_id: ID of the session to delete

        Returns:
            True if deleted successfully

        Raises:
            NotFoundError: If session not found
            ValidationError: If session is not in draft status
        """
        session = Session.query.get(session_id)
        if not session:
            raise NotFoundError(f"Session with id {session_id} not found")

        if session.status != 'draft':
            raise ValidationError("Can only delete draft sessions")

        db.session.delete(session)
        db.session.commit()
        return True
