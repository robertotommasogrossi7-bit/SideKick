import { useStore } from '../store/useStore';
import { exportToCSV } from '../lib/csv';

export default function Header() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);
  const resetFilters = useStore((s) => s.resetFilters);
  const transactions = useStore((s) => s.transactions);
  const addToast = useStore((s) => s.addToast);

  const handleExport = () => {
    if (transactions.length === 0) {
      addToast('No data to export.', 'error');
      return;
    }
    exportToCSV(transactions);
    addToast('CSV exported.');
  };

  return (
    <header className="app__header">
      <div>
        <p className="app__eyebrow">Personal Finance</p>
        <h1 className="app__title">Advanced Finance Tracker</h1>
        <p className="app__subtitle">
          Track income, expenses, and your balance with clarity.
        </p>
      </div>
      <div className="app__actions">
        <button
          className="btn btn--ghost"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button className="btn btn--accent" type="button" onClick={handleExport}>
          Export CSV
        </button>
        <button
          className="btn btn--ghost"
          type="button"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </header>
  );
}
