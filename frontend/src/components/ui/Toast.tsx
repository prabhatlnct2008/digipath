import React from 'react';
import { useToastContext } from '../../context/ToastContext';
import type { Toast as ToastType, ToastVariant } from '../../context/ToastContext';

const variantStyles: Record<ToastVariant, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-surface-dark',
    icon: (
      <svg className="w-5 h-5 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-surface-dark',
    icon: (
      <svg className="w-5 h-5 text-status-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-surface-dark',
    icon: (
      <svg className="w-5 h-5 text-status-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  info: {
    bg: 'bg-surface-dark',
    icon: (
      <svg className="w-5 h-5 text-status-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const { bg, icon } = variantStyles[toast.variant];

  return (
    <div
      className={`
        ${bg}
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
        text-white min-w-[300px] max-w-md
        animate-toast-in
      `.replace(/\s+/g, ' ').trim()}
      role="alert"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      {toast.dismissible && (
        <button
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors duration-micro"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4 text-white/60 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div
      className="
        fixed z-[100]
        top-4 right-4
        md:top-6 md:right-6
        flex flex-col gap-3
        pointer-events-none
      "
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={removeToast} />
        </div>
      ))}
    </div>
  );
};

// Mobile-friendly toast container (top-center on mobile)
export const ToastContainerResponsive: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <>
      {/* Mobile: top-center */}
      <div
        className="
          fixed z-[100]
          top-4 left-1/2 -translate-x-1/2
          md:hidden
          flex flex-col gap-3
          pointer-events-none
          w-[calc(100%-2rem)] max-w-md
        "
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>

      {/* Desktop: top-right */}
      <div
        className="
          fixed z-[100]
          top-6 right-6
          hidden md:flex
          flex-col gap-3
          pointer-events-none
        "
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
};
