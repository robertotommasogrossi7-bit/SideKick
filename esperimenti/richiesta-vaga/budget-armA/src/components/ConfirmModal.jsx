export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="modal is-open" aria-hidden="false">
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
        <h3 className="section-title" id="confirmTitle">Delete transaction?</h3>
        <p className="modal__text">This action cannot be undone.</p>
        <div className="modal__actions">
          <button className="btn btn--ghost" onClick={onCancel} type="button">Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm} type="button">Delete</button>
        </div>
      </div>
    </div>
  )
}
