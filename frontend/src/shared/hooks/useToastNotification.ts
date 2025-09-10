import { useToast } from '../contexts/ToastContext';

export const useToastNotification = () => {
  const { showToast } = useToast();

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showToast('success', title, message, duration);
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showToast('error', title, message, duration);
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showToast('warning', title, message, duration);
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showToast('info', title, message, duration);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
