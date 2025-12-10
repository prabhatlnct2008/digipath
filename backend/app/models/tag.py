"""Tag model for categorizing sessions."""
from app.extensions import db
from app.models.base import BaseModel


class Tag(BaseModel):
    """Tag model for categorizing sessions by organ, type, and level."""

    __tablename__ = 'tags'

    category = db.Column(
        db.Enum('organ', 'type', 'level', name='tag_category_enum'),
        nullable=False
    )
    label = db.Column(db.String(100), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    # Composite unique constraint
    __table_args__ = (
        db.UniqueConstraint('category', 'label', name='uq_category_label'),
    )

    # Relationships
    sessions_as_organ = db.relationship('Session', foreign_keys='Session.organ_tag_id', back_populates='organ_tag', lazy='dynamic')
    sessions_as_type = db.relationship('Session', foreign_keys='Session.type_tag_id', back_populates='type_tag', lazy='dynamic')
    sessions_as_level = db.relationship('Session', foreign_keys='Session.level_tag_id', back_populates='level_tag', lazy='dynamic')

    def to_dict(self):
        """Convert model to dictionary."""
        data = super().to_dict()
        data.update({
            'category': self.category,
            'label': self.label,
            'name': self.label,  # Alias for frontend compatibility
            'is_active': self.is_active,
        })
        return data

    def __repr__(self):
        return f'<Tag {self.category}:{self.label}>'
