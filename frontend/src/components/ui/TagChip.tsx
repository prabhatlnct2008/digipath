import React from 'react';

type TagChipVariant = 'default' | 'selected' | 'outline';
type TagChipSize = 'sm' | 'md' | 'lg';

interface TagChipProps {
  label: string;
  variant?: TagChipVariant;
  size?: TagChipSize;
  onClick?: () => void;
  onRemove?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<TagChipVariant, string> = {
  default: `
    bg-gray-100 text-gray-600 border border-transparent
    hover:bg-gray-200 hover:text-gray-900
  `,
  selected: `
    bg-blue-50 text-blue-600 border border-blue-200
    hover:bg-blue-100 hover:border-blue-300
  `,
  outline: `
    bg-transparent text-gray-600 border border-gray-300
    hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
  `,
};

const sizeClasses: Record<TagChipSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

const removeBtnSizeClasses: Record<TagChipSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const TagChip: React.FC<TagChipProps> = ({
  label,
  variant = 'default',
  size = 'md',
  onClick,
  onRemove,
  selected,
  disabled = false,
  className = '',
}) => {
  // If selected prop is provided, use it to determine variant
  const effectiveVariant = selected ? 'selected' : variant;

  const baseClasses = `
    inline-flex items-center rounded-full font-medium
    transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
  `;

  const interactiveClasses = onClick && !disabled
    ? 'cursor-pointer'
    : disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const classes = `
    ${baseClasses}
    ${variantClasses[effectiveVariant]}
    ${sizeClasses[size]}
    ${interactiveClasses}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove && !disabled) {
      onRemove();
    }
  };

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      className={classes}
      onClick={onClick ? handleClick : undefined}
      disabled={onClick ? disabled : undefined}
      type={onClick ? 'button' : undefined}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={handleRemove}
          disabled={disabled}
          type="button"
          className={`
            inline-flex items-center justify-center rounded-full
            text-current opacity-60 hover:opacity-100
            hover:bg-black/10 transition-all duration-150
            focus:outline-none focus:ring-1 focus:ring-current
            ${removeBtnSizeClasses[size]}
          `.replace(/\s+/g, ' ').trim()}
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
    </Component>
  );
};

// Filter chip variant - specifically for filter bars
interface FilterChipProps {
  label: string;
  selected?: boolean;
  count?: number;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected = false,
  count,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = `
    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
    transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
  `;

  const stateClasses = selected
    ? 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
    : 'bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200 hover:text-gray-900';

  const interactiveClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${stateClasses}
        ${interactiveClasses}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className={`
          px-1.5 py-0.5 text-xs rounded-full
          ${selected ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-600'}
        `.replace(/\s+/g, ' ').trim()}>
          {count}
        </span>
      )}
    </button>
  );
};
