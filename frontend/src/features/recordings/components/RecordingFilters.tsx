import React from 'react';
import type { Tag } from '../../../types/tag.types';
import type { RecordingFilters as RecordingFiltersType } from '../../../types/filters.types';

interface RecordingFiltersProps {
  organTags: Tag[];
  typeTags: Tag[];
  levelTags: Tag[];
  selectedOrgan?: string;
  selectedType?: string;
  selectedLevel?: string;
  selectedYear?: number;
  sortBy?: 'newest' | 'oldest' | 'most_viewed';
  onFilterChange: (filters: Partial<RecordingFiltersType>) => void;
  onClearFilters: () => void;
}

export const RecordingFilters: React.FC<RecordingFiltersProps> = ({
  organTags,
  typeTags,
  levelTags,
  selectedOrgan,
  selectedType,
  selectedLevel,
  selectedYear,
  sortBy,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedOrgan || selectedType || selectedLevel || selectedYear || sortBy;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy || ''}
            onChange={(e) =>
              onFilterChange({
                sort_by: (e.target.value as 'newest' | 'oldest' | 'most_viewed') || undefined,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most_viewed">Most Viewed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organ System
          </label>
          <select
            value={selectedOrgan || ''}
            onChange={(e) => onFilterChange({ organ_tag_id: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            onChange={(e) => onFilterChange({ type_tag_id: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            onChange={(e) => onFilterChange({ level_tag_id: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            {levelTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={selectedYear || ''}
            onChange={(e) =>
              onFilterChange({ year: e.target.value ? parseInt(e.target.value) : undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
