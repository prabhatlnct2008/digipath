import React, { useState } from 'react';
import { useTagUsage, useDeleteTag, useUpdateTag, useTags } from '../../../hooks/useTags';
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
  const [replaceWithId, setReplaceWithId] = useState<string>('');
  const { data: usage, isLoading: usageLoading } = useTagUsage(tag.id);
  const { data: allTags } = useTags();
  const deleteTag = useDeleteTag();
  const updateTag = useUpdateTag();

  const usageCount = usage?.usage_count || usage?.count || 0;
  const isInUse = usageCount > 0;

  // Get replacement options (same category, active, not the current tag)
  const replacementOptions = allTags
    ? (allTags[tag.category] || []).filter(
        (t: Tag) => t.id !== tag.id && t.is_active
      )
    : [];

  const handleDelete = async () => {
    if (isInUse && !replaceWithId) {
      setError('Please select a replacement tag or deactivate instead');
      return;
    }

    try {
      await deleteTag.mutateAsync({ id: tag.id, replaceWith: replaceWithId || undefined });
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
                  Tag is in use
                </p>
                <p className="text-sm text-yellow-800 mb-3">
                  To delete this tag, either select a replacement tag to reassign all sessions,
                  or deactivate it to prevent it from being used in new sessions.
                </p>

                {replacementOptions.length > 0 && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-yellow-800 mb-1">
                      Replace with:
                    </label>
                    <select
                      value={replaceWithId}
                      onChange={(e) => {
                        setReplaceWithId(e.target.value);
                        setError('');
                      }}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select a replacement tag...</option>
                      {replacementOptions.map((t: Tag) => (
                        <option key={t.id} value={t.id}>
                          {t.label || t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
          {isInUse && (
            <Button
              variant="secondary"
              onClick={handleDeactivate}
              disabled={updateTag.isPending || usageLoading}
            >
              {updateTag.isPending ? 'Deactivating...' : 'Deactivate Instead'}
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={handleDelete}
            disabled={deleteTag.isPending || usageLoading || (isInUse && !replaceWithId)}
            className="bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300"
          >
            {deleteTag.isPending
              ? 'Deleting...'
              : isInUse && replaceWithId
              ? 'Replace & Delete'
              : 'Delete Tag'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
