import type { Transaction } from "./types";

export const generateID = (): string =>
  `tx_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
    const label = new Date(tx.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!lookup.has(label)) {
      const group: MonthGroup = { label, items: [] };
      lookup.set(label, group);
      groups.push(group);
    }
    lookup.get(label)!.items.push(tx);
  });
  return groups;
};

export const exportToCSV = (transactions: Transaction[]): void => {
  const headers = ["Title", "Amount", "Category", "Date"];
  const rows = transactions.map((tx) => [tx.title, tx.amount, tx.category, tx.date]);
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).split('"').join('""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
