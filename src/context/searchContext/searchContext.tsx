import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface ISearchContextData {
  search: string;
  page: number;
  limit: number;
  setSearch: (data: string) => void;
  setPage: (data: number) => void;
  setLimit: (data: number) => void;
}

export const searchContextDefaultValue = {
  search: '',
  page: 1,
  limit: 10,
  setSearch: (data: string) => {
    searchContextDefaultValue.search = data;
  },
  setPage: (data: number) => {
    searchContextDefaultValue.page = data;
  },
  setLimit: (data: number) => {
    searchContextDefaultValue.limit = data;
  },
};

export const searchContext = createContext<ISearchContextData>(
  searchContextDefaultValue
);

export function UseSearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    localStorage.getItem('search') || ''
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [limit, setLimit] = useState<number>(
    Number(localStorage.getItem('limit')) || 10
  );

  useEffect(() => {
    if (page > 1) {
      setSearchParams({ page: `${page}` });
    } else {
      setSearchParams({});
    }
  }, [page]);

  const searchProviderValue = useMemo(
    () => ({ search, setSearch, page, setPage, limit, setLimit }),
    [search, setSearch, page, setPage, limit, setLimit]
  );

  return (
    <searchContext.Provider value={searchProviderValue}>
      {children}
    </searchContext.Provider>
  );
}
