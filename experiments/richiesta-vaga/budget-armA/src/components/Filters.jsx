const CATEGORIES = [
  'Salary', 'Business', 'Investments', 'Housing', 'Food',
  'Transport', 'Health', 'Entertainment', 'Education', 'Other',
]

export default function Filters({ filters, onChange }) {
  return (
    <div className="card filters">
      <h3 className="section-title">Filters & Search</h3>
      <div className="filters__grid">
        <label className="form__field">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(e) => onChange((f) => ({ ...f, category: e.target.value }))}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>

        <label className="form__field">
          <span>Type</span>
          <select
            value={filters.type}
            onChange={(e) => onChange((f) => ({ ...f, type: e.target.value }))}
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
            value={filters.search}
            onChange={(e) => onChange((f) => ({ ...f, search: e.target.value }))}
            placeholder="Start typing..."
          />
        </label>
      </div>
    </div>
  )
}
