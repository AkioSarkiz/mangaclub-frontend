'use client';

import { Input } from '@/components/ui/input';
import { useBackend } from '@/hooks/useBackend';
import { ICompactManga } from '@/types';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import Loading from '@/components/loading-single';
import Link from 'next/link';
import SearchCard from '@/components/search-card';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const [searchInput, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState<ICompactManga[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { getCatalogPage } = useBackend();

  useEffect(() => {
    if (searchInput === '') {
      return setSearchFilter([]);
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      const data = await getCatalogPage({ query: searchInput });
      setSearchFilter(data.items.slice(0, 4));
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchInput]);

  const handleSearchCallback = () => {
    inputRef.current?.blur();
  };

  return (
    <div className='relative w-full max-w-md'>
      <div className='relative'>
        <Input
          ref={inputRef}
          type='search'
          placeholder='Search...'
          className='pr-10'
          value={searchInput}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
      </div>
      <div
        className={`absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950 ${
          isFocused ? '' : 'hidden'
        }`}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className='max-h-[300px] overflow-y-auto'>
          {loading && (
            <div className='flex w-full gap-5 p-10 items-center justify-center'>
              <Loading />
            </div>
          )}
          {!loading && searchFilter.length > 0 && (
            <>
              {searchFilter.map((manga: any) => (
                <SearchCard manga={manga} key={manga.id} onClick={handleSearchCallback} />
              ))}
              <div className='flex items-center justify-center'>
                <Link href={`/browse?q=${encodeURIComponent(searchInput)}`} onClick={handleSearchCallback}>
                  <Button variant={'link'}>More ...</Button>
                </Link>
              </div>
            </>
          )}
          {!loading && searchFilter.length === 0 && (
            <div className='flex w-full gap-5 p-10 items-center justify-center'>
              <p className='text-center'>No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
