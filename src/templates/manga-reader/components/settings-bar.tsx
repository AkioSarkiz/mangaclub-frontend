'use client';

import Box, { BoxProps } from '@/components/box';
import { Button } from '@/components/ui/button';
import { isSettingsSheetOpenedAtom } from '@/templates/manga-reader/atoms';
import SettingsSheet from '@/templates/manga-reader/components/settings-sheet';
import { useAtom } from 'jotai';
import { Settings } from 'lucide-react';

export default function SettingsBar(props: BoxProps) {
  const [_, setIsSettingsSheetOpened] = useAtom(isSettingsSheetOpenedAtom);

  return (
    <Box noShadow transparent {...props}>
      <Button className='gap-2' onClick={() => setIsSettingsSheetOpened(true)}>
        <span className='font-bold'>Settings</span>
        <Settings />
      </Button>

      <SettingsSheet />
    </Box>
  );
}
