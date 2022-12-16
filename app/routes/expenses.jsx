import { Outlet } from "@remix-run/react";

export default function ExpensesLayout() {
  return <main>
    <p>Shared Element</p>
    <Outlet />
  </main>
}