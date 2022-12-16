import { Outlet } from "@remix-run/react";

import MainHeader from "~/components/navigation/MainHeader";
import MarketingStyles from '~/styles/marketing.css';

export default function ExpensesAppLayout() {
  return <>
    <MainHeader />
    <Outlet />
  </>
}

export function links() {
  return [{ rel: 'stylesheet', href: MarketingStyles }];
}