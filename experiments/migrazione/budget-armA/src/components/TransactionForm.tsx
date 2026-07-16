import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../types';

export default function TransactionForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<'title' | 'amount' | 'category' | 'date', string>>
  >({});

  const titleInputRef = useRef<HTMLInputElement>(null);

  const editingId = useStore((s) => s.editingId);
  const transactions = useStore((s) => s.transactions);
  const addTransaction = useStore((s) => s.addTransaction);
  const updateTransaction = useStore((s) => s.updateTransaction);
  const setEditingId = useStore((s) => s.setEditingId);
  const addToast = useStore((s) => s.addToast);

  useEffect(() => {
    if (editingId) {
      const tx = transactions.find((t) => t.id === editingId);
      if (tx) {
        setTitle(tx.title);
        setAmount(String(tx.amount));
        setCategory(tx.category);
        setDate(tx.date);
      }
      const timer = setTimeout(() => titleInputRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    } else {
      setTitle('');
      setAmount('');
      setCategory('');
      setDate('');
      setErrors({});
    }
  }, [editingId, transactions]);

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = 'Title is required.';
    const num = Number(amount);
    if (!amount || Number.isNaN(num) || num === 0)
      errs.amount = 'Enter a valid amount.';
    if (!category) errs.category = 'Select a category.';
    if (!date) errs.date = 'Pick a date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fix the highlighted fields.', 'error');
      return;
    }
    const data = { title: title.trim(), amount: Number(amount), category, date };
    if (editingId) {
      updateTransaction(editingId, data);
      addToast('Transaction updated.');
    } else {
      addTransaction(data);
      addToast('Transaction added.');
    }
    setEditingId(null);
  };

  return (
    <div className="card form">
      <h3 className="section-title">Add Transaction</h3>
      <form className="form__grid" onSubmit={handleSubmit} autoComplete="off">
        <label className="form__field">
          <span>Title</span>
          <input
            ref={titleInputRef}
            id="titleInput"
            type="text"
            placeholder="e.g., Freelance Payment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'is-invalid' : ''}
          />
          <small className="error">{errors.title ?? ''}</small>
        </label>

        <label className="form__field">
          <span>Amount</span>
          <input
            type="number"
            placeholder="e.g., 1200 or -45"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? 'is-invalid' : ''}
          />
          <small className="error">{errors.amount ?? ''}</small>
        </label>

        <label className="form__field">
          <span>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.category ? 'is-invalid' : ''}
          >
            <option value="" disabled>
              Select category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <small className="error">{errors.category ?? ''}</small>
        </label>

        <label className="form__field">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'is-invalid' : ''}
          />
          <small className="error">{errors.date ?? ''}</small>
        </label>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit">
            {editingId ? 'Save Changes' : 'Add Transaction'}
          </button>
          {editingId && (
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setEditingId(null)}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
