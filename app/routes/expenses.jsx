import { Outlet } from "@remix-run/react";

import ExpensesList from "~/components/expenses/ExpensesList";
import ExpensesStyles from '~/styles/expenses.css';

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

export default function ExpensesLayout() {
  return <>
    <Outlet />
    <main>
      <ExpensesList expenses={EXPENSES_DUMMY}/>
    </main>
  </>
}

export function links() {
  return [{ rel: 'stylesheet', href: ExpensesStyles }];
}