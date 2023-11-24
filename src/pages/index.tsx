import Head from 'next/head';
import { Heading } from '@/components/Heading';
import { SearchForm } from '@/components/SearchForm';
import { wrapper } from '@/store/store';
import { getRunningQueriesThunk, productsApi } from '@/store/products/products';
import { IResponse } from '@/types/interfaces/IResponse';
import { ResultsList } from '@/components/ResultsList';
// import { setLimit, setPage, setSearchValue } from '@/store/options/options';
import { Pagination } from '@/components/Pagination';
import { ReactNode } from 'react';
import { setStoreValues } from '@/utils/setStoreValues';

interface IHomeProps {
  data: IResponse;
  page: number;
  limit: number;
  search: string;
  children: ReactNode;
}

export default function Home({
  data,
  page,
  limit,
  search,
  children,
}: IHomeProps) {
  return (
    <>
      <Head>
        <title>RSSchool React</title>
      </Head>
      <Heading />
      <main>
        <SearchForm search={search} />
        <div className="content">
          <div className="paginationContainer">
            <ResultsList list={data} />
            {data.products.length < data.total && (
              <Pagination page={page} limit={limit} total={data.total} />
            )}
          </div>
          {children}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setStoreValues(store, context.query as { [k: string]: string });

    const {
      options: { search, page, limit },
    } = store.getState();

    const { data } = await store.dispatch(
      productsApi.endpoints?.getProducts.initiate({ search, page, limit })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data,
        page,
        limit,
        search,
      },
    };
  }
);
