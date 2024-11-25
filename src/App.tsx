import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { Wallet } from 'lucide-react';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">Personal Expense Tracker</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <ExpenseForm />
            <ExpenseSummary />
            <ExpenseList />
          </div>
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;