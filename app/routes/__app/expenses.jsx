import { Link, Outlet } from "@remix-run/react";
import { FaPlus, FaDownload } from 'react-icons/fa';

import ExpensesList from "~/components/expenses/ExpensesList";

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
      <section id="expenses-actions">
        <Link to="add">
          <FaPlus />
          <span>Add Expense</span>
        </Link>
        <a href="/expenses/raw">
          <FaDownload />
          <span>Load Raw Data</span>
        </a>
      </section>
      <ExpensesList expenses={EXPENSES_DUMMY}/>
    </main>
  </>
}