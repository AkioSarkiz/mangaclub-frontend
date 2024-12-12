import FollowButton from '@/components/follow-button';
import { MangaChaptersList } from '@/components/manga-chapter-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IManga } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export interface DetailedMangaTemplateProps {
  manga: IManga;
  mangaSlug: string;
  token?: string;
}

export const DetailedMangaTemplate = (props: DetailedMangaTemplateProps) => {
  const { manga, token, mangaSlug } = props;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col md:flex-row items-center md:items-end gap-5 pt-12'>
        <div className='shrink-0 w-[180px] h-[250px] rounded overflow-hidden'>
          <Image width={300} height={300} alt='poster manga' className='w-full h-full object-cover' src={manga.cover} />
        </div>
        <div className='flex flex-col gap-4 items-center md:items-start justify-end w-full'>
          <div className='flex flex-col gap-1 text-center md:text-start w-full'>
            {manga.year && <h3 className='font-karla text-lg capitalize leading-none'>{manga.year}</h3>}
            <h1 className='font-outfit font-extrabold text-2xl md:text-4xl line-clamp-2 dark:text-white'>
              {manga.title}
            </h1>
            <div className='flex flex-wrap w-full md:pt-1 gap-4 justify-center md:justify-start'>
              {/* Show manga type */}
              {manga.type && <Badge className='capitalize'>{manga.type}</Badge>}
              {/* Show manga genres */}
              {manga?.genres?.map((genre: any) => (
                <Badge className='capitalize' key={genre.id}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex mt-6  gap-1'>
        {manga.chapters.length > 0 && (
          <Link href={`/manga/${mangaSlug}/chapter/${manga.chapters[manga.chapters.length - 1].index}`}>
            <Button>Read first</Button>
          </Link>
        )}
        <FollowButton token={token} mangaId={mangaSlug} />
      </div>
      <div className='text-xl font-bold mt-8'>Description</div>
      <p className='text-base my-4'>{manga.description}</p>
      <MangaChaptersList chapters={manga.chapters} mangaId={mangaSlug} />
    </div>
  );
};
