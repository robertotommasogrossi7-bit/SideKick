import { Sun, Moon, Download, RotateCcw } from 'lucide-react'

export default function Header({ theme, onThemeToggle, onExportCsv, onResetFilters }) {
  return (
    <header className="app__header">
      <div>
        <p className="app__eyebrow">Personal Finance</p>
        <h1 className="app__title">Finance Tracker</h1>
        <p className="app__subtitle">Track income, expenses, and your balance with clarity.</p>
      </div>
      <div className="app__actions">
        <button className="btn btn--ghost" onClick={onThemeToggle} type="button">
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="btn btn--accent" onClick={onExportCsv} type="button">
          <Download size={15} />
          Export CSV
        </button>
        <button className="btn btn--ghost" onClick={onResetFilters} type="button">
          <RotateCcw size={15} />
          Reset Filters
        </button>
      </div>
    </header>
  )
}
