import React, { useState } from 'react';
import { useCreateTag, useUpdateTag } from '../../../hooks/useTags';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import type { Tag, TagCategory } from '../../../types/tag.types';

interface TagFormProps {
  tag?: Tag | null;
  category: TagCategory;
  onClose: () => void;
}

export const TagForm: React.FC<TagFormProps> = ({ tag, category, onClose }) => {
  const [label, setLabel] = useState(tag?.label || '');
  const [isActive, setIsActive] = useState(tag?.is_active ?? true);
  const [error, setError] = useState('');

  const createTag = useCreateTag();
  const updateTag = useUpdateTag();

  const isEditing = !!tag;

  const handleSubmit = async () => {
    if (!label.trim()) {
      setError('Tag label is required');
      return;
    }

    try {
      if (isEditing) {
        await updateTag.mutateAsync({
          id: tag.id,
          data: {
            label: label.trim(),
            is_active: isActive,
          },
        });
      } else {
        await createTag.mutateAsync({
          label: label.trim(),
          category,
          is_active: isActive,
        });
      }
      onClose();
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} tag. Please try again.`);
    }
  };

  const getCategoryLabel = (cat: TagCategory): string => {
    const labels = {
      organ: 'Organ System',
      type: 'Session Type',
      level: 'Level',
    };
    return labels[cat];
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Tag' : 'Add New Tag'}
      size="md"
    >
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            Category: <span className="font-medium text-gray-900">{getCategoryLabel(category)}</span>
          </p>
        </div>

        <Input
          label="Label *"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setError('');
          }}
          placeholder="Enter tag label"
          error={error}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
            Active
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={createTag.isPending || updateTag.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={createTag.isPending || updateTag.isPending}
          >
            {createTag.isPending || updateTag.isPending
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
              ? 'Update Tag'
              : 'Create Tag'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
