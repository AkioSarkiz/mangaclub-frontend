'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Link from 'next/link';

export default function ProviderList({ chapters, mangaId }: any) {
  const [selectOption, setSelecOption] = useState<string>('comick');

  const router = useRouter();

  let index = 0;
  let convertObj: any = [];

  console.log({ chapters });
  chapters.sort((a: any, b: any) => a.index - b.index);

  // while (chapters.data[index] !== undefined) {
  //   let chap: any = [];
  //   let index0 = 0;
  //   while (chapters.data[index].chapters[index0] !== undefined) {
  //     chap.push({
  //       url: chapters.data[index].chapters[index0].id,
  //       num: chapters.data[index].chapters[index0].number,
  //     });
  //     index0++;
  //   }
  //   convertObj.push({
  //     provider: chapters.data[index].providerId,
  //     chap,
  //   });
  //   index++;
  // }

  return (
    <>
      <div className='mt-8 flex items-center gap-4 w-full bigp:w-1/2 mb-5 bigp:mb-0'>
        <div className='bigp:ml-8 text-xl font-bold w-[50%]'>List chapter </div>
        <p className='text-base font-semibold'>Source</p>
        <div className='w-[200px]'>
          <Select
            onChange={(e: any) => {
              setSelecOption(e.value);
              //@ts-ignore
              sourceIndex = convertObj.findIndex((key: any) => key.provider === selectOption);
            }}
            placeholder='comick'
            options={convertObj.map((sup: any) => ({
              label: sup.provider,
              value: sup.provider,
            }))}
            defaultValue={'comick'}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#ef4444',
                primary75: '#f87171',
                primary50: '#fca5a5',
                primary20: '#fecaca',
              },
            })}
            hideSelectedOptions={false}
            styles={{
              control: (provided) => {
                return {
                  ...provided,
                  backgroundColor: '#1a1a1a',
                  minWidth: '12rem',
                  maxWidth: '14rem',
                };
              },
              menu: (provided) => {
                return {
                  ...provided,
                  backgroundColor: '#1a1a1a',
                  color: 'gray',
                  ':hover': {
                    backgroundColor: 'transparent',
                    color: 'white',
                  },
                  transition: 'all 300ms',
                };
              },
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              singleValue: (provided) => {
                return { ...provided, color: '#fff' };
              },
              multiValue: (provided) => {
                return {
                  ...provided,
                  backgroundColor: '#262626',
                  maxWidth: '70%',
                };
              },
              multiValueLabel: (provided) => {
                return { ...provided, color: 'white' };
              },
              multiValueRemove: (provided) => {
                return {
                  ...provided,
                  color: 'gray',
                  ':hover': {
                    backgroundColor: 'transparent',
                    color: 'white',
                  },
                  transition: 'all 300ms',
                };
              },

              input: (provided) => {
                return { ...provided, color: 'white' };
              },
            }}
          />
        </div>
      </div>
      <div className='flex flex-col space-y-4 bigp:ml-8 mt-2 w-[50%] mb-8'>
        {chapters.map((chapter: any) => (
          <Link href={`/manga/${mangaId}/chapter/${chapter.id}`} key={chapter.id}>
            <span className='flex flex-row hover:bg-white/20 text-gray-200 transition duration-300 rounded p-[0_0.375rem]'>
              <p className='w-[80%] cursor-pointer'>{chapter.title}</p>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
