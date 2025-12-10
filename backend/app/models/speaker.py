"""Speaker model for managing session speakers."""
from app.extensions import db
from app.models.base import BaseModel


class Speaker(BaseModel):
    """Speaker model for session presenters."""

    __tablename__ = 'speakers'

    name = db.Column(db.String(200), nullable=False)
    designation = db.Column(db.String(300), nullable=False)
    is_aiims = db.Column(db.Boolean, nullable=False, default=True)

    # Relationships
    sessions = db.relationship('Session', back_populates='speaker', lazy='dynamic')

    def to_dict(self):
        """Convert model to dictionary."""
        data = super().to_dict()
        data.update({
            'name': self.name,
            'designation': self.designation,
            'is_aiims': self.is_aiims,
        })
        return data

    def __repr__(self):
        return f'<Speaker {self.name}>'
