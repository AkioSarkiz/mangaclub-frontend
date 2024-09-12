import { useBackend } from '@/hooks/useBackend';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.cookies.has('token')) {
    const { getCurrentUser } = useBackend(request.cookies.get('token')?.value);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      const response = NextResponse.next();
      response.cookies.delete('token');

      return response;
    }
  }

  return response;
}
