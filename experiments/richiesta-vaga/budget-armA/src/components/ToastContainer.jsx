export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast${toast.variant === 'error' ? ' toast--error' : ''}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
