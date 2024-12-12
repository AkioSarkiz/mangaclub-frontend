import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Not found',
  robots: 'noindex, nofollow',
};

function NotFound() {
  return (
    <div className='flex justify-center items-center h-full'>
      <div>Page Not Found</div>
    </div>
  );
}

export default NotFound;
