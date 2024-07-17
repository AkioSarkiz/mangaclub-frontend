'use client';

import React, { useState, useEffect } from 'react';
import SearchCard from '@/components/SearchCard';
import Loading from '@/components/LoadingSingle';
import Link from 'next/link';
import { useBackend } from '@/hooks/useBackend';
import { CompactManga } from '@/types';

function Search() {
  const [searchInput, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState<CompactManga[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { search } = useBackend();

  useEffect(() => {
    if (searchInput === '') return setSearchFilter([]);
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      const data = await search(searchInput);
      setSearchFilter(data.items.slice(0, 4));
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchInput]);

  const handleSearchCallback = () => {
    setSearch('');
    setSearchFilter([]);
  };

  return (
    <>
      <div className='relative w-full'>
        <label className='w-full relative block'>
          <span className='absolute inset-y-0 right-0 flex items-center pr-3'>
            <svg
              className='h-5 w-5 fill-white'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='30'
              height='30'
              viewBox='0 0 30 30'
            >
              <path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z'></path>
            </svg>
          </span>
          <input
            className='w-full bg-transparent placeholder:font-italitc rounded-2xl py-2 pl-4 pr-12 focus:outline-none border-2 focus:border-white border-gray-400'
            placeholder='Search Manga'
            type='text'
            value={searchInput}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          />
        </label>
        <div className='absolute z-[99] w-full'>
          <div className='mt-1 bg-opacity-90 bg-base-100 shadow-lg rounded-2xl w-full'>
            {isFocused && loading && (
              <div className='flex w-full gap-5 p-10 items-center justify-center'>
                <Loading />
              </div>
            )}
            {isFocused && !loading && searchFilter.length > 0 && (
              <>
                {searchFilter.map((manga: any) => (
                  <SearchCard manga={manga} key={manga.id} />
                ))}
                <Link
                  className='btn btn-outline w-full'
                  href={`/search?q=${encodeURIComponent(searchInput)}`}
                  onClick={handleSearchCallback}
                >
                  More ...
                </Link>
              </>
            )}
            {isFocused && !loading && searchFilter.length === 0 && (
              <div className='flex w-full gap-5 p-10 items-center justify-center'>
                <p className='text-center'>No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
