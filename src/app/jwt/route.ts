//
// Don't worry, this script can only save jwt and that's it.
//

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.searchParams.has('token')) {
    const cookiesStorage = cookies();
    cookiesStorage.set('token', url.searchParams.get('token')!, {});
  }

  return NextResponse.redirect(String(process.env.NEXT_PUBLIC_APP_URL));
}
