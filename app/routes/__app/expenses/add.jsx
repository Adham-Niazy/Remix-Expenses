import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

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
  
  try {
    validateExpenseInput(expenseData);
  } catch (e) {
    return e;
  }

  await addExpense(expenseData);
  return redirect('/expenses')
}