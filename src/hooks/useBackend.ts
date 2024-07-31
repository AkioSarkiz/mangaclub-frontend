import { CompactManga, Manga } from '@/types';
import urlJoin from 'url-join';

interface GetFeedArgs {
  includeDescription?: boolean;
}

interface CatalogArgs {
  query?: string;
  page?: number;
}

export interface CatalogPageResponse {
  items: CompactManga[];
  meta: {
    total: number;
    currentPage: number;
    maxPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export const useBackend = () => {
  const getFeed = async (args: GetFeedArgs): Promise<CompactManga[]> => {
    const url = urlJoin(
      String(process.env.NEXT_PUBLIC_BACKEND_URL),
      `/manga/feed?${args.includeDescription ? 'description=1' : ''}`,
    );
    const response = await fetch(url);

    return response.json();
  };

  const getManga = async (mangaId: string): Promise<Manga> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}`);
    const response = await fetch(url);
    const { manga } = await response.json();

    return manga;
  };

  const getCatalogPage = async ({ query, page }: CatalogArgs): Promise<CatalogPageResponse> => {
    const searchParams = new URLSearchParams();

    if (query) {
      searchParams.append('q', query);
    }

    if (page) {
      searchParams.append('p', String(page));
    }

    const searchParamsString = searchParams.toString();

    const url = urlJoin(
      String(process.env.NEXT_PUBLIC_BACKEND_URL),
      `/manga${searchParamsString ? '?' + searchParamsString : ''}`,
    );

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
    getCatalogPage,
    getChapterDetails,
  };
};
