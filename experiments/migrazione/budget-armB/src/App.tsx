import { useState, useEffect, useCallback, useRef } from "react";
import type { Transaction, Filters, Theme, ToastItem } from "./types";
import { exportToCSV, generateID } from "./utils";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Chart from "./components/Chart";
import TransactionForm from "./components/TransactionForm";
import FiltersPanel from "./components/Filters";
import TransactionList from "./components/TransactionList";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";

const STORAGE_KEY = "financeTrackerData";
const THEME_KEY = "financeTrackerTheme";

const loadTransactions = (): Transaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Transaction[]) : [];
  } catch {
    return [];
  }
};

const loadTheme = (): Theme => {
  return (localStorage.getItem(THEME_KEY) as Theme) || "dark";
};

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [filters, setFilters] = useState<Filters>({ category: "all", type: "all", search: "" });
  const [theme, setThemeState] = useState<Theme>(loadTheme);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [skeletonHidden, setSkeletonHidden] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setSkeletonHidden(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const showToast = useCallback((message: string, variant: ToastItem["variant"] = "success") => {
    const id = generateID();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2400);
  }, []);

  const handleSubmit = (tx: Transaction) => {
    if (editingId) {
      setTransactions((prev) => prev.map((t) => (t.id === editingId ? tx : t)));
      showToast("Transaction updated.");
      setEditingId(null);
    } else {
      setTransactions((prev) => [tx, ...prev]);
      showToast("Transaction added.");
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    showToast("Editing mode enabled.");
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const handleDelete = (id: string) => setPendingDeleteId(id);

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      setTransactions((prev) => prev.filter((t) => t.id !== pendingDeleteId));
      showToast("Transaction deleted.");
    }
    setPendingDeleteId(null);
  };

  const handleCancelEdit = () => setEditingId(null);

  const handleToggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  const handleExportCSV = () => {
    if (transactions.length === 0) { showToast("No data to export.", "error"); return; }
    exportToCSV(transactions);
    showToast("CSV exported.");
  };

  const handleResetFilters = () => setFilters({ category: "all", type: "all", search: "" });

  const editingTransaction = editingId ? (transactions.find((t) => t.id === editingId) ?? null) : null;

  return (
    <>
      <div className={`skeleton${skeletonHidden ? " is-hidden" : ""}`} aria-hidden="true">
        <div className="skeleton__block" />
        <div className="skeleton__block" />
        <div className="skeleton__block" />
      </div>

      <div className="bg-gradient" />

      <div className="app">
        <Header
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onExportCSV={handleExportCSV}
          onResetFilters={handleResetFilters}
        />

        <Summary transactions={transactions} />

        <Chart transactions={transactions} />

        <section className="grid">
          <TransactionForm
            editingTransaction={editingTransaction}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
            focusRef={titleInputRef}
          />
          <FiltersPanel filters={filters} onChange={setFilters} />
        </section>

        <TransactionList
          transactions={transactions}
          filters={filters}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddFirst={() => titleInputRef.current?.focus()}
        />
      </div>

      <ConfirmModal
        isOpen={pendingDeleteId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />

      <Toast toasts={toasts} />
    </>
  );
}
