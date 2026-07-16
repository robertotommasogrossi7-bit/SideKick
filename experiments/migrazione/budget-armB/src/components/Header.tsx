import type { Theme } from "../types";

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
  onExportCSV: () => void;
  onResetFilters: () => void;
}

export default function Header({ theme, onToggleTheme, onExportCSV, onResetFilters }: Props) {
  return (
    <header className="app__header">
      <div>
        <p className="app__eyebrow">Personal Finance</p>
        <h1 className="app__title">Advanced Finance Tracker</h1>
        <p className="app__subtitle">Track income, expenses, and your balance with clarity.</p>
      </div>
      <div className="app__actions">
        <button className="btn btn--ghost" type="button" onClick={onToggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
        <button className="btn btn--accent" type="button" onClick={onExportCSV}>
          Export CSV
        </button>
        <button className="btn btn--ghost" type="button" onClick={onResetFilters}>
          Reset Filters
        </button>
      </div>
    </header>
  );
}
