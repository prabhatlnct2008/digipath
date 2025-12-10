"""Tag service for business logic."""
from typing import List, Dict
from sqlalchemy import or_
from app.extensions import db
from app.models import Tag, Session
from app.utils.errors import ValidationError, NotFoundError


class TagService:
    """Service class for tag-related operations."""

    @staticmethod
    def create_tag(data: Dict) -> Tag:
        """
        Create a new tag.

        Args:
            data: Tag data dictionary

        Returns:
            Created Tag object

        Raises:
            ValidationError: If tag with same category and label exists
        """
        # Check for duplicate
        existing = Tag.query.filter_by(
            category=data['category'],
            label=data['label']
        ).first()

        if existing:
            raise ValidationError(
                f"Tag with category '{data['category']}' and label '{data['label']}' already exists"
            )

        tag = Tag(
            category=data['category'],
            label=data['label'],
            is_active=data.get('is_active', True)
        )

        db.session.add(tag)
        db.session.commit()
        return tag

    @staticmethod
    def update_tag(tag_id: str, data: Dict) -> Tag:
        """
        Update an existing tag.

        Args:
            tag_id: ID of the tag to update
            data: Updated tag data

        Returns:
            Updated Tag object

        Raises:
            NotFoundError: If tag not found
            ValidationError: If update creates duplicate
        """
        tag = Tag.query.get(tag_id)
        if not tag:
            raise NotFoundError(f"Tag with id {tag_id} not found")

        # Check for duplicate if label is being updated
        if 'label' in data and data['label'] != tag.label:
            existing = Tag.query.filter_by(
                category=tag.category,
                label=data['label']
            ).first()

            if existing:
                raise ValidationError(
                    f"Tag with category '{tag.category}' and label '{data['label']}' already exists"
                )

        # Update fields
        if 'label' in data:
            tag.label = data['label']
        if 'is_active' in data:
            tag.is_active = data['is_active']

        db.session.commit()
        return tag

    @staticmethod
    def get_tag(tag_id: str) -> Tag:
        """
        Get a tag by ID.

        Args:
            tag_id: ID of the tag

        Returns:
            Tag object

        Raises:
            NotFoundError: If tag not found
        """
        tag = Tag.query.get(tag_id)
        if not tag:
            raise NotFoundError(f"Tag with id {tag_id} not found")
        return tag

    @staticmethod
    def list_tags(category: str = None, active_only: bool = False) -> List[Tag]:
        """
        List tags with optional filtering.

        Args:
            category: Filter by category (organ, type, level)
            active_only: Only return active tags

        Returns:
            List of tags
        """
        query = Tag.query

        if category:
            query = query.filter_by(category=category)

        if active_only:
            query = query.filter_by(is_active=True)

        return query.order_by(Tag.category, Tag.label).all()

    @staticmethod
    def get_tags_grouped() -> Dict:
        """
        Get all active tags grouped by category.

        Returns:
            Dictionary with categories as keys and lists of tags as values
        """
        tags = Tag.query.filter_by(is_active=True).order_by(Tag.category, Tag.label).all()

        grouped = {
            'organ': [],
            'type': [],
            'level': []
        }

        for tag in tags:
            grouped[tag.category].append(tag)

        return grouped

    @staticmethod
    def get_tag_usage(tag_id: str) -> Dict:
        """
        Get usage count for a tag.

        Args:
            tag_id: ID of the tag

        Returns:
            Dictionary with usage information

        Raises:
            NotFoundError: If tag not found
        """
        tag = Tag.query.get(tag_id)
        if not tag:
            raise NotFoundError(f"Tag with id {tag_id} not found")

        # Count sessions using this tag
        usage_count = Session.query.filter(
            or_(
                Session.organ_tag_id == tag_id,
                Session.type_tag_id == tag_id,
                Session.level_tag_id == tag_id
            )
        ).count()

        return {
            'tag_id': tag.id,
            'category': tag.category,
            'label': tag.label,
            'usage_count': usage_count,
            'can_delete': usage_count == 0
        }

    @staticmethod
    def delete_tag(tag_id: str, replace_with_tag_id: str = None) -> bool:
        """
        Delete a tag. If in use, optionally replace with another tag first.

        Args:
            tag_id: ID of the tag to delete
            replace_with_tag_id: Optional ID of tag to replace this with

        Returns:
            True if deleted successfully

        Raises:
            NotFoundError: If tag not found
            ValidationError: If tag is in use and no replacement provided
        """
        tag = Tag.query.get(tag_id)
        if not tag:
            raise NotFoundError(f"Tag with id {tag_id} not found")

        # Check usage
        usage_info = TagService.get_tag_usage(tag_id)

        if usage_info['usage_count'] > 0:
            if not replace_with_tag_id:
                raise ValidationError(
                    f"Cannot delete tag. Associated with {usage_info['usage_count']} session(s). "
                    "Provide a replacement tag or remove associations first."
                )

            # Validate replacement tag
            replacement_tag = Tag.query.get(replace_with_tag_id)
            if not replacement_tag:
                raise NotFoundError(f"Replacement tag with id {replace_with_tag_id} not found")

            if replacement_tag.category != tag.category:
                raise ValidationError(
                    f"Replacement tag must be in the same category ('{tag.category}')"
                )

            if not replacement_tag.is_active:
                raise ValidationError("Replacement tag must be active")

            # Replace tag in all sessions
            if tag.category == 'organ':
                Session.query.filter(Session.organ_tag_id == tag_id).update(
                    {Session.organ_tag_id: replace_with_tag_id}
                )
            elif tag.category == 'type':
                Session.query.filter(Session.type_tag_id == tag_id).update(
                    {Session.type_tag_id: replace_with_tag_id}
                )
            elif tag.category == 'level':
                Session.query.filter(Session.level_tag_id == tag_id).update(
                    {Session.level_tag_id: replace_with_tag_id}
                )

        db.session.delete(tag)
        db.session.commit()
        return True
