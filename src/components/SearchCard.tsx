import { CompactManga } from '@/@types';
import Link from 'next/link';
import React from 'react';

interface SearchCardProps {
  manga: CompactManga;
}

function SearchCard({ manga }: SearchCardProps) {
  return (
    <Link
      href={`/manga/${manga.id}`}
      className='flex items-center gap-5 p-5 hover:cursor-pointer hover:bg-base-300 hover:text-purple-300'
    >
      <img src={manga.cover} alt={manga.title} width={80} height={80} className='object-contain' />
      <div className=''>
        <p className='font-bold break-word capitalize'>{manga.title}</p>
      </div>
    </Link>
  );
}

export default SearchCard;
