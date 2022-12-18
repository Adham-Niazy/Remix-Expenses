import { json } from "@remix-run/node";

import { destroyUserSession } from '~/data/auth.server.js';

export function action({ request }) {
  if (request.method !== 'POST') {
    console.log(request.method);
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
}