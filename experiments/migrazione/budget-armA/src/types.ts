export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export type Theme = 'dark' | 'light';

export interface Filters {
  category: string;
  type: string;
  search: string;
}

export interface Toast {
  id: string;
  message: string;
  variant: 'success' | 'error';
}

export const CATEGORIES = [
  'Salary', 'Business', 'Investments', 'Housing',
  'Food', 'Transport', 'Health', 'Entertainment', 'Education', 'Other',
] as const;

export const STORAGE_KEY = 'financeTrackerData';
export const THEME_KEY = 'financeTrackerTheme';
