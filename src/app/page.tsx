import { Carousel } from '@/components/carousel';
import { MangaCard } from '@/components/manga-card';
import { useBackend } from '@/hooks/useBackend';

export default async function Home() {
  const { getFeed } = useBackend();

  const feed = await getFeed();

  return (
    <div>
      <Carousel spotlightInfo={feed} />

      <div className='flex justify-center'>
        <div className='bigp:m-10 mt-10 flex flex-col items-center justify-center'>
          <p className='text-xl mb-10 uppercase font-bold dark:text-violet-300 tracking-widest'>Recent Updates</p>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 px-3'>
            {feed.map((manga: any) => (
              <MangaCard manga={manga} key={manga.id} />
            ))}
          </div>

          {/* <div className='flex flex-wrap justify-center gap-3 bigp:gap-6 bigp:mx-24'>
            {feed.map((manga: any, index: number) => (
              <MangaCard manga={manga} key={manga.id} />
            ))}
          </div> */}
          {/* <p
            className={`text-xl mt-20 bigp:mt-30 mb-10 uppercase font-bold text-violet-300 tracking-widest`}
          >
            Popular Release
          </p>
          <div className='flex flex-wrap justify-center gap-3 bigp:mx-24 bigp:gap-6'>
            {feed.map((manga: any, index: number) => (
              <MangaCard
                id={manga.id}
                key={index}
                title={manga.title.romaji}
                src={manga.image}
                additional={manga.rating}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
