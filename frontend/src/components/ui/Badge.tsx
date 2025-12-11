import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700 border-gray-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  primary: 'bg-blue-50 text-blue-600 border-blue-200',
  secondary: 'bg-gray-50 text-gray-600 border-gray-200',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-gray-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
}) => {
  const classes = `
    inline-flex items-center gap-1.5 rounded-full font-medium border
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <span className={classes}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {icon && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
    </span>
  );
};

// Status badge - commonly used for session/recording status
type StatusType = 'published' | 'draft' | 'completed' | 'live' | 'upcoming' | 'recording_added' | 'recording_missing';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; variant: BadgeVariant; dot?: boolean }> = {
  published: { label: 'Published', variant: 'primary', dot: true },
  draft: { label: 'Draft', variant: 'default', dot: true },
  completed: { label: 'Completed', variant: 'success', dot: true },
  live: { label: 'Live Now', variant: 'danger', dot: true },
  upcoming: { label: 'Upcoming', variant: 'info', dot: true },
  recording_added: { label: 'Recording Added', variant: 'success', dot: true },
  recording_missing: { label: 'Recording Not Added', variant: 'danger', dot: true },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} dot={config.dot} className={className}>
      {config.label}
    </Badge>
  );
};
