import React from 'react';
import { Metadata } from 'next';
import { MangaChaptersList } from '@/components/manga-chapter-list';
import { useBackend } from '@/hooks/useBackend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Head from 'next/head';

type Props = {
  params: { 'manga-id': string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mangaId = params['manga-id'];
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  const { getManga } = useBackend();

  const manga = await getManga(mangaId);

  return {
    title: `${manga?.title || 'Not found'} | ${APP_NAME}`,
    openGraph: {
      title: `Read manga free and simple at ${APP_NAME}`,
      ...(manga ? { images: [manga.cover] } : {}),
    },
  };
}

async function page({ params }: Props) {
  const appUrl = new URL(String(process.env.NEXT_PUBLIC_APP_URL));
  const mangaId = params['manga-id'];

  const { getManga } = useBackend();

  const manga = await getManga(mangaId);

  if (!manga) {
    notFound();
  }

  return (
    <>
      <Head>
        <link rel='canonical' href={`https://${appUrl.host}/manga/${mangaId}`} key='canonical' />
      </Head>

      <div className='container'>
        <div className='flex flex-col md:flex-row w-full items-center md:items-end gap-5 pt-12'>
          <div className='shrink-0 w-[180px] h-[250px] rounded overflow-hidden'>
            <Image
              width={300}
              height={300}
              alt='poster manga'
              className='w-full h-full object-cover'
              src={manga.cover}
            />
          </div>
          <div className='flex flex-col gap-4 items-center md:items-start justify-end w-full'>
            <div className='flex flex-col gap-1 text-center md:text-start w-full'>
              {manga.year && <h3 className='font-karla text-lg capitalize leading-none'>{manga.year}</h3>}
              <h1 className='font-outfit font-extrabold text-2xl md:text-4xl line-clamp-2 dark:text-white'>
                {manga.title}
              </h1>
              <h2 className='font-karla line-clamp-1 text-sm md:text-lg md:pb-2 font-light dark:text-white/70'></h2>
              <div className='flex-wrap w-full justify-start md:pt-1 gap-4 hidden md:flex'>
                {/* Show manga type */}
                {manga.type && <Badge className='capitalize'>{manga.type}</Badge>}
                {/* Show manga genres */}
                {manga?.genres?.map((genre: any) => (
                  <Badge className='capitalize' key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        {manga.chapters.length && (
          <div className='flex gap-2 mt-3'>
            <Link href={`/manga/${mangaId}/chapter/${manga.chapters[manga.chapters.length - 1].id}`}>
              <Button>Read first chapter</Button>
            </Link>
          </div>
        )}
        <div className='text-xl font-bold mt-8'>Description</div>
        <p className='text-base my-4'>{manga.description}</p>
        <MangaChaptersList chapters={manga.chapters} mangaId={mangaId} />
      </div>
    </>
  );
}

export default page;
