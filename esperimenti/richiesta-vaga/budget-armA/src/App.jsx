import { useState, useEffect, useCallback, useRef } from 'react'
import { loadTransactions, saveTransactions, loadTheme, saveTheme } from './utils/storage'
import { generateID } from './utils/format'
import { filterTransactions, exportToCSV } from './utils/transactions'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import Chart from './components/Chart'
import TransactionForm from './components/TransactionForm'
import Filters from './components/Filters'
import TransactionList from './components/TransactionList'
import ConfirmModal from './components/ConfirmModal'
import ToastContainer from './components/ToastContainer'

export default function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [filters, setFilters] = useState({ category: 'all', type: 'all', search: '' })
  const [editingId, setEditingId] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [theme, setThemeState] = useState(() => loadTheme())
  const [toasts, setToasts] = useState([])
  const [loading, setLoading] = useState(true)
  const formRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light')
  }, [theme])

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const showToast = useCallback((message, variant = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2400)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setThemeState(next)
    saveTheme(next)
  }

  const handleSubmit = ({ title, amount, category, date }) => {
    if (editingId) {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === editingId ? { ...tx, title, amount, category, date } : tx))
      )
      showToast('Transaction updated.')
    } else {
      setTransactions((prev) => [{ id: generateID(), title, amount, category, date }, ...prev])
      showToast('Transaction added.')
    }
    setEditingId(null)
  }

  const handleStartEdit = (id) => {
    setEditingId(id)
    showToast('Editing mode enabled.')
  }

  const handleCancelEdit = () => setEditingId(null)

  const handleDeleteRequest = (id) => setPendingDeleteId(id)

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== pendingDeleteId))
      showToast('Transaction deleted.')
    }
    setPendingDeleteId(null)
  }

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      showToast('No data to export.', 'error')
      return
    }
    exportToCSV(transactions)
    showToast('CSV exported.')
  }

  const handleResetFilters = () => setFilters({ category: 'all', type: 'all', search: '' })

  const handleAddFirst = () => formRef.current?.focusTitle()

  const filtered = filterTransactions(transactions, filters)
  const editingTransaction = editingId ? transactions.find((tx) => tx.id === editingId) ?? null : null

  return (
    <>
      {loading && (
        <div className="skeleton" aria-hidden="true">
          <div className="skeleton__block" />
          <div className="skeleton__block" />
          <div className="skeleton__block" />
        </div>
      )}

      <div className="app">
        <div className="bg-gradient" />
        <Header
          theme={theme}
          onThemeToggle={toggleTheme}
          onExportCsv={handleExportCSV}
          onResetFilters={handleResetFilters}
        />
        <SummaryCards transactions={transactions} />
        <Chart transactions={transactions} />
        <div className="grid">
          <TransactionForm
            ref={formRef}
            editingTransaction={editingTransaction}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
            showToast={showToast}
          />
          <Filters filters={filters} onChange={setFilters} />
        </div>
        <TransactionList
          transactions={filtered}
          onEdit={handleStartEdit}
          onDelete={handleDeleteRequest}
          onAddFirst={handleAddFirst}
        />
      </div>

      <ConfirmModal
        isOpen={pendingDeleteId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
      <ToastContainer toasts={toasts} />
    </>
  )
}
