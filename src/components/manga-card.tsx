'use client';

import React from 'react';
import { CompactManga } from '@/types';
import Link from 'next/link';

type Props = {
  manga: CompactManga;
};

function Card({ manga }: Props) {
  return (
    <Link href={`/manga/${manga.id}`}>
      <div className='w-full max-w-[300px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
        <div className='relative'>
          <img src={manga.cover} alt='Manga Cover' width={300} height={400} className='w-full h-[400px] object-cover' />
          <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6'>
            <h3 className='text-lg font-bold text-white truncate'>{manga.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
