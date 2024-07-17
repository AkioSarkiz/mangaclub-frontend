import { CompactManga, Manga } from '@/types';
import urlJoin from 'url-join';

export const useBackend = () => {
  const getFeed = async (): Promise<CompactManga[]> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/manga/feed');
    const response = await fetch(url);

    return response.json();
  };

  const getManga = async (mangaId: string): Promise<Manga> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}`);
    const response = await fetch(url);
    const { manga } = await response.json();

    return manga;
  };

  const search = async (query: string): Promise<{ items: CompactManga[] }> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/catalog?q=${query}`);
    const response = await fetch(url);

    return response.json();
  };

  const getChapterDetails = async (mangaId: string, chapterId: string): Promise<any> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}/chapters/${chapterId}`);
    const response = await fetch(url);

    return response.json();
  };

  return {
    getFeed,
    getManga,
    search,
    getChapterDetails,
  };
};
