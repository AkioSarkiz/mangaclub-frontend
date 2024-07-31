import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function BrowsePage() {
  return (
    <div className='container'>
      <div className='grid grid-cols-6 col-span-2'>
        <div>Search</div>
        <div>Genres</div>
        <div>Sort</div>
        <div>Format</div>
      </div>
    </div>
  );
}
