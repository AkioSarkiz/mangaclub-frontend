import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import urlJoin from 'url-join';

export default function SignInPage() {
  const backendUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL);
  const loginLink = urlJoin(backendUrl, '/auth/google/login');

  return (
    <div className='container flex flex-grow items-center '>
      <Card className='lg:max-w-[600px] lg:min-w-[400px] mx-auto'>
        <CardHeader>
          <h1 className='text-3xl font-extrabold text-center'>Sign in</h1>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600 my-3 text-base'>Sign in to your account</p>

          <Link href={loginLink}>
            <Button>
              <FaGoogle className='mr-4' />
              <span>Sign in with Google</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
