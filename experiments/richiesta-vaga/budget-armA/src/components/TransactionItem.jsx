import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/format'

const CATEGORY_ICON = {
  Salary: '💼',
  Business: '📊',
  Investments: '📈',
  Housing: '🏠',
  Food: '🍽️',
  Transport: '🚗',
  Health: '⚕️',
  Entertainment: '🎮',
  Education: '📚',
  Other: '📦',
}

const CATEGORY_COLOR = {
  Salary: '#60a5fa',
  Business: '#34d399',
  Investments: '#a78bfa',
  Housing: '#fb923c',
  Food: '#f59e0b',
  Transport: '#38bdf8',
  Health: '#f472b6',
  Entertainment: '#818cf8',
  Education: '#4ade80',
  Other: '#94a3b8',
}

export default function TransactionItem({ transaction: tx, onEdit, onDelete }) {
  const isIncome = tx.amount >= 0
  const color = CATEGORY_COLOR[tx.category] || '#94a3b8'
  const icon = CATEGORY_ICON[tx.category] || '•'

  return (
    <div className="transaction">
      <div className="transaction__info">
        <p className="transaction__title">{tx.title}</p>
        <div className="transaction__meta">
          <span
            className="badge"
            style={{ '--badge-color': color }}
          >
            <span className="badge__icon">{icon}</span>
            {tx.category}
          </span>
          <span>{formatDate(tx.date)}</span>
        </div>
      </div>
      <div className="transaction__right">
        <p className={`amount ${isIncome ? 'amount--income' : 'amount--expense'}`}>
          {isIncome ? '+' : ''}{formatCurrency(tx.amount)}
        </p>
        <div className="transaction__actions">
          <button className="icon-btn icon-btn--edit" onClick={onEdit} title="Edit">
            <Pencil size={14} />
          </button>
          <button className="icon-btn icon-btn--delete" onClick={onDelete} title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
