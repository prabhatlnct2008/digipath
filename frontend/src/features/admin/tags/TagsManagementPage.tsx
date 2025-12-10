import React, { useState } from 'react';
import { useTags } from '../../../hooks/useTags';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { TagForm } from './TagForm';
import { TagDeleteModal } from './TagDeleteModal';
import type { TagCategory, Tag } from '../../../types/tag.types';

export const TagsManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TagCategory>('organ');
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);

  const { data: tags, isLoading } = useTags();

  const filteredTags = tags?.filter((tag) => tag.category === activeTab) || [];

  const getCategoryLabel = (category: TagCategory): string => {
    const labels = {
      organ: 'Organ System',
      type: 'Session Type',
      level: 'Level',
    };
    return labels[category];
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingTag(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTag(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tags</h1>
        <p className="text-gray-600">Organize and categorize sessions with tags</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('organ')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'organ'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Organ System
            </button>
            <button
              onClick={() => setActiveTab('type')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'type'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Session Type
            </button>
            <button
              onClick={() => setActiveTab('level')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'level'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Level
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {getCategoryLabel(activeTab)} Tags
            </h2>
            <Button size="sm" onClick={handleAddNew}>
              Add Tag
            </Button>
          </div>

          {/* Tags Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4" colSpan={3}>
                        <Skeleton className="h-6" />
                      </td>
                    </tr>
                  ))
                ) : filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {tag.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {tag.is_active ? (
                          <Badge color="green">Active</Badge>
                        ) : (
                          <Badge color="gray">Inactive</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(tag)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => setDeletingTag(tag)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No {getCategoryLabel(activeTab).toLowerCase()} tags found. Create your first tag to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showForm && (
        <TagForm
          tag={editingTag}
          category={activeTab}
          onClose={handleCloseForm}
        />
      )}

      {deletingTag && (
        <TagDeleteModal
          tag={deletingTag}
          onClose={() => setDeletingTag(null)}
        />
      )}
    </div>
  );
};
