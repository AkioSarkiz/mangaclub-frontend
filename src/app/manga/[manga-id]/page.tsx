import React from 'react';
import useManga from '@/hooks/useManga';
import { Metadata } from 'next';
import { MangaChaptersList } from '@/components/ProviderList';
import { useBackend } from '@/hooks/useBackend';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';

type Props = {
  params: { 'manga-id': string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mangaId = params['manga-id'];
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  const { getManga } = useBackend();

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
    <>
      <div className='container'>
        <div className='flex flex-col md:flex-row w-full items-center md:items-end gap-5 pt-12'>
          <div className='shrink-0 w-[180px] h-[250px] rounded overflow-hidden'>
            <img
              alt='poster anime'
              loading='lazy'
              width='300'
              height='300'
              decoding='async'
              data-nimg='1'
              className='w-full h-full object-cover'
              style={{ color: 'transparent' }}
              src={manga.cover}
            />
          </div>
          <div className='flex flex-col gap-4 items-center md:items-start justify-end w-full'>
            <div className='flex flex-col gap-1 text-center md:text-start w-full'>
              {manga.year && <h3 className='font-karla text-lg capitalize leading-none'>{manga.year}</h3>}
              <h1 className='font-outfit font-extrabold text-2xl md:text-4xl line-clamp-2 text-white'>{manga.title}</h1>
              <h2 className='font-karla line-clamp-1 text-sm md:text-lg md:pb-2 font-light text-white/70'></h2>
              <div className='flex-wrap w-full justify-start md:pt-1 gap-4 hidden md:flex'>
                {/* Show manga type */}
                {manga.type && (
                  <div
                    className='dynamic-text rounded px-2 font-karla font-bold capitalize'
                    style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)' }}
                  >
                    {manga.type}
                  </div>
                )}
                {manga?.genres?.map((genre: any) => (
                  <div
                    key={genre.id}
                    className='dynamic-text rounded px-2 font-karla font-bold'
                    style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0);' }}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-3'>
          <Button>Read first chapter</Button>
        </div>

        <div className='text-xl font-bold mt-8'>Description</div>
        <p className='text-base my-4'>{manga.description}</p>

        <MangaChaptersList chapters={manga.chapters} mangaId={mangaId} />
      </div>
    </>
  );
}

export default page;
