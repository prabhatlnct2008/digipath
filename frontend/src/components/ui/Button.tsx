import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-500 text-white shadow-button
    hover:bg-primary-600 hover:shadow-button-hover hover:-translate-y-0.5
    active:translate-y-0 active:shadow-button
    focus:ring-primary-400
    disabled:bg-gray-400 disabled:shadow-none disabled:hover:translate-y-0
  `,
  secondary: `
    bg-white text-primary-500 border border-primary-200 shadow-soft
    hover:bg-primary-50 hover:border-primary-300 hover:-translate-y-0.5 hover:shadow-card
    active:translate-y-0 active:shadow-soft
    focus:ring-primary-400
    disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none disabled:hover:translate-y-0
  `,
  outline: `
    bg-transparent text-primary-500 border-2 border-primary-500
    hover:bg-primary-50 hover:-translate-y-0.5
    active:translate-y-0
    focus:ring-primary-400
    disabled:text-gray-400 disabled:border-gray-300 disabled:hover:translate-y-0 disabled:hover:bg-transparent
  `,
  ghost: `
    bg-transparent text-primary-500
    hover:bg-primary-50 hover:text-primary-600
    active:bg-primary-100
    focus:ring-primary-400
    disabled:text-gray-400 disabled:hover:bg-transparent
  `,
  danger: `
    bg-status-danger text-white shadow-button
    hover:bg-red-600 hover:shadow-button-hover hover:-translate-y-0.5
    active:translate-y-0 active:shadow-button
    focus:ring-red-400
    disabled:bg-gray-400 disabled:shadow-none disabled:hover:translate-y-0
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3 text-lg gap-2.5',
};

const Spinner: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <svg
      className={`animate-spin ${sizeMap[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-normal ease-smooth
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed
  `;

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${isLoading ? 'opacity-80 cursor-wait' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size={size} />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
