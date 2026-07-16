export default function Header({ theme, onToggleTheme, onExportCSV, onResetFilters }) {
  return (
    <header className="app__header">
      <div>
        <p className="app__eyebrow">Personal Finance</p>
        <h1 className="app__title">Finance Tracker</h1>
        <p className="app__subtitle">Track income, expenses, and your balance with clarity.</p>
      </div>
      <div className="app__actions">
        <button className="btn btn--ghost" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
        </button>
        <button className="btn btn--accent" onClick={onExportCSV}>Export CSV</button>
        <button className="btn btn--ghost" onClick={onResetFilters}>Reset Filters</button>
      </div>
    </header>
  )
}
