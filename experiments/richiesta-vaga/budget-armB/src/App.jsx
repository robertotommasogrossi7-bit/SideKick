import { useState, useReducer, useCallback, useEffect } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import Chart from './components/Chart'
import TransactionForm from './components/TransactionForm'
import Filters from './components/Filters'
import TransactionList from './components/TransactionList'
import DeleteModal from './components/DeleteModal'
import ToastContainer from './components/Toast'

const STORAGE_KEY = 'financeTrackerData'
const THEME_KEY = 'financeTrackerTheme'

function txReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [action.payload, ...state]
    case 'UPDATE': return state.map(tx => tx.id === action.id ? { ...tx, ...action.data } : tx)
    case 'DELETE': return state.filter(tx => tx.id !== action.id)
    default:       return state
  }
}

const genId = () => `tx_${Date.now()}_${Math.random().toString(16).slice(2)}`

export default function App() {
  const [transactions, dispatch] = useReducer(txReducer, null, () => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      return s ? JSON.parse(s) : []
    } catch {
      return []
    }
  })

  const [filters, setFilters]   = useState({ category: 'all', type: 'all', search: '' })
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId]   = useState(null)
  const [toasts, setToasts]       = useState([])
  const [theme, setTheme]         = useState(() => localStorage.getItem(THEME_KEY) || 'dark')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toast = useCallback((message, variant = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, variant }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500)
  }, [])

  const handleSubmit = useCallback((data) => {
    if (editingId) {
      dispatch({ type: 'UPDATE', id: editingId, data })
      setEditingId(null)
      toast('Transaction updated.')
    } else {
      dispatch({ type: 'ADD', payload: { ...data, id: genId() } })
      toast('Transaction added.')
    }
  }, [editingId, toast])

  const handleDelete = useCallback(() => {
    if (deleteId) {
      dispatch({ type: 'DELETE', id: deleteId })
      toast('Transaction deleted.')
    }
    setDeleteId(null)
  }, [deleteId, toast])

  const exportCSV = useCallback(() => {
    if (!transactions.length) { toast('No data to export.', 'error'); return }
    const header = ['Title', 'Amount', 'Category', 'Date']
    const rows = transactions.map(tx => [tx.title, tx.amount, tx.category, tx.date])
    const csv = [header, ...rows]
      .map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(','))
      .join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: 'transactions.csv' })
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast('CSV exported.')
  }, [transactions, toast])

  const filtered = transactions.filter(tx => {
    const { category, type, search } = filters
    if (category !== 'all' && tx.category !== category) return false
    if (type === 'income' && tx.amount <= 0) return false
    if (type === 'expense' && tx.amount >= 0) return false
    if (search && !tx.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const editingTx = editingId ? transactions.find(tx => tx.id === editingId) ?? null : null

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onExportCSV={exportCSV}
        onResetFilters={() => setFilters({ category: 'all', type: 'all', search: '' })}
      />
      <SummaryCards transactions={transactions} />
      <Chart transactions={transactions} />
      <div className="grid">
        <TransactionForm
          onSubmit={handleSubmit}
          editingTransaction={editingTx}
          onCancelEdit={() => setEditingId(null)}
        />
        <Filters filters={filters} onFiltersChange={setFilters} />
      </div>
      <TransactionList
        transactions={filtered}
        onEdit={setEditingId}
        onDelete={setDeleteId}
      />
      <DeleteModal
        isOpen={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <ToastContainer toasts={toasts} />
    </div>
  )
}
