import { CompactManga, Manga } from '@/types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
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

export const useBackend = (cookies: ReadonlyRequestCookies | undefined = undefined) => {
  const getFeed = async (args: GetFeedArgs): Promise<CompactManga[]> => {
    const url = urlJoin(
      String(process.env.NEXT_PUBLIC_BACKEND_URL),
      `/manga/feed?${args.includeDescription ? 'description=1' : ''}`,
    );

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...(cookies?.has('token') ? { Authorization: cookies.get('token')!.value } : {}),
      },
    });

    return response.json();
  };

  const getManga = async (mangaId: string): Promise<Manga> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}`);
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...(cookies?.has('token') ? { Authorization: cookies.get('token')!.value } : {}),
      },
    });
    const { manga } = await response.json();

    // Sometimes user can find some 404 pages, so we should care about this case too
    if (manga) {
      // sort chapters
      manga.chapters = manga.chapters.sort((a: any, b: any) => a.index - b.index);
    }

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

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...(cookies?.has('token') ? { Authorization: String(cookies.get('token')) } : {}),
      },
    });

    return response.json();
  };

  const getChapterDetails = async (mangaId: string, chapterId: string): Promise<any> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}/chapters/${chapterId}`);
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...(cookies?.has('token') ? { Authorization: cookies.get('token')!.value } : {}),
      },
    });

    return response.json();
  };

  const getChart = async () => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/manga/chart');
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...(cookies?.has('token') ? { Authorization: cookies.get('token')!.value } : {}),
      },
    });

    return await response.json();
  };

  const getCurrentUser = async () => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/users/current');
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...(cookies?.has('token') ? { Authorization: cookies.get('token')!.value } : {}),
      },
    });

    if (response.status !== 200) {
      return null;
    }

    return response.json();
  };

  return {
    getFeed,
    getManga,
    getCatalogPage,
    getChapterDetails,
    getChart,
    getCurrentUser,
  };
};
