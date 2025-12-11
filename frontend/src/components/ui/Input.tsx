import React, { forwardRef } from 'react';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: InputSize;
  required?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3 text-lg',
};

const iconSizeClasses: Record<InputSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  inputSize = 'md',
  className = '',
  id,
  required,
  disabled,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseInputClasses = `
    w-full rounded-lg
    bg-white border
    transition-all duration-normal ease-smooth
    placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
    disabled:bg-gray-100 disabled:text-text-muted disabled:cursor-not-allowed
  `;

  const errorClasses = error
    ? 'border-status-danger focus:ring-status-danger focus:border-status-danger'
    : 'border-border hover:border-border-focus';

  const paddingClasses = leftIcon
    ? 'pl-10'
    : rightIcon
    ? 'pr-10'
    : '';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-status-danger ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-text-muted ${iconSizeClasses[inputSize]}`}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`
            ${baseInputClasses}
            ${sizeClasses[inputSize]}
            ${errorClasses}
            ${paddingClasses}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          {...props}
        />
        {rightIcon && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-text-muted ${iconSizeClasses[inputSize]}`}>
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-status-danger flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  required,
  disabled,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = `
    w-full px-4 py-2.5 rounded-lg
    bg-white border
    transition-all duration-normal ease-smooth
    placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
    disabled:bg-gray-100 disabled:text-text-muted disabled:cursor-not-allowed
    resize-y
  `;

  const errorClasses = error
    ? 'border-status-danger focus:ring-status-danger focus:border-status-danger'
    : 'border-border hover:border-border-focus';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-status-danger ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        rows={rows}
        className={`
          ${baseClasses}
          ${errorClasses}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-status-danger flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Select variant
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  options,
  placeholder,
  className = '',
  id,
  required,
  disabled,
  ...props
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = `
    w-full px-4 py-2.5 rounded-lg
    bg-white border
    transition-all duration-normal ease-smooth
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
    disabled:bg-gray-100 disabled:text-text-muted disabled:cursor-not-allowed
    appearance-none cursor-pointer
  `;

  const errorClasses = error
    ? 'border-status-danger focus:ring-status-danger focus:border-status-danger'
    : 'border-border hover:border-border-focus';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-status-danger ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`
            ${baseClasses}
            ${errorClasses}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-status-danger flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
