export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast${toast.variant === 'error' ? ' toast--error' : ''}`}>
          <span className={`toast__dot toast__dot--${toast.variant === 'error' ? 'error' : 'success'}`} />
          {toast.message}
        </div>
      ))}
    </div>
  )
}
