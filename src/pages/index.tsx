import { wrapper } from '@/store/store';
import { getRunningQueriesThunk, productsApi } from '@/store/products/products';
import { IResponse } from '@/types/interfaces/IResponse';
import { Layout } from '@/components/Layout';
import { getSearchValue } from '@/utils/getSearchValue';

interface IHomeProps {
  data: IResponse;
}

export default function Home({ data }: IHomeProps) {
  return <Layout data={data} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, page, limit } = context.query;

    const { data } = await store.dispatch(
      productsApi.endpoints?.getProducts.initiate({
        search: getSearchValue(search, ''),
        page: Number(getSearchValue(page, String(1))),
        limit: Number(getSearchValue(limit, String(10))),
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data,
      },
    };
  }
);
