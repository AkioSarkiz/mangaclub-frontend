'use client';

import { currentFrameAtom } from '@/templates/manga-reader/atoms';
import Display from '@/templates/manga-reader/components/display';
import FloatingNav from '@/templates/manga-reader/components/floating-nav';
import ScrollToTop from '@/templates/manga-reader/components/scroll-top';
import SettingsBar from '@/templates/manga-reader/components/settings-bar';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export interface MangaReaderTemplateProps {
  mangaId: string;
  chapterIndex: string;
  frames: any[];
  nextChapterId?: number;
  prevChapterId?: number;
}

export default function MangaReaderTemplate(props: MangaReaderTemplateProps) {
  const { chapterIndex, nextChapterId, frames, prevChapterId, mangaId } = props;

  const [, setCurrentFrame] = useAtom(currentFrameAtom);

  useEffect(() => {
    setCurrentFrame(0);
  }, []);

  return (
    // TODO: npx shadcn@latest add breadcrumb
    <>
      <ScrollToTop />

      <div className='container overflow-y-auto'>
        <SettingsBar className='mb-4' />

        <div>
          <Display frames={frames} />
        </div>
      </div>

      <FloatingNav chapterIndex={chapterIndex} frames={frames} nextChapterIndex={nextChapterId} mangaId={mangaId} />
    </>
  );
}
