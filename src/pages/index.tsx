import { wrapper } from '@/store/store';
import { getRunningQueriesThunk, productsApi } from '@/store/products/products';
import { IResponse } from '@/types/interfaces/IResponse';
import { Layout } from '@/components/Layout';
import { getSearchValue } from '@/utils/getSearchValue';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Layout data={data} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const { search, page, limit } = context.query;

      const { data } = await store.dispatch(
        productsApi.endpoints?.getProducts.initiate({
          search: getSearchValue(search, ''),
          page: Number(getSearchValue(page, String(1))),
          limit: Number(getSearchValue(limit, String(10))),
        })
      );

      if (!data) {
        throw new Error('no data');
      }

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return {
        props: {
          data,
        },
      };
    } catch {
      return {
        props: {
          data: {
            products: [],
            total: 0,
            skip: 0,
            limit: 0,
          },
        },
      };
    }
  }
) satisfies GetServerSideProps<{
  data: IResponse;
}>;
