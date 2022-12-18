import AuthForm from '~/components/auth/AuthForm';
import AuthStyles from '~/styles/auth.css';
import { validateCredentials } from '~/data/validation.server';
import { signup, login } from '~/data/auth.server';

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
      return await login(userData);
    } else {
      return await signup(userData);
    }
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { credentials: error.message }
    } else {
      return { credentials: "An error occurred!" }
    }
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: AuthStyles }];
}
