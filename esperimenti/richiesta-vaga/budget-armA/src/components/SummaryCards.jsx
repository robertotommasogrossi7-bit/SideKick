import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '../utils/format'

export default function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((s, tx) => s + tx.amount, 0)
  const totalExpenses = Math.abs(
    transactions.filter((tx) => tx.amount < 0).reduce((s, tx) => s + tx.amount, 0)
  )
  const totalBalance = totalIncome - totalExpenses

  return (
    <section className="summary">
      <div className="card summary__card summary__card--balance">
        <div className="summary__top">
          <p className="summary__label">Total Balance</p>
          <span className="summary__icon summary__icon--balance">
            <Wallet size={16} />
          </span>
        </div>
        <h2 className="summary__value">{formatCurrency(totalBalance)}</h2>
      </div>
      <div className="card summary__card summary__card--income">
        <div className="summary__top">
          <p className="summary__label">Total Income</p>
          <span className="summary__icon summary__icon--income">
            <TrendingUp size={16} />
          </span>
        </div>
        <h2 className="summary__value summary__value--income">{formatCurrency(totalIncome)}</h2>
      </div>
      <div className="card summary__card summary__card--expense">
        <div className="summary__top">
          <p className="summary__label">Total Expenses</p>
          <span className="summary__icon summary__icon--expense">
            <TrendingDown size={16} />
          </span>
        </div>
        <h2 className="summary__value summary__value--expense">{formatCurrency(totalExpenses)}</h2>
      </div>
    </section>
  )
}
