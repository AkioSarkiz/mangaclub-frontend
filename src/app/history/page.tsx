import React from 'react';
import List from './partials/List';

async function page() {
  return (
    <div className='flex flex-col items-center'>
      <p className='text-2xl lg:text-3xl mt-20'>History</p>
      <div className='mt-10 flex flex-wrap justify-center w-full gap-3'>
        <List />
      </div>
    </div>
  );
}

export default page;
