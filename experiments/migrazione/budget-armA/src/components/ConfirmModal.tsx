import { useStore } from '../store/useStore';

export default function ConfirmModal() {
  const pendingDeleteId = useStore((s) => s.pendingDeleteId);
  const setPendingDeleteId = useStore((s) => s.setPendingDeleteId);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const addToast = useStore((s) => s.addToast);

  const isOpen = pendingDeleteId !== null;

  const handleConfirm = () => {
    if (pendingDeleteId) {
      deleteTransaction(pendingDeleteId);
      addToast('Transaction deleted.');
    }
    setPendingDeleteId(null);
  };

  const handleClose = () => setPendingDeleteId(null);

  return (
    <div
      className={`modal${isOpen ? ' is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="modal__backdrop" onClick={handleClose} />
      <div
        className="modal__content"
        role="dialog"
        aria-modal
        aria-labelledby="confirmTitle"
      >
        <h3 className="section-title" id="confirmTitle">
          Delete transaction?
        </h3>
        <p className="modal__text">This action cannot be undone.</p>
        <div className="modal__actions">
          <button
            className="btn btn--ghost"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn btn--danger"
            type="button"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
