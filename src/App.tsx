import { MouseEvent, useEffect, useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { Heading } from './components/Heading';
import { IProduct } from './types/interfaces/IProduct';
import { ResultsList } from './components/ResultsList';
import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';
import { EPaginationButtonDirection } from './types/enums/EPaginationButtonDirection';

export function App() {
  const [results, setResults] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPagination, setIsPagination] = useState<boolean | null>(null);
  const [search, setSearch] = useState<string>('');

  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products/search/?q=${query.trim()}`
    );
    const {
      products: responseResults,
      total,
    }: {
      products: IProduct[];
      total: number;
    } = await response.json();

    setIsPagination(results.length < total);
    setIsLoading(false);
    setResults(responseResults);
  };

  const handlePaginationClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.currentTarget.dataset.direction === EPaginationButtonDirection.next
    ) {
      console.log('up');
    } else {
      console.log('down');
    }
  };

  useEffect(() => {
    const searchLs = localStorage.getItem('search');

    setSearch(searchLs || '');

    handleSubmit(searchLs || '');
  }, []);

  return (
    <>
      <Heading />
      <SearchForm value={search} setValue={setSearch} onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ResultsList list={results} />
          {isPagination && <Pagination onClick={handlePaginationClick} />}
        </>
      )}
    </>
  );
}
