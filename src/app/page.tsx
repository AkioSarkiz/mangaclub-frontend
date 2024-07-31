import { MangaCard, MangaGrid } from '@/components/manga-card';
import { Carousel } from '../components/carousel';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useBackend } from '../hooks/useBackend';
import Link from 'next/link';
import { Metadata } from 'next';

function PrettyHeader(props: React.PropsWithChildren) {
  return <div className='text-3xl mb-10 font-extrabold dark:text-violet-300 tracking-widest'>{props.children}</div>;
}

export const metadata: Metadata = {
  title: 'Home page | ' + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function Home() {
  const { getFeed } = useBackend();

  const feed = await getFeed({ includeDescription: true });

  return (
    <div>
      <div className='mt-10'>
        <div className='text-center'>
          <PrettyHeader>Popular manga</PrettyHeader>
        </div>
        <Carousel manga={feed} />
      </div>

      <div className='flex justify-center'>
        <div className='bigp:m-10 mt-10 flex flex-col items-center justify-center'>
          <PrettyHeader>Recent Updates</PrettyHeader>

          <MangaGrid>
            {feed.map((manga: any) => (
              <MangaCard manga={manga} key={manga.id} />
            ))}
          </MangaGrid>
        </div>
      </div>

      <div className='container'>
        <Card className='mb-10'>
          <div className='text-center my-8'>
            <div className='text-lg font-bold my-4'>
              Can't find the manga you're looking for? Our catalog contains thousands of titles.
            </div>
            <Link href='/browse'>
              <Button>Explore Our Catalog</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
