import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { updateExpense, deleteExpense } from "~/data/expenses.server";
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

async function handlePatchRequest(expenseId, expenseData) {
  try {
    validateExpenseInput(expenseData);
  } catch (e) {
    return e;
  }
  await updateExpense(expenseId, expenseData);
}

export async function action({ request, params }) {
  const expenseId = params.id;
  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    await handlePatchRequest(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return { deletedId: expenseId }
  }
}