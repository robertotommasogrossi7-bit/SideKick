import { useEffect } from 'react';
import type { Toast as ToastType } from '../types';
import { useStore } from '../store/useStore';

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useStore((s) => s.removeToast);

  useEffect(() => {
    const id = setTimeout(() => removeToast(toast.id), 2400);
    return () => clearTimeout(id);
  }, [toast.id, removeToast]);

  return (
    <div className={`toast${toast.variant === 'error' ? ' toast--error' : ''}`}>
      {toast.message}
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useStore((s) => s.toasts);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
