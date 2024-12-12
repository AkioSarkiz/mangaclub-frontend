import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ICompactManga } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export interface CarouselProps {
  chart: ICompactManga[];
}

function MangaBanner({ manga }: { manga: ICompactManga }) {
  return (
    <Card className='rounded-md'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-1'>
        <div className='col-span-2 xl:col-span-1 mx-auto md:mx-0'>
          <Image
            width={300}
            height={300}
            alt='poster manga'
            className='object-cover rounded-l-md w-full lg:w-[300px] max-h-[300px]'
            src={manga.cover}
          />
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

export const MangaCarousel = (props: CarouselProps) => {
  const { chart } = props;

  return (
    <Carousel className='w-full'>
      <CarouselContent>
        {chart.map((manga) => (
          <CarouselItem key={manga.id}>
            <MangaBanner manga={manga} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden md:block' />
      <CarouselNext className='hidden md:block' />
    </Carousel>
  );
};
