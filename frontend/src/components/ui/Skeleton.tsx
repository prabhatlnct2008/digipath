import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gray-300';

  let variantClasses = '';
  let defaultStyle: React.CSSProperties = {};

  switch (variant) {
    case 'circular':
      variantClasses = 'rounded-full';
      defaultStyle = { width: width || '40px', height: height || '40px' };
      break;
    case 'rectangular':
      variantClasses = 'rounded';
      defaultStyle = { width: width || '100%', height: height || '20px' };
      break;
    case 'text':
    default:
      variantClasses = 'rounded';
      defaultStyle = { width: width || '100%', height: height || '1em' };
      break;
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={defaultStyle}
    />
  );
};
