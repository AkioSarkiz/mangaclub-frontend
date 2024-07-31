'use client';

import { CompactManga } from '@/types';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface CarouselProps {
  manga: CompactManga[];
}

function MangaBanner({ manga }: { manga: CompactManga }) {
  return (
    <Card className='rounded-md'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-1'>
        <div className='col-span-2 xl:col-span-1 mx-auto md:mx-0'>
          <Image width={300} height={300} alt='poster manga' className='object-cover rounded-l-md' src={manga.cover} />
        </div>
        <div className='col-span-2 xl:col-span-3'>
          <CardContent className='h-full'>
            <div className='flex flex-col justify-between h-full'>
              <div>
                <h4 className='text-xl font-bold text-primary my-5'>{manga.title}</h4>
                <p className='line-clamp-5'>{manga.description}</p>
              </div>
              <div className='mt-4 xl:mt-0'>
                <Link href={`/manga/${manga.slug}`}>
                  <Button>Read now</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

function NextCarousel(props: CarouselProps) {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 10_000,
    autoplay: true,
  };

  return (
    <div className='slider-container container'>
      <Slider {...settings}>
        {props.manga.map((manga) => (
          <div key={manga.id}>
            <MangaBanner manga={manga} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export { NextCarousel };
