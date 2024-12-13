import React from 'react';
import { Metadata } from 'next';
import { useBackend } from '@/hooks/useBackend';
import { notFound } from 'next/navigation';
import { IMangaChapter } from '@/types';
import MangaReaderTemplate from '@/templates/manga-reader/manga-reader-template';

type Props = {
  params: {
    'manga-id': string;
    'chapter-id': string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  return {
    title: APP_NAME,
    openGraph: {
      title: `Read manga free and simple at ${APP_NAME}`,
    },
  };
}

async function Page({ params }: Props) {
  const mangaId = params['manga-id'];
  const chapterId = params['chapter-id'];

  const { getChapterDetails, getManga } = useBackend();

  const [manga, chapter] = await Promise.all([getManga(mangaId), getChapterDetails(mangaId, chapterId)]);

  if (!chapter?.frames || !manga) {
    notFound();
  }

  const nextChapterId = manga.chapters.find((v: IMangaChapter) => Number(v.index) === Number(chapter.index) + 1)?.index;
  const prevChapterId = manga.chapters.find((v: IMangaChapter) => Number(v.index) === Number(chapter.index) - 1)?.index;

  return (
    <MangaReaderTemplate
      mangaId={mangaId}
      chapterIndex={chapter.index}
      frames={chapter.frames}
      nextChapterId={nextChapterId}
      prevChapterId={prevChapterId}
    />
  );
}
export default Page;
