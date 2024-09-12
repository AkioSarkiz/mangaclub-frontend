'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useBackend } from '@/hooks/useBackend';
import { ICompactManga } from '@/types';
import { Loader2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FollowButton(props: { mangaId: string; token: string | undefined }) {
  const { toast } = useToast();
  const { createMangaFollowedList, deleteMangaFollowedList, getMangaFollowedList } = useBackend(props.token);

  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const mangaFollowedList = await getMangaFollowedList([props.mangaId]);

      setIsFollowed(mangaFollowedList?.some((mangaFollowed: ICompactManga) => mangaFollowed.id === props.mangaId));
      setIsFetching(false);
    };

    fetch().then(() => {});
  });

  const fallow = async () => {
    if (!props.token) {
      toast({ title: 'You need to be logged in to follow manga' });
      return;
    }

    setIsLoading(true);

    await createMangaFollowedList(props.mangaId);

    setIsFollowed(true);
    setIsLoading(false);
  };

  const flout = async () => {
    setIsLoading(true);

    await deleteMangaFollowedList(props.mangaId);

    setIsFollowed(false);
    setIsLoading(false);
  };

  if (isFollowed) {
    return (
      <Button variant={'secondary'} disabled={isLoading} onClick={flout}>
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
        Flout
      </Button>
    );
  }

  if (isFetching) {
    return <></>;
  }

  return (
    <Button className='bg-yellow-400 text-white hover:bg-yellow-500' disabled={isLoading} onClick={fallow}>
      {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
      Follow
      <Star className='ml-2 h-4 w-4' />
    </Button>
  );
}
