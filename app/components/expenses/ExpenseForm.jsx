import { Form, Link, useActionData, useMatches, useTransition as useNavigation } from "@remix-run/react";

function ExpenseForm() {
  // Required Hooks
  const validationErrors = useActionData();
  const matches = useMatches();
  const navigation = useNavigation();

  const today = new Date().toISOString().slice(0, 10);
  let expenseId = 0;
  const expenses = matches.find(
    (match) => {
      expenseId = match.params.id;
      return match.id === 'routes/__app/expenses';
    }
  ).data;
  const expenseData = expenses.find(expense => expense.id === expenseId);
  const isSubmitting = navigation.state !== 'idle';

  if (expenseId && !expenseData) return <h4>Invalid Expense ID!!</h4>;

  const defaultValues = expenseData || { title: '', amount: '', date: '' };

  return (
    <Form method={expenseData ? 'patch' : 'post'} className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues?.title} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues?.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues.date ? defaultValues.date.slice(0, 10) : ''} />
        </p>
      </div>
      {validationErrors && <ul>
        {Object.values(validationErrors).map(err => <li key={err}>{err}</li>)}
      </ul>}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Expense'}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
