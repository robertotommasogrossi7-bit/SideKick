import { groupByMonth } from '../utils/transactions'
import TransactionItem from './TransactionItem'

export default function TransactionList({ transactions, onEdit, onDelete, onAddFirst }) {
  const groups = groupByMonth(transactions)

  return (
    <section className="card transactions">
      <div className="transactions__header">
        <h3 className="section-title">Transactions</h3>
        <p className="transactions__meta">{transactions.length} results</p>
      </div>

      <div className="transactions__list">
        {transactions.length === 0 ? (
          <div className="transactions__empty">
            <div className="empty__icon">+</div>
            <p>No transactions yet. Add your first one to get started.</p>
            <button className="btn btn--accent empty-add-btn" type="button" onClick={onAddFirst}>
              Add First Transaction
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="month-group">
              <p className="month-title">{group.label}</p>
              {group.items.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  onEdit={() => onEdit(tx.id)}
                  onDelete={() => onDelete(tx.id)}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
