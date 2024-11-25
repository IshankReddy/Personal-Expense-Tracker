export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
}