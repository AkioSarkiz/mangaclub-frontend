'use client';

import { behaviorOnClickAtom, currentFrameAtom, imagesPerPageAtom } from '@/templates/manga-reader/atoms';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export default function Display({ frames }: any) {
  const [imagesPerPage] = useAtom(imagesPerPageAtom);
  const [currentFrame, setCurrentFrame] = useAtom(currentFrameAtom);
  const [behaviorOnClick] = useAtom(behaviorOnClickAtom);

  const slicedFrames = useMemo(() => {
    // reset scroll on frame change
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    // preload images for next frames
    {
      const upcomingFrames = frames.slice(currentFrame + imagesPerPage, currentFrame + imagesPerPage * 2);

      if (upcomingFrames.length > 0 && typeof window !== 'undefined') {
        new Promise(() => {
          const upcomingFrameUrls = upcomingFrames.map((frame: any) => frame.image);
          upcomingFrameUrls.forEach((url: string) => {
            const img = new Image();
            img.src = url;
          });
        });
      }
    }

    return frames.slice(currentFrame, currentFrame + imagesPerPage);
  }, [frames, imagesPerPage, currentFrame]);

  const onClick = () => {
    switch (behaviorOnClick) {
      case 'next-frames':
        if (currentFrame + imagesPerPage < frames.length) {
          setCurrentFrame(currentFrame + imagesPerPage);
        }
        break;

      case 'previous-frames':
        setCurrentFrame(Math.max(currentFrame - imagesPerPage, 0));
        break;

      case 'none':
        break;
    }
  };

  return (
    <div onClick={onClick}>
      {slicedFrames.map((frame: any, index: number) => (
        <div key={frame.id}>
          <img src={frame.image} alt={`frame ${index}`} className='mx-auto' />
        </div>
      ))}
    </div>
  );
}
