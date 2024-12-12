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
import { DetailedMangaTemplate } from '@/pages/manga/detailed-manga-template';

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

  const { getManga } = useBackend(token);

  const [manga] = await Promise.all([getManga(mangaId)]);

  if (!manga) {
    notFound();
  }

  return <DetailedMangaTemplate manga={manga} token={token} mangaSlug={mangaId} />;
}

export default page;
