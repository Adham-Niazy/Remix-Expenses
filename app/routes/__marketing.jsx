import { Outlet } from "@remix-run/react";

import { getUserFromSession } from '~/data/auth.server.js';
import MainHeader from "~/components/navigation/MainHeader";
import MarketingStyles from '~/styles/marketing.css';

export default function ExpensesAppLayout() {
  return <>
    <MainHeader />
    <Outlet />
  </>
}

export function loader({ request }) {
  return getUserFromSession(request)
}

export function links() {
  return [{ rel: 'stylesheet', href: MarketingStyles }];
}

export function headers() {
  return {
    'Cache-Control': 'max-age=3600' // 60 minutes
  }
}