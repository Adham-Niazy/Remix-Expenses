import { Outlet } from "@remix-run/react";

import ExpensesStyles from '~/styles/expenses.css';

export default function ExpensesLayout() {
  return <main>
    <p>Shared Element</p>
    <Outlet />
  </main>
}

export function links() {
  return [{ rel: 'stylesheet', href: ExpensesStyles }];
}