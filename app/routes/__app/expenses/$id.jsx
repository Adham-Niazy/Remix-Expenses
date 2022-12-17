import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function EditExpensesPage() {
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
  const expenseId = params.id;
  
  try {
    validateExpenseInput(expenseData);
  } catch (e) {
    return e;
  }

  await updateExpense(expenseId, expenseData);
  return redirect('/expenses')
}