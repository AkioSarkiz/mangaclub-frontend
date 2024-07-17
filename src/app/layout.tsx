import './globals.css';
import { Outfit } from 'next/font/google';
import { Metadata } from 'next';
import Header from '@/partials/Header';
import { Footer } from '@/partials/Footer';

export const fetchCache = 'force-no-store';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_DEFAULT_TITLE = `Read manga where you want | ${APP_NAME}`;
const APP_DESCRIPTION = 'Read your favourite manga with ease and no ads';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  icons: 'favicon.ico',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};

const outfit = Outfit({ weight: '400', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html data-theme='night' lang='en' className={outfit.className}>
        <body>
          <Header />
          <div className='min-h-screen block'>{children}</div>
          <Footer />
        </body>
      </html>
    </>
  );
}