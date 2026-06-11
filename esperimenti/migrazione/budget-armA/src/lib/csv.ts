import type { Transaction } from '../types';

export const exportToCSV = (transactions: Transaction[]): void => {
  const headers = ['Title', 'Amount', 'Category', 'Date'];
  const rows = transactions.map((tx) => [tx.title, tx.amount, tx.category, tx.date]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transactions.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
