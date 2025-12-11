import React from 'react';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1,
  animate = true,
}) => {
  const baseClasses = `
    bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
    ${animate ? 'animate-shimmer bg-[length:200%_100%]' : 'bg-gray-200'}
  `;

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return '';
      case 'rounded':
        return 'rounded-lg';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getDefaultStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};

    switch (variant) {
      case 'circular':
        style.width = width || '40px';
        style.height = height || '40px';
        break;
      case 'rectangular':
      case 'rounded':
        style.width = width || '100%';
        style.height = height || '100px';
        break;
      case 'text':
      default:
        style.width = width || '100%';
        style.height = height || '1em';
        break;
    }

    return style;
  };

  const classes = `${baseClasses} ${getVariantClasses()} ${className}`.replace(/\s+/g, ' ').trim();

  if (lines > 1 && variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={classes}
            style={{
              ...getDefaultStyle(),
              width: index === lines - 1 ? '75%' : width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={classes}
      style={getDefaultStyle()}
    />
  );
};

// Card skeleton for consistent loading states
interface CardSkeletonProps {
  showImage?: boolean;
  showTags?: boolean;
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = false,
  showTags = true,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 ${className}`}>
      {showImage && (
        <Skeleton variant="rounded" height="160px" className="mb-4" />
      )}
      {showTags && (
        <div className="flex gap-2 mb-3">
          <Skeleton width="60px" height="24px" className="rounded-full" />
          <Skeleton width="80px" height="24px" className="rounded-full" />
        </div>
      )}
      <Skeleton height="24px" className="mb-2" />
      <Skeleton lines={2} className="mb-4" />
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" width="32px" height="32px" />
        <Skeleton width="120px" height="16px" />
      </div>
      <div className="flex gap-3">
        <Skeleton width="100px" height="16px" />
        <Skeleton width="80px" height="16px" />
      </div>
    </div>
  );
};

// Table row skeleton
interface TableRowSkeletonProps {
  columns?: number;
  className?: string;
}

export const TableRowSkeleton: React.FC<TableRowSkeletonProps> = ({
  columns = 5,
  className = '',
}) => {
  return (
    <tr className={className}>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-3">
          <Skeleton height="20px" width={index === 0 ? '80%' : '60%'} />
        </td>
      ))}
    </tr>
  );
};

// List skeleton
interface ListSkeletonProps {
  items?: number;
  showAvatar?: boolean;
  className?: string;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  items = 5,
  showAvatar = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {showAvatar && (
            <Skeleton variant="circular" width="40px" height="40px" />
          )}
          <div className="flex-1">
            <Skeleton height="16px" width="60%" className="mb-1" />
            <Skeleton height="14px" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
};
