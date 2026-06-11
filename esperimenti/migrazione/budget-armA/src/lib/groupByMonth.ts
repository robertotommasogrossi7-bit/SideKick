import type { Transaction } from '../types';

export interface MonthGroup {
  label: string;
  items: Transaction[];
}

export const groupByMonth = (transactions: Transaction[]): MonthGroup[] => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const groups: MonthGroup[] = [];
  const lookup = new Map<string, MonthGroup>();

  sorted.forEach((tx) => {
    const label = new Date(tx.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    if (!lookup.has(label)) {
      lookup.set(label, { label, items: [] });
      groups.push(lookup.get(label)!);
    }
    lookup.get(label)!.items.push(tx);
  });

  return groups;
};
