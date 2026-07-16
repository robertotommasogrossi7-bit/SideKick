import type { Filters } from "../types";

const CATEGORIES = ["Salary", "Business", "Investments", "Housing", "Food", "Transport", "Health", "Entertainment", "Education", "Other"];

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FiltersPanel({ filters, onChange }: Props) {
  return (
    <div className="card filters">
      <h3 className="section-title">Filters &amp; Search</h3>
      <div className="filters__grid">
        <label className="form__field">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>

        <label className="form__field">
          <span>Type</span>
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value as Filters["type"] })}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="form__field form__field--full">
          <span>Search by title</span>
          <input
            type="text"
            placeholder="Start typing..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}
