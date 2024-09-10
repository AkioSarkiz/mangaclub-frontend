import React from 'react';
import Image from 'next/image';
import historyGif from '@/assets/history.gif';
import { useBackend } from '@/hooks/useBackend';
import { cookies } from 'next/headers';

async function page() {
  const cookiesStore = cookies();

  const { getCurrentUser } = useBackend(cookiesStore.get('token')?.value);
  const currentUser = await getCurrentUser();

  return (
    <div className='flex flex-col items-center'>
      <p className='text-2xl font-extrabold text lg:text-3xl mt-20'>History</p>
      <div className='mt-10 flex flex-wrap justify-center w-full gap-3'>
        {!currentUser && (
          <div className='flex flex-col'>
            <div>
              <Image className='mx-auto' src={historyGif} alt='image' width={250} height={250} />
            </div>
            <h1 className='text-lg'>Authentication is required</h1>
          </div>
        )}
        {currentUser && <div>Currently it doesn't supported</div>}
      </div>
    </div>
  );
}

export default page;
