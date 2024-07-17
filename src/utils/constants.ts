export let DOMAIN_URL = `${
  process.env.NODE_ENV === 'production' ? 'https' : 'http'
}://${process.env.VERCEL_URL}`;

export let BASE_URI = DOMAIN_URL + '/api';
export let CONSUMET_URI = 'https://api.consumet.org/meta/anilist';
export let CONSUMET_MANGA_URI = 'https://api.consumet.org/meta/anilist-manga';
export let CONSUMET_CHAPTER_URI =
  'https://api.consumet.org/meta/anilist-manga/read';
