export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface Filters {
  category: string;
  type: "all" | "income" | "expense";
  search: string;
}

export type Theme = "dark" | "light";

export interface ToastItem {
  id: string;
  message: string;
  variant: "success" | "error";
}
