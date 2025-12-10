import React from 'react';
import type { Tag } from '../../types/tag.types';

interface FilterPanelProps {
  organTags: Tag[];
  typeTags: Tag[];
  levelTags: Tag[];
  selectedOrgan?: string;
  selectedType?: string;
  selectedLevel?: string;
  onOrganChange: (tagId: string) => void;
  onTypeChange: (tagId: string) => void;
  onLevelChange: (tagId: string) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  organTags,
  typeTags,
  levelTags,
  selectedOrgan,
  selectedType,
  selectedLevel,
  onOrganChange,
  onTypeChange,
  onLevelChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedOrgan || selectedType || selectedLevel;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organ System
          </label>
          <select
            value={selectedOrgan || ''}
            onChange={(e) => onOrganChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Organs</option>
            {organTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Type
          </label>
          <select
            value={selectedType || ''}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            {typeTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={selectedLevel || ''}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Levels</option>
            {levelTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
