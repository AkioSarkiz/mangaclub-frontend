import React from 'react';
import LoadingGIF from '@/assets/loading.gif';

function Loading() {
  return (
    <div className='fixed w-screen h-screen top-0 bg-base-300 opacity-70'>
      <img
        src={LoadingGIF.src}
        alt='loading...'
        width={200}
        height={200}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  );
}

export default Loading;
