import type { Transaction } from '../types';
import { formatCurrency, formatDate } from '../lib/format';
import { useStore } from '../store/useStore';

interface Props {
  tx: Transaction;
}

export default function TransactionItem({ tx }: Props) {
  const setEditingId = useStore((s) => s.setEditingId);
  const setPendingDeleteId = useStore((s) => s.setPendingDeleteId);
  const addToast = useStore((s) => s.addToast);

  const handleEdit = () => {
    setEditingId(tx.id);
    addToast('Editing mode enabled.');
  };

  const typeClass = tx.amount >= 0 ? 'amount--income' : 'amount--expense';

  return (
    <div className="transaction">
      <div>
        <p className="transaction__title">{tx.title}</p>
        <div className="transaction__meta">
          <span className="badge">{tx.category}</span>
          <span>{formatDate(tx.date)}</span>
        </div>
      </div>
      <div>
        <p className={`amount ${typeClass}`}>{formatCurrency(tx.amount)}</p>
        <button className="edit-btn" type="button" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="delete-btn"
          type="button"
          onClick={() => setPendingDeleteId(tx.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
