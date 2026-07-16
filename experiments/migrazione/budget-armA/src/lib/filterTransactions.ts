import type { Transaction, Filters } from '../types';

export const filterTransactions = (
  transactions: Transaction[],
  filters: Filters,
): Transaction[] =>
  transactions.filter((tx) => {
    const matchesCategory =
      filters.category === 'all' || tx.category === filters.category;
    const matchesType =
      filters.type === 'all' ||
      (filters.type === 'income' && tx.amount > 0) ||
      (filters.type === 'expense' && tx.amount < 0);
    const matchesSearch = tx.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });
