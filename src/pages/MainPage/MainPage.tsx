import { MouseEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchForm } from '../../components/SearchForm';
import { Heading } from '../../components/Heading';
import { IProduct } from '../../types/interfaces/IProduct';
import { ResultsList } from '../../components/ResultsList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { EPaginationButtonDirection } from '../../types/enums/EPaginationButtonDirection';
import { Api } from '../../api/Api';

export function MainPage() {
  const api = new Api();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPagination, setIsPagination] = useState<boolean | null>(null);
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [search, setSearch] = useState<string>('');
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [limit] = useState<number>(10);
  const [isComponentMount, setIsComponentMount] = useState<boolean>(false);

  const handleSubmit = async (
    query: string,
    currentPage: number,
    currentLimit: number
  ) => {
    setIsLoading(true);
    const { products, total } = await api.search(
      query,
      currentPage,
      currentLimit
    );

    setIsNextDisabled((page - 1) * limit === total);
    setIsPrevDisabled(page === 1);
    setIsPagination(products.length < total);
    setIsLoading(false);
    setResults(products);
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

    handleSubmit(searchLs || '', page, limit);
    setIsComponentMount(true);
  }, []);

  useEffect(() => {
    if (page > 1) {
      setSearchParams({ page: `${page}` });
    } else {
      setSearchParams({});
    }

    if (isComponentMount) {
      handleSubmit(search, page, limit);
    }
  }, [page]);

  return (
    <>
      <Heading />
      <SearchForm
        value={search}
        limit={limit}
        setValue={setSearch}
        onSubmit={handleSubmit}
      />
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
