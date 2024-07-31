import React from 'react';
import { Metadata } from 'next';
import SideBar from './partials/side-bar';
import Display from './partials/display';
import { useBackend } from '@/hooks/useBackend';

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

  return (
    <div className='flex w-full overflow-auto'>
      <SideBar />
      <div className='relative z-30 h-full w-full'>
        <Display frames={frames} />
      </div>
    </div>
  );
}
export default Page;
