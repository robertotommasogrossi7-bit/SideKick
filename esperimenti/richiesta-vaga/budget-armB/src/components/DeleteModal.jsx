export default function DeleteModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h3 className="modal__title" id="modal-title">Delete transaction?</h3>
        <p className="modal__text">This action cannot be undone.</p>
        <div className="modal__actions">
          <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
