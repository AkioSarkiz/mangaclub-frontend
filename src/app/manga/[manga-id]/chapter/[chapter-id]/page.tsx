import React from 'react';
import { Metadata } from 'next';
import SideBar from './partials/side-bar';
import Display from './partials/display';
import { useBackend } from '@/hooks/useBackend';
import { notFound } from 'next/navigation';
import { Sheet } from '@/components/ui/sheet';

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

  const { getChapterDetails } = useBackend();

  const { frames } = await getChapterDetails(mangaId, chapterId);

  if (!frames) {
    notFound();
  }

  return (
    // TODO: npx shadcn@latest add breadcrumb
    <div className='container overflow-y-auto'>
      <Sheet>Chapter {chapterId}</Sheet>
      <div>
        <Display frames={frames} />
      </div>
    </div>
  );
}
export default Page;
