import { CATEGORY_MAP } from '../utils/categories'
import { formatCurrency, formatDate } from '../utils/format'

function groupByMonth(transactions) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
  const groups = []
  const lookup = new Map()
  sorted.forEach(tx => {
    const label = new Date(tx.date + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    if (!lookup.has(label)) {
      const g = { label, items: [] }
      lookup.set(label, g)
      groups.push(g)
    }
    lookup.get(label).items.push(tx)
  })
  return groups
}

function TransactionItem({ tx, onEdit, onDelete }) {
  const cat = CATEGORY_MAP[tx.category] ?? { icon: '📌', color: '#6b7280' }
  const isIncome = tx.amount >= 0

  return (
    <div className={`transaction transaction--${isIncome ? 'income' : 'expense'}`}>
      <div>
        <p className="transaction__title">{tx.title}</p>
        <div className="transaction__meta">
          <span
            className="badge"
            style={{
              background: `${cat.color}20`,
              color: cat.color,
              border: `1px solid ${cat.color}40`,
            }}
          >
            {cat.icon} {tx.category}
          </span>
          <span>{formatDate(tx.date)}</span>
        </div>
      </div>
      <div className="transaction__right">
        <p className={`amount amount--${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : ''}{formatCurrency(tx.amount)}
        </p>
        <div className="transaction__btns">
          <button className="icon-btn icon-btn--edit" onClick={() => onEdit(tx.id)}>Edit</button>
          <button className="icon-btn icon-btn--delete" onClick={() => onDelete(tx.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <section className="card">
      <div className="transactions__header">
        <h3 className="section-title">Transactions</h3>
        <span className="section-meta">
          {transactions.length} result{transactions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="transactions__empty">
          <div className="empty__icon">+</div>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            No transactions yet. Add your first one above.
          </p>
        </div>
      ) : (
        <div className="transactions__list">
          {groupByMonth(transactions).map(group => (
            <div key={group.label} className="month-group">
              <p className="month-title">{group.label}</p>
              {group.items.map(tx => (
                <TransactionItem key={tx.id} tx={tx} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
