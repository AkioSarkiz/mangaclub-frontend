import { ICompactManga, IManga, IMangaChapter } from '@/types';
import urlJoin from 'url-join';

interface GetFeedArgs {
  includeDescription?: boolean;
}

interface CatalogArgs {
  query?: string;
  page?: number;
}

export interface CatalogPageResponse {
  items: ICompactManga[];
  meta: {
    total: number;
    currentPage: number;
    maxPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export const useBackend = (token: string | undefined = undefined) => {
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const getFeed = async (args: GetFeedArgs = {}): Promise<ICompactManga[]> => {
    const url = urlJoin(
      String(process.env.NEXT_PUBLIC_BACKEND_URL),
      `/manga/feed?${args.includeDescription ? 'description=1' : ''}`,
    );

    const response = await fetch(url, {
      cache: 'no-store',
      headers,
    });

    return response.json();
  };

  const getManga = async (mangaId: string): Promise<IManga> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}`);

    const response = await fetch(url, {
      cache: 'no-store',
      headers,
    });

    const { manga } = await response.json();

    if (manga) {
      manga.chapters = manga.chapters.sort((a: IMangaChapter, b: IMangaChapter) => a.index + b.index);
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
      headers,
    });

    return response.json();
  };

  const getChapterDetails = async (mangaId: string, chapterId: string): Promise<any> => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), `/manga/${mangaId}/chapters/${chapterId}`);
    const response = await fetch(url, {
      cache: 'no-store',
      headers,
    });

    return response.json();
  };

  const getChart = async () => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/manga/chart');
    const response = await fetch(url, {
      cache: 'no-store',
      headers,
    });

    return await response.json();
  };

  const getCurrentUser = async () => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/users/current');
    const response = await fetch(url, {
      cache: 'no-store',
      headers,
    });

    if (response.status !== 200) {
      return null;
    }

    return response.json();
  };

  const createMangaFollowedList = async (mangaId: string) => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/manga-list');

    await fetch(url, {
      cache: 'no-store',
      body: JSON.stringify({ mangaId }),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  };

  const deleteMangaFollowedList = async (mangaId: string) => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/manga-list');

    await fetch(url, {
      cache: 'no-store',
      body: JSON.stringify({ mangaId }),
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  };

  const getMangaFollowedList = async () => {
    const url = urlJoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), '/manga-list/me');
    const response = await fetch(url, {
      cache: 'no-store',
      method: 'GET',
      headers,
      next: { revalidate: 0 },
    });

    try {
      const { items } = await response.json();

      return items;
    } catch {
      return null;
    }
  };

  return {
    getFeed,
    getManga,
    getCatalogPage,
    getChapterDetails,
    getChart,
    getCurrentUser,
    createMangaFollowedList,
    getMangaFollowedList,
    deleteMangaFollowedList,
  };
};
