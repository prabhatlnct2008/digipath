import React, { useState } from 'react';
import { useTagUsage, useDeleteTag, useUpdateTag } from '../../../hooks/useTags';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import type { Tag } from '../../../types/tag.types';

interface TagDeleteModalProps {
  tag: Tag;
  onClose: () => void;
}

export const TagDeleteModal: React.FC<TagDeleteModalProps> = ({ tag, onClose }) => {
  const [error, setError] = useState('');
  const { data: usage, isLoading: usageLoading } = useTagUsage(tag.id);
  const deleteTag = useDeleteTag();
  const updateTag = useUpdateTag();

  const usageCount = usage?.count || 0;
  const isInUse = usageCount > 0;

  const handleDelete = async () => {
    if (isInUse) {
      setError('Cannot delete a tag that is in use');
      return;
    }

    try {
      await deleteTag.mutateAsync(tag.id);
      onClose();
    } catch (err) {
      setError('Failed to delete tag. Please try again.');
    }
  };

  const handleDeactivate = async () => {
    try {
      await updateTag.mutateAsync({
        id: tag.id,
        data: {
          is_active: false,
        },
      });
      onClose();
    } catch (err) {
      setError('Failed to deactivate tag. Please try again.');
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Delete Tag" size="md">
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-900">{tag.label}</p>
          <p className="text-xs text-gray-600 mt-1">Category: {tag.category}</p>
        </div>

        {usageLoading ? (
          <Skeleton className="h-16" />
        ) : (
          <>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                This tag is used in <span className="font-semibold">{usageCount}</span>{' '}
                {usageCount === 1 ? 'session' : 'sessions'}.
              </p>
            </div>

            {isInUse && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  Cannot delete tag in use
                </p>
                <p className="text-sm text-yellow-800">
                  This tag is currently being used and cannot be deleted. You can deactivate it
                  instead to prevent it from being used in new sessions.
                </p>
              </div>
            )}
          </>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={deleteTag.isPending || updateTag.isPending}
          >
            Cancel
          </Button>
          {isInUse ? (
            <Button
              variant="secondary"
              onClick={handleDeactivate}
              disabled={updateTag.isPending || usageLoading}
            >
              {updateTag.isPending ? 'Deactivating...' : 'Deactivate Instead'}
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={handleDelete}
              disabled={deleteTag.isPending || usageLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteTag.isPending ? 'Deleting...' : 'Delete Tag'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
