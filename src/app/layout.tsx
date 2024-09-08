// CSS Imports
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Outfit } from 'next/font/google';
import { Metadata } from 'next';
import { Header } from '@/partials/header';
import { Footer } from '@/partials/footer';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { cookies } from 'next/headers';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_DEFAULT_TITLE = `Read manga where you want | ${APP_NAME}`;
const APP_DESCRIPTION = 'Read your favourite manga with ease and no ads';
const APP_URL = String(process.env.NEXT_PUBLIC_APP_URL);

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
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
      {/* suppressHydrationWarning because of next-themes */}
      <html data-theme='night' lang='en' className={outfit.className} suppressHydrationWarning>
        <body>
          <NextTopLoader color='red' showSpinner={false} />
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Header />
            <div className='min-h-[calc(100vh-280px)] flex flex-col'>{children}</div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
