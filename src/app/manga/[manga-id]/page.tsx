import React from 'react';
import useManga from '@/hooks/useManga';
import { Metadata } from 'next';
import ProviderList from '@/components/ProviderList';
import { useBackend } from '@/hooks/useBackend';
import useLocalStorage from '@/hooks/useLocalStorage';

type Props = {
  params: { 'manga-id': string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mangaId = params['manga-id'];
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  const { getManga } = useBackend();
  const { setWatchedId } = useLocalStorage();

  const manga = await getManga(mangaId);

  return {
    title: `${manga.title} | ${APP_NAME}`,
    openGraph: {
      title: `Read manga free and simple at ${APP_NAME}`,
      images: [manga.cover],
    },
  };
}

async function page({ params }: Props) {
  const mangaId = params['manga-id'];

  const { getManga } = useBackend();

  const manga = await getManga(mangaId);

  return (
    <section className='block h-full bigp:w-3/4 mx-auto pt-4 flex-col items-center overflow-x-hidden md:flex-row md:items-start'>
      <div className='flex flex-col bigp:flex-row bigp:space-x-8'>
        <div className='flex justify-center'>
          <img src={manga.cover} className='rounded object-cover bigp:ml-8 h-auto max-w-xs' />
        </div>

        <div className='flex flex-col space-y-4 px-3 md:px-0 ml-0'>
          <p className='text-2xl font-semibold mt-4'>{manga.title}</p>
          <p className=''>{manga.title}</p>
          <div className='flex flex-wrap gap-4'>
            {manga?.genres?.map((genre: any) => (
              <span key={genre.id} className='rounded-sm bg-zinc-500 mb-auto text-base p-[0_0.375rem]'>
                {genre.name}
              </span>
            ))}
          </div>
          <p>{manga.description}</p>
          <div className='gap-x-16 flex bigp:flex-row flex-wrap'>
            {manga.rating && (
              <div>
                <p>Rate</p>
                <p>{manga.rating}</p>
              </div>
            )}
            {manga.year && (
              <div>
                <p>Release Date</p>
                <p>{manga.year}</p>
              </div>
            )}
            {manga.status && (
              <div>
                <p>Status</p>
                <p className='capitalize'>{manga.status}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full px-3 md:px-0'>
        <ProviderList chapters={manga.chapters} mangaId={mangaId} />
      </div>
    </section>
  );
}

export default page;
