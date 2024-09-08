import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignIn() {
  return (
    <Link href={'/sign-in'}>
      <Button>Sign in</Button>
    </Link>
  );
}
