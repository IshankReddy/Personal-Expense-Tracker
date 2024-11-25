import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import { useExpenses } from '../context/ExpenseContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#374151"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export const ExpenseSummary: React.FC = () => {
  const { expenses } = useExpenses();

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80"> {/* Increased height for better label visibility */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={{
                  stroke: '#374151',
                  strokeWidth: 1,
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900">Total Expenses</h3>
            <p className="text-2xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div key={category} className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600">{category}</h4>
                <p className="text-lg font-semibold text-gray-900">${amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};