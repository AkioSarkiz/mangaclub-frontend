import { useBackend } from '../hooks/useBackend';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { HomepageTemplate } from '@/pages/homepage-template';

export async function generateMetadata(): Promise<Metadata> {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  return {
    title: 'Home page | ' + APP_NAME,
  };
}

export default async function Home() {
  const cookiesStorage = cookies();

  const { getFeed, getChart } = useBackend(cookiesStorage.get('token')?.value);

  const [chart, feed] = await Promise.all([getChart(), getFeed()]);

  return <HomepageTemplate feed={feed} chart={chart} />;
}
