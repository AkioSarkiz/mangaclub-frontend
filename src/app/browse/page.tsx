import { CatalogPagination } from '@/app/browse/partials/pagination';
import { SearchInput } from '@/app/browse/partials/search';
import { MangaCard, MangaGrid } from '@/components/manga-card';
import { useBackend } from '@/hooks/useBackend';
import { CompactManga } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Catalog | ' + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function BrowsePage(props: any) {
  const { getCatalogPage } = useBackend();
  const query = props.searchParams['q'] || undefined;
  const page = Number(props.searchParams['p'] || 1);
  const catalogPage = await getCatalogPage({ query, page });

  if (!catalogPage) {
    notFound();
  }

  return (
    <div className='container space-y-10 my-10'>
      <SearchInput initValue={query} />

      <div>
        <MangaGrid>
          {catalogPage.items.map((manga: CompactManga) => (
            <MangaCard manga={manga} key={manga.id} />
          ))}
        </MangaGrid>
      </div>

      <CatalogPagination catalogPage={catalogPage} />
    </div>
  );
}
