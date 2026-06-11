import type { Transaction, Filters } from "../types";
import { groupByMonth, formatCurrency, formatDate } from "../utils";

interface Props {
  transactions: Transaction[];
  filters: Filters;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddFirst: () => void;
}

function applyFilters(transactions: Transaction[], filters: Filters): Transaction[] {
  return transactions.filter((tx) => {
    const matchesCategory = filters.category === "all" || tx.category === filters.category;
    const matchesType =
      filters.type === "all" ||
      (filters.type === "income" && tx.amount > 0) ||
      (filters.type === "expense" && tx.amount < 0);
    const matchesSearch = tx.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });
}

export default function TransactionList({ transactions, filters, onEdit, onDelete, onAddFirst }: Props) {
  const filtered = applyFilters(transactions, filters);
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
            <button className="btn btn--accent" type="button" onClick={onAddFirst}>
              Add First Transaction
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="month-group">
              <p className="month-title">{group.label}</p>
              {group.items.map((tx) => {
                const typeClass = tx.amount >= 0 ? "amount--income" : "amount--expense";
                return (
                  <div key={tx.id} className="transaction">
                    <div>
                      <p className="transaction__title">{tx.title}</p>
                      <div className="transaction__meta">
                        <span className="badge">{tx.category}</span>
                        <span>{formatDate(tx.date)}</span>
                      </div>
                    </div>
                    <div>
                      <p className={`amount ${typeClass}`}>{formatCurrency(tx.amount)}</p>
                      <button className="edit-btn" type="button" onClick={() => onEdit(tx.id)}>Edit</button>
                      <button className="delete-btn" type="button" onClick={() => onDelete(tx.id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
