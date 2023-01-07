import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
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

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  
  try {
    validateExpenseInput(expenseData);
  } catch (e) {
    return e;
  }
  const userId = await requireUserSession(request);

  await addExpense(expenseData, userId);
  return redirect('/expenses')
}