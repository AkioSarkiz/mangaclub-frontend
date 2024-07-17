import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import React from 'react';
import { nightTokyo } from '@/utils/fonts';

export const Footer = () => {
  const DISCORD_INVITE_LINK = String(process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK);

  return (
    <footer className='w-full bg-base-300 shadow-xl p-5 flex flex-col items-center space-y-5'>
      <Link
        href='/'
        className={`${nightTokyo.className} pt-2 btn btn-ghost font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500 tracking-widest`}
      >
        ML
      </Link>
      <div className='flex space-x-5'>
        <Link href='/terms-of-service' className='text-gray-300' shallow>
          Terms of Service
        </Link>
        <Link href='/dmca' className='text-gray-300' shallow>
          DMCA
        </Link>
        <a href={DISCORD_INVITE_LINK} target='_blank'>
          <FaDiscord className='text-3xl text-gray-300' />
        </a>
      </div>
      <p className='text-sm text-gray-300'>
        Mangaclub does not store any files on our server, we only linked to the media which is hosted on 3rd party
        services.
      </p>
      <p className='text-sm text-gray-300'>Copyright &copy; Mangaclub</p>
    </footer>
  );
};
