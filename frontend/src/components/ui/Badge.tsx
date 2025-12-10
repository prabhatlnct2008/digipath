import React from 'react';

type BadgeColor = 'yellow' | 'green' | 'blue' | 'gray' | 'red';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  gray: 'bg-gray-100 text-gray-800 border-gray-200',
  red: 'bg-red-100 text-red-800 border-red-200',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'gray',
  className = '',
}) => {
  const classes = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses[color]} ${className}`;

  return <span className={classes}>{children}</span>;
};
