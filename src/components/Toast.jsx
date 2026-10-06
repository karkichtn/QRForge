import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
          {toast.type === 'error' && <AlertCircle size={18} color="#f43f5e" />}
          {toast.type === 'info' && <Info size={18} color="#38bdf8" />}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            style={{ color: 'var(--text-muted)', display: 'flex', padding: 2 }}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
