"""Session model for managing teaching sessions."""
from app.extensions import db
from app.models.base import BaseModel


class Session(BaseModel):
    """Session model for telepathology teaching sessions."""

    __tablename__ = 'sessions'

    title = db.Column(db.String(300), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    abstract = db.Column(db.Text, nullable=False)
    objectives = db.Column(db.JSON, nullable=True)  # Array of strings
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    status = db.Column(
        db.Enum('draft', 'published', 'completed', name='session_status_enum'),
        nullable=False,
        default='draft'
    )
    platform = db.Column(db.String(100), nullable=False)
    meeting_link = db.Column(db.String(500), nullable=True)
    meeting_id = db.Column(db.String(100), nullable=True)
    meeting_password = db.Column(db.String(100), nullable=True)

    # Foreign Keys
    speaker_id = db.Column(db.String(36), db.ForeignKey('speakers.id'), nullable=False)
    organ_tag_id = db.Column(db.String(36), db.ForeignKey('tags.id'), nullable=False)
    type_tag_id = db.Column(db.String(36), db.ForeignKey('tags.id'), nullable=False)
    level_tag_id = db.Column(db.String(36), db.ForeignKey('tags.id'), nullable=False)
    created_by = db.Column(db.String(36), db.ForeignKey('admin_users.id'), nullable=False)

    # Relationships
    speaker = db.relationship('Speaker', back_populates='sessions')
    organ_tag = db.relationship('Tag', foreign_keys=[organ_tag_id], back_populates='sessions_as_organ')
    type_tag = db.relationship('Tag', foreign_keys=[type_tag_id], back_populates='sessions_as_type')
    level_tag = db.relationship('Tag', foreign_keys=[level_tag_id], back_populates='sessions_as_level')
    created_by_user = db.relationship('AdminUser', back_populates='sessions')
    recording = db.relationship('Recording', back_populates='session', uselist=False)

    def to_dict(self):
        """Convert model to dictionary."""
        data = super().to_dict()
        data.update({
            'title': self.title,
            'summary': self.summary,
            'abstract': self.abstract,
            'objectives': self.objectives,
            'date': self.date.isoformat() if self.date else None,
            'time': self.time.isoformat() if self.time else None,
            'duration_minutes': self.duration_minutes,
            'status': self.status,
            'platform': self.platform,
            'meeting_link': self.meeting_link,
            'meeting_id': self.meeting_id,
            'meeting_password': self.meeting_password,
            'speaker_id': self.speaker_id,
            'organ_tag_id': self.organ_tag_id,
            'type_tag_id': self.type_tag_id,
            'level_tag_id': self.level_tag_id,
            'created_by': self.created_by,
        })
        return data

    def __repr__(self):
        return f'<Session {self.title}>'
