"""Recording model for session recordings."""
from app.extensions import db
from app.models.base import BaseModel


class Recording(BaseModel):
    """Recording model for storing session recording information."""

    __tablename__ = 'recordings'

    session_id = db.Column(db.String(36), db.ForeignKey('sessions.id'), unique=True, nullable=False)
    youtube_url = db.Column(db.String(500), nullable=False)
    thumbnail_url = db.Column(db.String(500), nullable=True)
    pdf_url = db.Column(db.String(500), nullable=True)
    recorded_date = db.Column(db.Date, nullable=False)
    views_count = db.Column(db.Integer, nullable=False, default=0)

    # Relationships
    session = db.relationship('Session', back_populates='recording')

    def to_dict(self):
        """Convert model to dictionary."""
        data = super().to_dict()
        data.update({
            'session_id': self.session_id,
            'youtube_url': self.youtube_url,
            'video_url': self.youtube_url,  # Alias for frontend compatibility
            'thumbnail_url': self.thumbnail_url,
            'pdf_url': self.pdf_url,
            'recorded_date': self.recorded_date.isoformat() if self.recorded_date else None,
            'views_count': self.views_count,
            'views': self.views_count,  # Alias for frontend compatibility
        })
        return data

    def __repr__(self):
        return f'<Recording for session {self.session_id}>'
