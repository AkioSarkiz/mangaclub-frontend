'use client';

import Box from '@/components/box';
import { Button } from '@/components/ui/button';
import { currentFrameAtom, imagesPerPageAtom } from '@/templates/manga-reader/atoms';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export interface FloatingNavProps extends React.HTMLAttributes<HTMLDivElement> {
  chapterIndex: string;
  nextChapterIndex?: number;
  frames: any[];
  mangaId: string;
}

export default function FloatingNav(rawProps: FloatingNavProps) {
  const { mangaId, nextChapterIndex, chapterIndex, frames, className, ...props } = rawProps;

  const router = useRouter();
  const [currentFrame, setCurrentFrame] = useAtom(currentFrameAtom);
  const [imagesPerPage] = useAtom(imagesPerPageAtom);

  const isPreviousFrameDisabled = useMemo(() => {
    return currentFrame === 0;
  }, [currentFrame]);

  const hasNextFrame = useMemo(() => {
    return currentFrame + imagesPerPage < frames.length;
  }, [currentFrame, frames]);

  const onClickNextFrame = () => {
    if (hasNextFrame) {
      setCurrentFrame(currentFrame + imagesPerPage);
    }
  };

  const onClickPreviousFrame = () => {
    setCurrentFrame(Math.max(currentFrame - imagesPerPage, 0));
  };

  const onClickNextChapter = () => {
    router.push(`/manga/${mangaId}/chapter/${nextChapterIndex}`);
  };

  return (
    <Box
      className={`${className} container mx-auto flex justify-between p-4 rounded-sm xl:bottom-4 bottom-0 sticky`}
      {...props}
    >
      {!hasNextFrame && (
        <div className='flex flex-col flex-1 w-full gap-4'>
          <div className='text-center text-lg font-bold'>Chapter {chapterIndex} is finished</div>
          <Button asChild>
            <Link href={`/manga/${mangaId}/chapter/${nextChapterIndex}`}>Next chapter</Link>
          </Button>
        </div>
      )}

      {hasNextFrame && (
        <>
          <Button disabled={isPreviousFrameDisabled} onClick={onClickPreviousFrame}>
            Prev frame
          </Button>
          <h5 className='hidden md:block text-xl'>Chapter {chapterIndex}</h5>
          <Button disabled={!hasNextFrame} onClick={onClickNextFrame}>
            Next frame
          </Button>
        </>
      )}
    </Box>
  );
}
