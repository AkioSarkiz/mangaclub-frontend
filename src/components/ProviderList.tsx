'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

export function MangaChaptersList({ chapters, mangaId }: any) {
  return (
    <>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a source' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sources</SelectLabel>
            <SelectItem value='manganato'>Manganato</SelectItem>
            <SelectItem value='mangadex'>Mangadex</SelectItem>
            <SelectItem value='toonily'>Toonily</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='flex flex-col space-y-4 bigp:ml-8 mt-2 w-[50%] mb-8'>
        {chapters.map((chapter: any) => (
          <Link href={`/manga/${mangaId}/chapter/${chapter.id}`} key={chapter.id}>
            <span className='flex flex-row hover:bg-white/20 text-gray-200 transition duration-300 rounded p-[0_0.375rem]'>
              <p className='w-[80%] cursor-pointer'>{chapter.title}</p>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
