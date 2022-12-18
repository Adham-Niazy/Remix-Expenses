import { redirect } from '@remix-run/node';

import AuthForm from '~/components/auth/AuthForm';
import AuthStyles from '~/styles/auth.css';
import { validateCredentials } from '~/data/validation.server';
import { signup } from '~/data/auth.server';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    validateCredentials(userData);
  } catch (e) {
    return e;
  }

  try {
    if (authMode === 'login') {
      // Login Logic
    } else {
      await signup(userData);
      return redirect('/expenses');
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message }
    }
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: AuthStyles }];
}
