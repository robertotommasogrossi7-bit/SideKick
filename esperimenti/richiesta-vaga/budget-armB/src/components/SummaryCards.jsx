import { formatCurrency } from '../utils/format'

export default function SummaryCards({ transactions }) {
  const income = transactions.filter(tx => tx.amount > 0).reduce((s, tx) => s + tx.amount, 0)
  const expenses = Math.abs(transactions.filter(tx => tx.amount < 0).reduce((s, tx) => s + tx.amount, 0))
  const balance = income - expenses

  return (
    <section className="summary">
      <div className="card summary__card">
        <div className="summary__icon" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8' }}>⚖</div>
        <p className="summary__label">Total Balance</p>
        <h2 className={`summary__value ${balance >= 0 ? 'summary__value--income' : 'summary__value--expense'}`}>
          {formatCurrency(balance)}
        </h2>
      </div>
      <div className="card summary__card">
        <div className="summary__icon" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>↑</div>
        <p className="summary__label">Total Income</p>
        <h2 className="summary__value summary__value--income">{formatCurrency(income)}</h2>
      </div>
      <div className="card summary__card">
        <div className="summary__icon" style={{ background: 'rgba(244,63,94,0.12)', color: '#f43f5e' }}>↓</div>
        <p className="summary__label">Total Expenses</p>
        <h2 className="summary__value summary__value--expense">{formatCurrency(expenses)}</h2>
      </div>
    </section>
  )
}
