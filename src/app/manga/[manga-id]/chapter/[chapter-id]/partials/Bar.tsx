'use client';
import React from 'react';
import { FaBackward, FaForward } from 'react-icons/fa';
const Bar = ({ list, id, anilistId }: any) => {
  const curIndex = list.findIndex((e: any) => e.id === id);
  const onPrev = () => {
    window.location.href = `
    /read/mangareader/${anilistId}?index=${encodeURIComponent(list[curIndex + 1].id)}`;
  };
  const onNext = () => {
    window.location.href = `
    /read/mangareader/${anilistId}?index=${encodeURIComponent(list[curIndex - 1].id)}`;
  };
  return (
    <>
      <FaBackward size={25} className='hover:text-primary cursor-pointer' onClick={onPrev} />
      <FaForward size={25} className='hover:text-primary cursor-pointer' onClick={onNext} />
    </>
  );
};
export default Bar;
