interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal-content modal-small">
        <div className="modal-header">
          <h2>Confirm Delete</h2>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this habit and all its occurrences?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
