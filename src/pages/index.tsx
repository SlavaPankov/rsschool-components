import Head from 'next/head';
import { Heading } from '@/components/Heading';
import { SearchForm } from '@/components/SearchForm';
import { wrapper } from '@/store/store';
import { getRunningQueriesThunk, productsApi } from '@/store/products/products';
import { IResponse } from '@/types/interfaces/IResponse';
import { ResultsList } from '@/components/ResultsList';
import { setLimit, setPage, setSearchValue } from '@/store/options/options';
import { Pagination } from '@/components/Pagination';
import { useRouter } from 'next/router';

interface IHomeProps {
  data: IResponse;
  page: number;
  limit: number;
  search: string;
}

export default function Home({ data, page, limit, search }: IHomeProps) {
  const router = useRouter();

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
          {router.pathname.includes('/detail') && <div>details</div>}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const {
      search: searchValue,
      page: currentPage,
      limit: currentLimit,
    } = context.query;

    if (searchValue && typeof searchValue === 'string') {
      store.dispatch(setSearchValue(searchValue));
    }

    if (currentPage && typeof currentPage === 'string') {
      store.dispatch(setPage(Number(currentPage)));
    }

    if (currentLimit && typeof currentLimit === 'string') {
      store.dispatch(setLimit(Number(currentLimit)));
    }

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
