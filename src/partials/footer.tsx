import Link from 'next/link';
import React from 'react';
import { Logo } from '@/partials/logo';

export const Footer = () => {
  const APP_NAME = String(process.env.NEXT_PUBLIC_APP_NAME);

  return (
    <footer className='w-full bg-base-300 shadow-xl p-5 flex flex-col items-center space-y-5 border-t-2 dark:border-t-0'>
      <Link href='/'>
        <Logo />
      </Link>
      <div className='flex space-x-5'>
        <Link href='/terms-of-service' className='dark:text-gray-300 text-foreground/70' shallow>
          Terms of Service
        </Link>
        <Link href='/dmca' className='dark:text-gray-300 text-foreground/70' shallow>
          DMCA
        </Link>
      </div>
      <p className='text-sm dark:text-gray-300 text-foreground/70'>
        {APP_NAME} does not store any files on our server, we only linked to the media which is hosted on 3rd party
        services.
      </p>
      <p className='text-sm dark:text-gray-300 text-foreground/70'>Copyright &copy; {APP_NAME}</p>
    </footer>
  );
};
