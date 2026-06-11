import { useStore } from '../store/useStore';
import { CATEGORIES } from '../types';

export default function Filters() {
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);

  return (
    <div className="card filters">
      <h3 className="section-title">Filters &amp; Search</h3>
      <div className="filters__grid">
        <label className="form__field">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="form__field">
          <span>Type</span>
          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
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
            onChange={(e) => setFilter('search', e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
