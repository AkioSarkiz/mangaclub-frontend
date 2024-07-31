'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CatalogPageResponse } from '@/hooks/useBackend';
import { useEffect, useState } from 'react';

interface Props {
  catalogPage: CatalogPageResponse;
}

export function CatalogPagination({ catalogPage }: Props) {
  const [links, setLinks] = useState<{
    currentPage: string | undefined;
    nextPage: string | undefined;
    prevPage: string | undefined;
    maxPage: string | undefined;
  }>({
    currentPage: undefined,
    nextPage: undefined,
    prevPage: undefined,
    maxPage: undefined,
  });

  useEffect(() => {
    const getUrl = (page: number) => {
      if (!window) {
        return '';
      }

      const url = new URL(window.location.href);
      url.searchParams.set('p', page.toString());

      return url.toString();
    };

    setLinks((prevState) => ({
      ...prevState,
      currentPage: getUrl(catalogPage.meta.currentPage),
      maxPage: getUrl(catalogPage.meta.maxPage),
    }));

    if (catalogPage.meta.nextPage) {
      setLinks((prevState) => ({
        ...prevState,
        // @ts-ignore
        nextPage: getUrl(catalogPage.meta.nextPage),
      }));
    }

    if (catalogPage.meta.prevPage) {
      setLinks((prevState) => ({
        ...prevState,
        // @ts-ignore
        prevPage: getUrl(catalogPage.meta.prevPage),
      }));
    }
  }, [catalogPage.meta]);

  return (
    <Pagination>
      <PaginationContent>
        {catalogPage.meta.prevPage && (
          <PaginationItem>
            <PaginationPrevious
              //@ts-ignore
              href={links.prevPage}
            />
          </PaginationItem>
        )}
        {catalogPage.meta.prevPage && (
          <PaginationItem>
            <PaginationLink
              //@ts-ignore
              href={links.prevPage}
            >
              {catalogPage.meta.prevPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            //@ts-ignore
            href={links.currentPage}
            isActive
          >
            {catalogPage.meta.currentPage}
          </PaginationLink>
        </PaginationItem>
        {catalogPage.meta.nextPage && catalogPage.meta.maxPage !== catalogPage.meta.currentPage && (
          <PaginationItem>
            <PaginationLink
              //@ts-ignore
              href={links.nextPage}
            >
              {catalogPage.meta.nextPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {catalogPage.meta.maxPage !== catalogPage.meta.currentPage &&
          catalogPage.meta.maxPage !== catalogPage.meta.nextPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        {catalogPage.meta.maxPage !== catalogPage.meta.currentPage &&
          catalogPage.meta.maxPage !== catalogPage.meta.nextPage && (
            <PaginationItem>
              <PaginationLink
                //@ts-ignore
                href={links.maxPage}
              >
                {catalogPage.meta.maxPage}
              </PaginationLink>
            </PaginationItem>
          )}
        {catalogPage.meta.nextPage && (
          <PaginationItem>
            <PaginationNext
              //@ts-ignore
              href={links.nextPage}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
