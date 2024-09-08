'use client';

import { Button } from '@/components/ui/button';

export function SignOut() {
  const signOut = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = window.location.href;
  };

  return (
    <Button variant={'secondary'} className='cursor-pointer' onClick={signOut}>
      Sign out
    </Button>
  );
}
