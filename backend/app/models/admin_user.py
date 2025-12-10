"""AdminUser model for authentication and authorization."""
import bcrypt
from app.extensions import db
from app.models.base import BaseModel


class AdminUser(BaseModel):
    """AdminUser model for managing admin users."""

    __tablename__ = 'admin_users'

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(
        db.Enum('super_admin', 'admin', name='admin_role_enum'),
        nullable=False,
        default='admin'
    )

    # Relationships
    sessions = db.relationship('Session', back_populates='created_by_user', lazy='dynamic')

    def set_password(self, password):
        """Hash and set the password."""
        self.password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')

    def check_password(self, password):
        """Check if the provided password matches the hash."""
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password_hash.encode('utf-8')
        )

    def to_dict(self):
        """Convert model to dictionary."""
        data = super().to_dict()
        data.update({
            'name': self.name,
            'email': self.email,
            'role': self.role,
        })
        return data

    def __repr__(self):
        return f'<AdminUser {self.email}>'
