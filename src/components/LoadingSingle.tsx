import React from 'react';
import LoadingGIF from '@/assets/loading1.gif';
import Image from 'next/image';

function LoadingSingle() {
  return <Image src={LoadingGIF} alt='loading...' width={250} height={250} />;
}

export default LoadingSingle;
