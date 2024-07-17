import React from 'react';
import Searchmanga from '@/partials/Search';
import { nightTokyo } from '@/utils/fonts';
import Link from 'next/link';

function Header() {
  return (
    <div>
      <div className='navbar bg-gradient-to-b from-base-300 relative bigp:top-0 bigp:z-50'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost bigp:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/history'>History</Link>
              </li>
              <li>
                <Link href='/followed'>follow</Link>
              </li>
            </ul>
          </div>
          <div className='flex items-center'>
            <Link
              href='/'
              className={`${nightTokyo.className} pt-2 btn btn-ghost font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 tracking-widest`}
            >
              ML
            </Link>
          </div>
          <ul className='menu menu-horizontal px-1 font-semibold hidden bigp:flex'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/history'>History</Link>
            </li>
            <li>
              <Link href='/followed'>Follow</Link>
            </li>
          </ul>
        </div>
        <div className='hidden w-full bigp:flex'>
          <div className='mr-1 w-full flex flex-row gap-4'>
            <Searchmanga />
          </div>
        </div>
        <div className='navbar-end gap-2 hidden bigp:flex'></div>
      </div>
      <div className='bigp:hidden mx-3 mb-3'>
        <Searchmanga />
      </div>
    </div>
  );
}

export default Header;
