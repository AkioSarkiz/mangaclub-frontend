import React from 'react';
import { Metadata } from 'next';
import Display from './partials/display';
import { useBackend } from '@/hooks/useBackend';
import { notFound } from 'next/navigation';
import { Sheet } from '@/components/ui/sheet';
import ChapterPageButtons from '@/app/manga/[manga-id]/chapter/[chapter-id]/partials/next-chapter-page-button';
import { IMangaChapter } from '@/types';
import ScrollToTop from '@/app/manga/[manga-id]/chapter/[chapter-id]/partials/scroll-top';

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

  const manga = await getManga(mangaId);
  const { frames } = await getChapterDetails(mangaId, chapterId);

  if (!frames) {
    notFound();
  }

  const nextChapterId = manga.chapters.find((chapter: IMangaChapter) => chapter.index === Number(chapterId) + 1)?.index;
  const prevChapterId = manga.chapters.find((chapter: IMangaChapter) => chapter.index === Number(chapterId) - 1)?.index;

  return (
    // TODO: npx shadcn@latest add breadcrumb
    <div className='container overflow-y-auto'>
      <ScrollToTop />

      <Sheet>Chapter {chapterId}</Sheet>
      <div>
        <Display frames={frames} />
        <ChapterPageButtons mangaId={mangaId} nextChapterIndex={nextChapterId} prevChapterIndex={prevChapterId} />
      </div>
    </div>
  );
}
export default Page;
