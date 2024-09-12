import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type ChapterPageButtonsProps = {
  mangaId: string;
  nextChapterIndex?: number;
  prevChapterIndex?: number;
};

export default function ChapterPageButtons(props: ChapterPageButtonsProps) {
  const getChapterLink = (mangaId: string, chapterIndex: number) => {
    return `/manga/${mangaId}/chapter/${chapterIndex}`;
  };

  return (
    <div className='flex gap-2 justify-center my-4'>
      {props.prevChapterIndex && (
        <Link href={getChapterLink(props.mangaId, props.prevChapterIndex)} scroll={false}>
          <Button>Previous chapter</Button>
        </Link>
      )}
      {props.nextChapterIndex && (
        <Link href={getChapterLink(props.mangaId, props.nextChapterIndex)} scroll={false}>
          <Button>Next chapter</Button>
        </Link>
      )}
    </div>
  );
}
