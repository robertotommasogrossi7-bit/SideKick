interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, onConfirm, onCancel }: Props) {
  return (
    <div className={`modal${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
        <h3 className="section-title" id="confirmTitle">Delete transaction?</h3>
        <p className="modal__text">This action cannot be undone.</p>
        <div className="modal__actions">
          <button className="btn btn--ghost" type="button" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" type="button" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
