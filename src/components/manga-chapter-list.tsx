'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { IMangaChapter } from '@/types';

export function MangaChaptersList({ chapters, mangaId }: any) {
  const [chapterValue, setChapterValue] = useState<string>('');

  const sortedChapters = useMemo(() => {
    return chapters.sort((a: IMangaChapter, b: IMangaChapter) => Number(a.index) + Number(b.index));
  }, [chapters]);

  const filteredChapters = useMemo(() => {
    return sortedChapters.filter((chapter: IMangaChapter) => chapter.title.includes(chapterValue));
  }, [chapterValue]);

  return (
    <>
      <div className='text-xl font-bold pt-4'>Chapters</div>
      <div className='border my-4 rounded-md'>
        <Input
          className='rounded-b-none'
          value={chapterValue}
          onChange={(e) => setChapterValue(e.target.value)}
          placeholder='Search chapter'
        />

        <div className='max-h-[500px] overflow-y-auto'>
          <div className='flex flex-col space-y-4 lg:ml-8 mt-2 w-[50%] mb-8 ml-2'>
            {filteredChapters.map((chapter: IMangaChapter) => (
              <Link href={`/manga/${mangaId}/chapter/${chapter.index}`} key={chapter.index}>
                <span className='flex flex-row hover:bg-white/20 dark:text-gray-200 rounded'>
                  <p className='w-[80%] cursor-pointer'>{chapter.title}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
