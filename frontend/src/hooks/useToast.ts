import { useToastContext, ToastVariant } from '../context/ToastContext';

interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
}

export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToastContext();

  const toast = (message: string, variant: ToastVariant = 'info', options?: ToastOptions) => {
    return addToast({ message, variant, ...options });
  };

  const success = (message: string, options?: ToastOptions) => {
    return toast(message, 'success', options);
  };

  const error = (message: string, options?: ToastOptions) => {
    return toast(message, 'error', options);
  };

  const warning = (message: string, options?: ToastOptions) => {
    return toast(message, 'warning', options);
  };

  const info = (message: string, options?: ToastOptions) => {
    return toast(message, 'info', options);
  };

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    clear: clearToasts,
  };
};
