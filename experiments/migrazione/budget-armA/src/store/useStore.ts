import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import type { Transaction, Filters, Theme, Toast } from '../types';
import { STORAGE_KEY, THEME_KEY } from '../types';

const generateID = (): string =>
  `tx_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const DEFAULT_FILTERS: Filters = { category: 'all', type: 'all', search: '' };

type PersistedSlice = { transactions: Transaction[] };

// Reads/writes the same raw JSON array as the original vanilla app,
// so existing localStorage data loads without any migration.
const transactionStorage: PersistStorage<PersistedSlice> = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return { state: { transactions: parsed as Transaction[] } };
      }
    } catch {
      // corrupt data — start fresh
    }
    return null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value.state.transactions));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

interface StoreState {
  transactions: Transaction[];
  filters: Filters;
  editingId: string | null;
  pendingDeleteId: string | null;
  theme: Theme;
  toasts: Toast[];
  addTransaction: (data: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, data: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  setEditingId: (id: string | null) => void;
  setPendingDeleteId: (id: string | null) => void;
  setTheme: (theme: Theme) => void;
  addToast: (message: string, variant?: Toast['variant']) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      transactions: [],
      filters: DEFAULT_FILTERS,
      editingId: null,
      pendingDeleteId: null,
      // Read theme synchronously so there is no flash on first render.
      theme: ((localStorage.getItem(THEME_KEY) ?? 'dark') as Theme),
      toasts: [],

      addTransaction: (data) =>
        set((s) => ({
          transactions: [{ ...data, id: generateID() }, ...s.transactions],
        })),

      updateTransaction: (id, data) =>
        set((s) => ({
          transactions: s.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...data } : tx,
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((tx) => tx.id !== id),
        })),

      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),

      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      setEditingId: (id) => set({ editingId: id }),

      setPendingDeleteId: (id) => set({ pendingDeleteId: id }),

      setTheme: (theme) => {
        localStorage.setItem(THEME_KEY, theme);
        set({ theme });
      },

      addToast: (message, variant = 'success') =>
        set((s) => ({
          toasts: [
            ...s.toasts,
            { id: `toast_${Date.now()}_${Math.random()}`, message, variant },
          ],
        })),

      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: STORAGE_KEY,
      storage: transactionStorage,
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);
