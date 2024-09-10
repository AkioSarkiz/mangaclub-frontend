import React from 'react';
import { Metadata } from 'next';
import { MangaChaptersList } from '@/components/manga-chapter-list';
import { useBackend } from '@/hooks/useBackend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { ICompactManga } from '@/types';
import FollowButton from '@/components/follow-button';

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
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_APP_URL}/manga/${mangaId}`,
    },
  };
}

async function page({ params }: Props) {
  const mangaId = params['manga-id'];
  const cookiesStore = cookies();
  const token = cookiesStore.get('token')?.value;

  const { getManga, getMangaFollowedList } = useBackend(token);

  const [manga, mangaFollowedList] = await Promise.all([getManga(mangaId), getMangaFollowedList()]);

  const isFollowed = mangaFollowedList?.some((mangaFollowed: ICompactManga) => mangaFollowed.id === manga.id);

  if (!manga) {
    notFound();
  }

  return (
    <>
      <div className='container w-auto'>
        <div className='mx-2 md:mx-0'>
          <div className='flex flex-col md:flex-row items-center md:items-end gap-5 pt-12'>
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
                <div className='flex flex-wrap w-full md:pt-1 gap-4 justify-center md:justify-start'>
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
          <div className='flex mt-6  gap-1'>
            {manga.chapters.length && (
              <Link href={`/manga/${mangaId}/chapter/${manga.chapters[0].index}`}>
                <Button>Read first</Button>
              </Link>
            )}
            <FollowButton token={token} mangaId={manga.id} isFollowed={isFollowed} />
          </div>
          <div className='text-xl font-bold mt-8'>Description</div>
          <p className='text-base my-4'>{manga.description}</p>
          <MangaChaptersList chapters={manga.chapters} mangaId={mangaId} />
        </div>
      </div>
    </>
  );
}

export default page;
