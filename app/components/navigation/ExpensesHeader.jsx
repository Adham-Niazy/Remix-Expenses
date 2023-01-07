import { Form, NavLink } from '@remix-run/react';

import Logo from '../util/Logo';

export default function ExpensesHeader() {
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <Form method='post' action='/logout' id='logout-form'>
          <button className='cta-alt'>Logout</button>
        </Form>
      </nav>
    </header>
  );
};