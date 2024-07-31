'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  initValue?: string;
};

export function SearchInput(props: Props) {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<string>(props.initValue || '');

  const onClick = () => {
    if (!inputValue) {
      return;
    }

    push(`/browse?q=${inputValue}`);
  };

  return (
    <div className='flex mx-auto mb-10 w-full max-w-2xl items-center space-x-2'>
      <Input
        type='search'
        placeholder='Search...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onClick();
          }
        }}
      />
      <Button onClick={onClick}>Search</Button>
    </div>
  );
}
