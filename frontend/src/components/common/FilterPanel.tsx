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

interface FilterSelectProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: Tag[];
  placeholder: string;
  onChange: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  icon,
  value,
  options,
  placeholder,
  onChange,
}) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
      <span className="text-gray-400">{icon}</span>
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full px-3 py-2.5
        border border-gray-200 rounded-lg
        bg-white text-gray-900
        hover:border-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500
        transition-all duration-150
        appearance-none
        cursor-pointer
        ${value ? 'font-medium' : 'text-gray-500'}
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '2.5rem',
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.label}
        </option>
      ))}
    </select>
  </div>
);

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
}) => {
  return (
    <div className="space-y-4">
      <FilterSelect
        label="Organ System"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        }
        value={selectedOrgan || ''}
        options={organTags}
        placeholder="All Organs"
        onChange={onOrganChange}
      />

      <FilterSelect
        label="Session Type"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        }
        value={selectedType || ''}
        options={typeTags}
        placeholder="All Types"
        onChange={onTypeChange}
      />

      <FilterSelect
        label="Difficulty Level"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        value={selectedLevel || ''}
        options={levelTags}
        placeholder="All Levels"
        onChange={onLevelChange}
      />
    </div>
  );
};
