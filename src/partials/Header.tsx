import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { nightTokyo } from '@/utils/fonts';
import Search from '@/partials/Search';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header() {
  const menuItems: { title: string; link: string }[] = [
    { title: 'Home', link: '/' },
    { title: 'History', link: '/history' },
    { title: 'Fallow', link: '/fallowed' },
  ];

  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <Link
            href='/'
            className={`${nightTokyo.className} pt-2 btn btn-ghost font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 tracking-widest`}
          >
            ML
          </Link>
          <div className='grid gap-2 py-6'>
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.title}
                href={menuItem.link}
                className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
              >
                {menuItem.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link
        href='/'
        className={`${nightTokyo.className} pt-2 btn btn-ghost font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 tracking-widest`}
      >
        ML
      </Link>

      <div className='ml-8 flex justify-between flex-1'>
        <nav className='hidden lg:flex gap-6'>
          {menuItems.map((menuItem) => (
            <Link
              key={menuItem.title}
              href={menuItem.link}
              className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
            >
              {menuItem.title}
            </Link>
          ))}
        </nav>
        <div className='flex gap-4'>
          <Search />
          <ThemeToggle />
        </div>
      </div>

      {/* 
      <div className='ml-auto'>
        <Search />
      </div> */}
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}
