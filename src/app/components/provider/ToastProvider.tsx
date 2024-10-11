'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';

interface ToastContextType {
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showError: () => {},
  showInfo: () => {},
  showSuccess: () => {},
  showWarning: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ToastMessage) => {
    if (toastRef.current) {
      toastRef.current.show(message);
    }
  };

  const showError = (message: string) => {
    showToast({ severity: 'error', summary: 'Error', detail: message });
  };
  const showInfo = (message: string) => {
    showToast({ severity: 'info', summary: 'Info', detail: message });
  };
  const showSuccess = (message: string) => {
    showToast({ severity: 'success', summary: 'Success', detail: message });
  };
  const showWarning = (message: string) => {
    showToast({ severity: 'warn', summary: 'Warning', detail: message });
  };

  return (
    <ToastContext.Provider
      value={{ showError, showInfo, showSuccess, showWarning }}
    >
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
