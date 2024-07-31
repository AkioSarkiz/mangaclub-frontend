import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SearchBar from '@/components/search-bar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Logo } from '@/partials/logo';

export default function Header() {
  const menuItems: { title: string; link: string }[] = [
    { title: 'Home', link: '/' },
    { title: 'History', link: '/history' },
    { title: 'Catalog', link: '/browse' },
    { title: 'Fallow', link: '/fallowed' },
  ];

  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b-2 dark:border-b-0 shadow-md dark:shadow-none'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden mr-2'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <Link href='/' className='flex items-center'>
            <Logo />
          </Link>
          <div className='grid gap-2 py-6'>
            {menuItems.map((menuItem) => (
              <SheetClose asChild key={menuItem.title}>
                <Link
                  href={menuItem.link}
                  className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                >
                  {menuItem.title}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link href='/' className='flex items-center'>
        <Logo />
      </Link>

      <div className='ml-8 flex justify-end lg:justify-between flex-1'>
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
        <div className='flex flex-1 md:flex-[.50] xl:flex-[.40]  gap-4'>
          <SearchBar />
          <ThemeSwitcher />
        </div>
      </div>
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
