import { useStore } from '../store/useStore';
import { filterTransactions } from '../lib/filterTransactions';
import { groupByMonth } from '../lib/groupByMonth';
import TransactionItem from './TransactionItem';

export default function TransactionList() {
  const transactions = useStore((s) => s.transactions);
  const filters = useStore((s) => s.filters);

  const filtered = filterTransactions(transactions, filters);
  const groups = groupByMonth(filtered);

  return (
    <section className="card transactions">
      <div className="transactions__header">
        <h3 className="section-title">Transactions</h3>
        <p className="transactions__meta">{filtered.length} results</p>
      </div>
      <div className="transactions__list">
        {filtered.length === 0 ? (
          <div className="transactions__empty">
            <div className="empty__icon">+</div>
            <p>No transactions yet. Add your first one to get started.</p>
            <button
              className="btn btn--accent empty-add-btn"
              type="button"
              onClick={() =>
                (document.getElementById('titleInput') as HTMLInputElement | null)?.focus()
              }
            >
              Add First Transaction
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="month-group">
              <p className="month-title">{group.label}</p>
              {group.items.map((tx) => (
                <TransactionItem key={tx.id} tx={tx} />
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
