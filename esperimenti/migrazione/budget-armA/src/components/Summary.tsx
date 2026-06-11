import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/format';

export default function Summary() {
  const transactions = useStore((s) => s.transactions);

  const amounts = transactions.map((tx) => tx.amount);
  const totalIncome = amounts.filter((a) => a > 0).reduce((s, a) => s + a, 0);
  const totalExpenses = amounts.filter((a) => a < 0).reduce((s, a) => s + a, 0);
  const totalBalance = totalIncome + totalExpenses;

  return (
    <section className="summary">
      <div className="card summary__card">
        <p className="summary__label">Total Balance</p>
        <h2 className="summary__value">{formatCurrency(totalBalance)}</h2>
      </div>
      <div className="card summary__card">
        <p className="summary__label">Total Income</p>
        <h2 className="summary__value summary__value--income">
          {formatCurrency(totalIncome)}
        </h2>
      </div>
      <div className="card summary__card">
        <p className="summary__label">Total Expenses</p>
        <h2 className="summary__value summary__value--expense">
          {formatCurrency(Math.abs(totalExpenses))}
        </h2>
      </div>
    </section>
  );
}
