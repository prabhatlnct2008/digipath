"""Database seeding script for initial data."""
import os
from app import create_app
from app.extensions import db
from app.models import AdminUser, Tag


def seed_database():
    """Seed the database with initial data."""
    print("Starting database seeding...")

    # Create admin user
    print("\n1. Creating admin user...")
    admin_email = os.getenv('ADMIN_EMAIL', 'admin@aiims.edu')
    admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')
    admin_name = os.getenv('ADMIN_NAME', 'System Administrator')

    existing_admin = AdminUser.query.filter_by(email=admin_email).first()
    if not existing_admin:
        admin_user = AdminUser(
            name=admin_name,
            email=admin_email,
            role='super_admin'
        )
        admin_user.set_password(admin_password)
        db.session.add(admin_user)
        print(f"   Created admin user: {admin_email}")
    else:
        print(f"   Admin user already exists: {admin_email}")

    # Create organ tags
    print("\n2. Creating organ tags...")
    organ_tags = [
        'Breast',
        'Lung',
        'Gastrointestinal',
        'Gynecology',
        'Hematopathology',
        'Neuropathology',
        'Head & Neck',
        'Soft Tissue',
        'Bone',
        'Kidney',
        'Urinary Bladder',
        'Liver',
        'Skin',
        'Endocrine',
        'General'
    ]

    for label in organ_tags:
        existing_tag = Tag.query.filter_by(category='organ', label=label).first()
        if not existing_tag:
            tag = Tag(category='organ', label=label)
            db.session.add(tag)
            print(f"   Created organ tag: {label}")
        else:
            print(f"   Organ tag already exists: {label}")

    # Create type tags
    print("\n3. Creating type tags...")
    type_tags = [
        'Live Case Discussion',
        'Journal Club',
        'Lecture',
        'Quiz',
        'Tutorial',
        'Workshop',
        'Grand Round',
        'Case Series'
    ]

    for label in type_tags:
        existing_tag = Tag.query.filter_by(category='type', label=label).first()
        if not existing_tag:
            tag = Tag(category='type', label=label)
            db.session.add(tag)
            print(f"   Created type tag: {label}")
        else:
            print(f"   Type tag already exists: {label}")

    # Create level tags
    print("\n4. Creating level tags...")
    level_tags = [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert',
        'All Levels'
    ]

    for label in level_tags:
        existing_tag = Tag.query.filter_by(category='level', label=label).first()
        if not existing_tag:
            tag = Tag(category='level', label=label)
            db.session.add(tag)
            print(f"   Created level tag: {label}")
        else:
            print(f"   Level tag already exists: {label}")

    # Commit all changes
    try:
        db.session.commit()
        print("\n✓ Database seeding completed successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"\n✗ Error during seeding: {str(e)}")
        raise


if __name__ == '__main__':
    # Create app and push application context
    app = create_app()

    with app.app_context():
        # Create all tables
        print("Creating database tables...")
        db.create_all()
        print("✓ Tables created successfully!")

        # Seed the database
        seed_database()
