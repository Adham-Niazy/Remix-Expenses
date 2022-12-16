import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

const EXPENSES_DUMMY = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString()
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 1.99,
    date: new Date().toISOString()
  }
]

export default function AnalysisExpensesPage() {
  return <main>
    <Chart expenses={EXPENSES_DUMMY} />
    <ExpenseStatistics expenses={EXPENSES_DUMMY} />
  </main>
}