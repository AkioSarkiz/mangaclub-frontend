import { atom } from 'jotai';

export const isSettingsSheetOpenedAtom = atom<boolean>(false);
export const imagesPerPageAtom = atom<number>(3);
export const currentFrameAtom = atom<number>(0);
export const behaviorOnClickAtom = atom<'next-frames' | 'previous-frames' | 'none'>('next-frames');
