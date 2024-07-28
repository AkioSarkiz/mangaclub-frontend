'use client';

import Link from 'next/link';
import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type CarouselProps = {
  spotlightInfo: any[];
};

function Carousel({ spotlightInfo }: CarouselProps) {
  return (
    <ReactCarousel
      autoPlay
      showThumbs={false}
      infiniteLoop
      dynamicHeight
      stopOnHover
      showIndicators={false}
      showStatus={false}
    >
      {spotlightInfo.map((manga: any, index: number) => (
        <CarouselSingle
          key={manga.id}
          id={manga.id}
          src={manga.cover}
          title={manga.title}
          description={manga.description}
        />
      ))}
    </ReactCarousel>
  );
}

type CarouselSingleProps = {
  id: string;
  src: string;
  title: string;
  description: string;
};

function CarouselSingle({ id, src, title, description }: CarouselSingleProps) {
  return (
    <div id={`slide${id}`} className='relative w-full h-[300px] bigp:h-[450px]'>
      <img src={src} className='w-full h-full object-cover opacity-30' />
      <div className='absolute flex flex-col text-start items-start space-y-5 bigp:left-20 left-7 top-4 bigp:top-1/5 w-3/4 bigp:w-2/3 h-4/5 overflow-hidden'>
        <div className='flex flex-row gap-3'>
          <div className='text-xl bigp:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500'>
            {title}
          </div>
        </div>
        <div
          className='font-bold text-base bigp:text-md leading-relaxed line-clamp-6'
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <Link href={`/info/${encodeURIComponent(id)}`} className='btn btn-sm btn-outline bigp:btn-md'>
          Read Now
        </Link>
      </div>
    </div>
  );
}

export { Carousel };
