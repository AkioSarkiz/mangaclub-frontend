'use client';
import React, { use, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Display({ frames }: any) {
  // useEffect(() => {
  //   setWatchedId({
  //     anislistId: anilist,
  //     title: info.title.romaji,
  //     sourceId: source,
  //     chapterId,
  //     image: info.coverImage,
  //   });
  // }, []);

  return (
    <>
      {frames.map((frame: any, index: number) => (
        <div key={frame.id}>
          <img src={frame.image} alt={`frame ${index}`} className='mx-auto' />
        </div>
      ))}
    </>
  );
}
