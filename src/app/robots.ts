import { MetadataRoute } from 'next';
import urlJoin from 'url-join';

export default function robots(): MetadataRoute.Robots {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL is not defined');
  }

  const sitemapUrl = urlJoin(process.env.NEXT_PUBLIC_APP_URL, '/sitemap-index.xml');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrl,
  };
}
