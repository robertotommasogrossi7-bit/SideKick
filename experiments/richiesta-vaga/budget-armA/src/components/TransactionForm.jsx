import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

const CATEGORIES = [
  'Salary', 'Business', 'Investments', 'Housing', 'Food',
  'Transport', 'Health', 'Entertainment', 'Education', 'Other',
]

const EMPTY = { title: '', amount: '', category: '', date: '' }

const TransactionForm = forwardRef(function TransactionForm(
  { editingTransaction, onSubmit, onCancelEdit, showToast },
  ref
) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const titleRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focusTitle: () => titleRef.current?.focus(),
  }))

  useEffect(() => {
    if (editingTransaction) {
      setValues({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        date: editingTransaction.date,
      })
      titleRef.current?.focus()
    } else {
      setValues(EMPTY)
    }
    setErrors({})
  }, [editingTransaction])

  const validate = () => {
    const errs = {}
    if (!values.title.trim()) errs.title = 'Title is required.'
    const n = Number(values.amount)
    if (!values.amount || Number.isNaN(n) || n === 0) errs.amount = 'Enter a valid amount.'
    if (!values.category) errs.category = 'Select a category.'
    if (!values.date) errs.date = 'Pick a date.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      showToast('Please fix the highlighted fields.', 'error')
      return
    }
    setErrors({})
    onSubmit({
      title: values.title.trim(),
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
    })
    setValues(EMPTY)
  }

  const handleCancel = () => {
    setValues(EMPTY)
    setErrors({})
    onCancelEdit()
  }

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  return (
    <div className="card form">
      <h3 className="section-title">
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h3>
      <form className="form__grid" onSubmit={handleSubmit} autoComplete="off">
        <label className="form__field">
          <span>Title</span>
          <input
            ref={titleRef}
            type="text"
            value={values.title}
            onChange={set('title')}
            placeholder="e.g., Freelance Payment"
            className={errors.title ? 'is-invalid' : ''}
          />
          <small className="error">{errors.title || ''}</small>
        </label>

        <label className="form__field">
          <span>Amount</span>
          <input
            type="number"
            value={values.amount}
            onChange={set('amount')}
            placeholder="e.g., 1200 or -45"
            className={errors.amount ? 'is-invalid' : ''}
          />
          <small className="error">{errors.amount || ''}</small>
        </label>

        <label className="form__field">
          <span>Category</span>
          <select
            value={values.category}
            onChange={set('category')}
            className={errors.category ? 'is-invalid' : ''}
          >
            <option value="" disabled>Select category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <small className="error">{errors.category || ''}</small>
        </label>

        <label className="form__field">
          <span>Date</span>
          <input
            type="date"
            value={values.date}
            onChange={set('date')}
            className={errors.date ? 'is-invalid' : ''}
          />
          <small className="error">{errors.date || ''}</small>
        </label>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit">
            {editingTransaction ? 'Save Changes' : 'Add Transaction'}
          </button>
          {editingTransaction && (
            <button className="btn btn--ghost" type="button" onClick={handleCancel}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  )
})

export default TransactionForm
