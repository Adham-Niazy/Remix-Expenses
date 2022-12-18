import AuthForm from '~/components/auth/AuthForm';
import AuthStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  // Validate User Input

  if ( authMode === 'login' ) {
    // Login Logic
  } else {
    // Signup Logic
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: AuthStyles }];
}
