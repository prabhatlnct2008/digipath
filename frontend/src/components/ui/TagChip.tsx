import React from 'react';

interface TagChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  onRemove,
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 ${className}`}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-primary-600 hover:bg-primary-200 hover:text-primary-900 rounded-full focus:outline-none"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
