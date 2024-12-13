import Script from 'next/script';

export default function UmamiTracker() {
  const appEnv = String(process.env.NEXT_PUBLIC_APP_ENV);
  const umamiUrl = String(process.env.NEXT_PUBLIC_UMAMI_URL);
  const umamiWebsiteId = String(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID);

  if (appEnv === 'local') {
    return <></>;
  }

  return <Script defer src={umamiUrl} data-website-id={umamiWebsiteId} />;
}
