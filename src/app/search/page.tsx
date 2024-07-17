import React from 'react';
import { redirect } from 'next/navigation';
import Card from '@/components/Card';
import { useBackend } from '@/hooks/useBackend';

async function page({ searchParams }: any) {
  const { search } = useBackend();

  if (!searchParams.q) {
    redirect('/');
  }

  const data = await search(searchParams.q);
  return (
    <div className='m-2 bigp:m-10 flex flex-col items-center'>
      <p className='text-2xl bigp:text-3xl mt-20'>
        Search Result for <span className='font-extrabold'>{searchParams.q}</span>
      </p>
      <div className='mt-10 flex flex-wrap justify-between bigp:justify-start xl:gap-8 bigp:gap-6 gap-3'>
        {data.items.map((manga: any) => (
          <Card manga={manga} key={manga.id} />
        ))}
      </div>
    </div>
  );
}

export default page;
