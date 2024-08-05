import Head from 'next/head';
import React from 'react';

function NotFound() {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <div className='flex justify-center items-center h-full'>
        <div>Page Not Found</div>
      </div>
    </>
  );
}

export default NotFound;
