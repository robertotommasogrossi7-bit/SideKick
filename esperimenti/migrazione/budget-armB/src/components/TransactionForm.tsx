import { useState, useEffect } from "react";
import type { Transaction } from "../types";
import { generateID } from "../utils";

const CATEGORIES = ["Salary", "Business", "Investments", "Housing", "Food", "Transport", "Health", "Entertainment", "Education", "Other"];

interface Props {
  editingTransaction: Transaction | null;
  onSubmit: (tx: Transaction) => void;
  onCancelEdit: () => void;
  focusRef: React.Ref<HTMLInputElement>;
}

interface FormErrors {
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
}

export default function TransactionForm({ editingTransaction, onSubmit, onCancelEdit, focusRef }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(String(editingTransaction.amount));
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
    setErrors({});
  }, [editingTransaction]);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!title.trim()) next.title = "Title is required.";
    const num = Number(amount);
    if (!amount.trim() || Number.isNaN(num) || num === 0) next.amount = "Enter a valid amount.";
    if (!category) next.category = "Select a category.";
    if (!date) next.date = "Pick a date.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const tx: Transaction = {
      id: editingTransaction?.id ?? generateID(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };
    onSubmit(tx);
  };

  return (
    <div className="card form">
      <h3 className="section-title">Add Transaction</h3>
      <form className="form__grid" onSubmit={handleSubmit} autoComplete="off">
        <label className="form__field">
          <span>Title</span>
          <input
            ref={focusRef}
            type="text"
            placeholder="e.g., Freelance Payment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "is-invalid" : ""}
          />
          <small className="error">{errors.title ?? ""}</small>
        </label>

        <label className="form__field">
          <span>Amount</span>
          <input
            type="number"
            placeholder="e.g., 1200 or -45"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? "is-invalid" : ""}
          />
          <small className="error">{errors.amount ?? ""}</small>
        </label>

        <label className="form__field">
          <span>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.category ? "is-invalid" : ""}
          >
            <option value="" disabled>Select category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <small className="error">{errors.category ?? ""}</small>
        </label>

        <label className="form__field">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? "is-invalid" : ""}
          />
          <small className="error">{errors.date ?? ""}</small>
        </label>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit">
            {editingTransaction ? "Save Changes" : "Add Transaction"}
          </button>
          {editingTransaction && (
            <button className="btn btn--ghost" type="button" onClick={onCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
