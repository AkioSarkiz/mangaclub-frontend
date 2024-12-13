'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { behaviorOnClickAtom, imagesPerPageAtom, isSettingsSheetOpenedAtom } from '@/templates/manga-reader/atoms';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAtom } from 'jotai';

export default function SettingsSheet() {
  const [isSettingsSheetOpened, setIsSettingsSheetOpened] = useAtom(isSettingsSheetOpenedAtom);
  const [imagesPerPage, setImagesPerPage] = useAtom(imagesPerPageAtom);
  const [behaviorOnClick, setBehaviorOnClick] = useAtom(behaviorOnClickAtom);

  const imagesPerPageOptions = [1, 2, 3, 4, 5, 6];
  const behaviorOptions = ['next-frames', 'previous-frames', 'none'];

  return (
    <Sheet open={isSettingsSheetOpened} onOpenChange={(e: boolean) => setIsSettingsSheetOpened(e)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Reader settings</SheetTitle>
          <SheetDescription>Make changes to your reader settings here.</SheetDescription>
        </SheetHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 items-center gap-4'>
            <Label>Images per page</Label>
            <Select
              value={String(imagesPerPage)}
              onValueChange={(value) => {
                setImagesPerPage(Number(value));
              }}
            >
              <SelectTrigger className='md:w-[180px] w-auto'>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {imagesPerPageOptions.map((option) => (
                    <SelectItem value={String(option)} key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 items-center gap-4'>
            <Label>Behavior on image touch</Label>
            <Select
              value={behaviorOnClick}
              onValueChange={(value: 'next-frames' | 'previous-frames' | 'none') => {
                setBehaviorOnClick(value);
              }}
            >
              <SelectTrigger className='md:w-[180px] w-auto'>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {behaviorOptions.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter>
          <Button onClick={() => setIsSettingsSheetOpened(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
