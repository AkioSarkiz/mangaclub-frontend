import { cookies } from 'next/headers';
import FallowPageComponent from '@/app/followed/component';
import { useBackend } from '@/hooks/useBackend';

export default async function FallowPage() {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token')?.value;

  const { getCurrentUser } = useBackend(token);

  const currentUser = await getCurrentUser();

  return <FallowPageComponent token={token} currentUser={currentUser} />;
}
