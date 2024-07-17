'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CompactManga } from '@/@types';
export default function List() {
  const { getWatched, delWatched } = useLocalStorage();
  const [mangas, setmangas] = useState<any | null>(null);

  useEffect(() => {
    setmangas(getWatched());
  }, []);

  return mangas !== null && Object.keys(mangas).length > 0 ? (
    <>
      {mangas.map((manga: CompactManga) => (
        <Card manga={manga} />
      ))}
    </>
  ) : (
    <></>
  );
}
