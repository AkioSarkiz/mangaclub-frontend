// We are using framer-motion for animation here so we need to make component client side.
'use client';

import React from 'react';
import { CompactManga } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  manga: CompactManga;
};

function MangaCard({ manga }: Props) {
  return (
    <Link href={`/manga/${manga.slug}`}>
      <motion.div whileHover={{ scale: 1.1 }}>
        <div className='w-auto lg:max-w-[300px] rounded-lg overflow-hidden shadow-lg dark:shadow-none'>
          <div className='relative'>
            <img
              src={manga.cover}
              alt='Manga Cover'
              width={300}
              height={400}
              className='w-auto lg:w-full h-auto lg:h-[400px] object-cover'
            />
            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6'>
              <h3 className='text-lg font-bold text-white truncate'>{manga.title}</h3>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export { MangaCard };
