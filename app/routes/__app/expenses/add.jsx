import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

export default function AddExpensesPage() {
  const navigate = useNavigate();
  function onCloseModal() {
    navigate('..')
  }

  return (
    <Modal onClose={onCloseModal}>
      <ExpenseForm />
    </Modal>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  console.log(expenseData, formData);

  await addExpense(expenseData);
  return redirect('/expenses')
}