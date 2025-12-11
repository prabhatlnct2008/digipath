import React from 'react';
import { Link } from 'react-router-dom';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: CardPadding;
  variant?: CardVariant;
  hover?: boolean;
}

interface ClickableCardProps extends BaseCardProps {
  onClick?: () => void;
  href?: never;
  to?: never;
}

interface LinkCardProps extends BaseCardProps {
  to: string;
  onClick?: never;
  href?: never;
}

interface AnchorCardProps extends BaseCardProps {
  href: string;
  onClick?: never;
  to?: never;
}

type CardProps = ClickableCardProps | LinkCardProps | AnchorCardProps;

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-border-light shadow-card',
  elevated: 'bg-white shadow-card-hover',
  outlined: 'bg-white border-2 border-border',
  ghost: 'bg-transparent',
};

const hoverClasses = `
  hover:-translate-y-0.5 hover:shadow-card-hover hover:border-primary-200
  active:translate-y-0 active:shadow-card
  focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
`;

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
  hover = false,
  ...props
}) => {
  const baseClasses = `
    rounded-xl
    transition-all duration-normal ease-smooth
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${hover ? hoverClasses : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  // Check if it's a link card
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={`block ${baseClasses}`}>
        {children}
      </Link>
    );
  }

  // Check if it's an anchor card
  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={`block ${baseClasses}`} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // Check if it's clickable
  if ('onClick' in props && props.onClick) {
    return (
      <div
        className={`cursor-pointer ${baseClasses}`}
        onClick={props.onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            props.onClick?.();
          }
        }}
      >
        {children}
      </div>
    );
  }

  // Default non-interactive card
  return <div className={baseClasses}>{children}</div>;
};

// Card subcomponents for consistent structure
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h3 className={`text-card-title font-semibold text-text-primary ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`text-sm text-text-secondary mt-1 ${className}`}>{children}</p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={className}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`mt-4 pt-4 border-t border-border-light ${className}`}>{children}</div>
);
