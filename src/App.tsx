import { MouseEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchForm } from './components/SearchForm';
import { Heading } from './components/Heading';
import { IPerson } from './types/interfaces/IPerson';
import { ResultsList } from './components/ResultsList';
import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';
import { EPaginationButtonDirection } from './types/enums/EPaginationButtonDirection';

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPagination, setIsPagination] = useState<boolean | null>(null);
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [search, setSearch] = useState<string>('');
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);

  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${query.trim()}&page=${page}`
    );
    const {
      results: responseResults,
      count,
      previous,
      next,
    }: {
      results: IPerson[];
      count: number;
      previous: null | string;
      next: null | string;
    } = await response.json();

    setIsNextDisabled(next === null);
    setIsPrevDisabled(previous === null);
    setIsPagination(results.length < count);
    setIsLoading(false);
    setResults(responseResults);
  };

  const handlePaginationClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.currentTarget.dataset.direction === EPaginationButtonDirection.next
    ) {
      setPage((prevState) => prevState + 1);
    } else if (page > 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    const searchLs = localStorage.getItem('search');

    setSearch(searchLs || '');
  }, []);

  useEffect(() => {
    setSearchParams({ page: `${page}` });
    handleSubmit(search);
  }, [page]);

  return (
    <>
      <Heading />
      <SearchForm value={search} setValue={setSearch} onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ResultsList list={results} />
          {isPagination && (
            <Pagination
              onClick={handlePaginationClick}
              isPrevDisabled={isPrevDisabled}
              isNextDisabled={isNextDisabled}
            />
          )}
        </>
      )}
    </>
  );
}
