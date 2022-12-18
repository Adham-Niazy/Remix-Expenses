import { Link, useFetcher } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    const procced = confirm('Are you sure? Do you want to delete this item?');
    if (!procced) return;

    fetcher.submit(null, {
      method: 'delete',
      action: `/expenses/${id}`
    })
  }

  if (fetcher.state !== 'idle') {
    return <article className="expense-item locked">
      <p>Deleting...</p>
    </article>
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">EGP {amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
