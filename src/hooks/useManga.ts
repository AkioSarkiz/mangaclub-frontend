import { CONSUMET_URI } from '@/utils/constants';
import axios from 'axios';
export default function useManga() {
  const anifyKey = process.env.NEXT_PUBLIC_ANIFY_KEY;
  let API = {
    popular: CONSUMET_URI + '/advanced-search',
    trending: CONSUMET_URI + '/advanced-search?sort=[%22TRENDING_DESC%22]',
    info: 'https://api.anify.tv/info/',
    chapter: 'https://api.anify.tv/chapters/',
    read: 'https://api.anify.tv/pages',
  };
  async function getPopular() {
    const data = await axios.get(API.popular, {
      params: {
        type: 'MANGA',
        perPage: 35,
      },
    });
    return data;
  }
  async function getTrending() {
    const data = await axios.get(API.trending, {
      params: {
        type: 'MANGA',
        perPage: 22,
      },
    });
    return data;
  }
  async function getInfo(id: any) {
    const data = await axios.get(API.info + id + '?apikey=' + anifyKey);
    return data;
  }
  async function getChapters(id: any) {
    const data = await axios.get(API.chapter + id + '?apikey=' + anifyKey);
    return data;
  }
  async function getSearch(query: string) {
    const data = await axios.get(API.popular, {
      params: {
        type: 'MANGA',
        query: query,
        perPage: 42,
      },
    });
    return data;
  }
  async function getChapterManga(
    anilistId: string,
    id: string,
    source: string,
  ) {
    const data = await axios.post(API.read + '?apikey=' + anifyKey, {
      id: anilistId,
      providerId: source,
      readId: id,
    });
    return data;
  }

  return {
    getTrending,
    getPopular,
    getInfo,
    getChapters,
    getSearch,
    getChapterManga,
  };
}
