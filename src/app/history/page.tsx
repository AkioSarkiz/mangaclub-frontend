import React from 'react';
import Image from 'next/image';
import historyGif from '@/assets/history.gif';

async function page() {
  return (
    <div className='flex flex-col items-center'>
      <p className='text-2xl lg:text-3xl mt-20'>History</p>
      <div className='mt-10 flex flex-wrap justify-center w-full gap-3'>
        <div className='flex'>
          <div>
            <Image src={historyGif} alt='image' width={250} height={250} />
          </div>
          <h1 className='text-3xl'>Authentication is required</h1>
        </div>
      </div>
    </div>
  );
}

export default page;
