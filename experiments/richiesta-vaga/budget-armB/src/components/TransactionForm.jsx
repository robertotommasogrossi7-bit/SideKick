import { useState, useEffect } from 'react'
import { CATEGORIES } from '../utils/categories'

const EMPTY = { title: '', amount: '', category: '', date: '' }

export default function TransactionForm({ onSubmit, editingTransaction, onCancelEdit }) {
  const [fields, setFields] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingTransaction) {
      setFields({
        title: editingTransaction.title,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        date: editingTransaction.date,
      })
      setErrors({})
    } else {
      setFields(EMPTY)
      setErrors({})
    }
  }, [editingTransaction])

  const set = key => e => setFields(prev => ({ ...prev, [key]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!fields.title.trim()) errs.title = 'Title is required.'
    const n = Number(fields.amount)
    if (!fields.amount || isNaN(n) || n === 0) errs.amount = 'Enter a valid non-zero amount.'
    if (!fields.category) errs.category = 'Select a category.'
    if (!fields.date) errs.date = 'Pick a date.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...fields, amount: Number(fields.amount) })
    setFields(EMPTY)
    setErrors({})
  }

  const handleCancel = () => {
    setFields(EMPTY)
    setErrors({})
    onCancelEdit()
  }

  const isEditing = !!editingTransaction

  return (
    <div className="card">
      <h3 className="section-title form__title">
        {isEditing ? 'Edit Transaction' : 'Add Transaction'}
      </h3>
      <form className="form__grid" onSubmit={handleSubmit} autoComplete="off">
        <div className="form__field">
          <label className="form__label">Title</label>
          <input
            className={`form__input${errors.title ? ' is-invalid' : ''}`}
            type="text"
            placeholder="e.g., Freelance Payment"
            value={fields.title}
            onChange={set('title')}
          />
          <span className="form__error">{errors.title}</span>
        </div>

        <div className="form__field">
          <label className="form__label">Amount</label>
          <input
            className={`form__input${errors.amount ? ' is-invalid' : ''}`}
            type="number"
            placeholder="Positive = income, negative = expense"
            value={fields.amount}
            onChange={set('amount')}
          />
          <span className="form__error">{errors.amount}</span>
        </div>

        <div className="form__field">
          <label className="form__label">Category</label>
          <select
            className={`form__select${errors.category ? ' is-invalid' : ''}`}
            value={fields.category}
            onChange={set('category')}
          >
            <option value="">Select category</option>
            {CATEGORIES.map(c => (
              <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
          <span className="form__error">{errors.category}</span>
        </div>

        <div className="form__field">
          <label className="form__label">Date</label>
          <input
            className={`form__input${errors.date ? ' is-invalid' : ''}`}
            type="date"
            value={fields.date}
            onChange={set('date')}
          />
          <span className="form__error">{errors.date}</span>
        </div>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
          {isEditing && (
            <button className="btn btn--ghost" type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
