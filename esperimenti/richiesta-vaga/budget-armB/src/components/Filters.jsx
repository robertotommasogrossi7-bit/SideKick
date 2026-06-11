import { CATEGORIES } from '../utils/categories'

export default function Filters({ filters, onFiltersChange }) {
  const set = key => e => onFiltersChange(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="card">
      <h3 className="section-title form__title">Filters & Search</h3>
      <div className="filters__grid">
        <div className="form__field">
          <label className="form__label">Category</label>
          <select className="form__select" value={filters.category} onChange={set('category')}>
            <option value="all">All categories</option>
            {CATEGORIES.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form__field">
          <label className="form__label">Type</label>
          <select className="form__select" value={filters.type} onChange={set('type')}>
            <option value="all">All</option>
            <option value="income">Income only</option>
            <option value="expense">Expense only</option>
          </select>
        </div>

        <div className="form__field">
          <label className="form__label">Search</label>
          <input
            className="form__input"
            type="text"
            placeholder="Search by title…"
            value={filters.search}
            onChange={set('search')}
          />
        </div>
      </div>
    </div>
  )
}
