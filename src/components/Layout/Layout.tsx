import Head from 'next/head';
import { Heading } from '@/components/Heading';
import { SearchForm } from '@/components/SearchForm';
import { ResultsList } from '@/components/ResultsList';
import { Pagination } from '@/components/Pagination';
import { ReactNode } from 'react';
import { IResponse } from '@/types/interfaces/IResponse';

interface ILayoutProps {
  children?: ReactNode;
  data: IResponse;
}

export function Layout({ data, children }: ILayoutProps) {
  return (
    <>
      <Head>
        <title>RSSchool React</title>
      </Head>
      <Heading />
      <main>
        <SearchForm />
        <div className="content">
          <div className="paginationContainer">
            <ResultsList list={data} />
            {data.products.length < data.total && (
              <Pagination total={data.total} />
            )}
          </div>
          {children}
        </div>
      </main>
    </>
  );
}

Layout.defaultProps = {
  children: null,
};
