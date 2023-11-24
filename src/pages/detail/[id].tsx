import Head from 'next/head';
import { Card } from '@/components/Card';
import { wrapper } from '@/store/store';
import { getRunningQueriesThunk, productsApi } from '@/store/products/products';
import { IProduct } from '@/types/interfaces/IProduct';
import styles from '@/styles/detailPage.module.css';
import Home from '@/pages';
import { IResponse } from '@/types/interfaces/IResponse';
import { useRouter } from 'next/router';
import { setStoreValues } from '@/utils/setStoreValues';
import { noId } from '@/utils/noId';

interface IDetailPageProps {
  product: IProduct;
  data: IResponse;
  page: number;
  limit: number;
  search: string;
}

export default function DetailPage({
  product,
  data,
  page,
  limit,
  search,
}: IDetailPageProps) {
  const router = useRouter();

  const handleClick = async () => {
    await router.push({
      pathname: '/',
      query: noId(router.query as { [k: string]: string }),
    });
  };

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <Home data={data} page={page} limit={limit} search={search}>
        <div className={styles.detail} data-testid="detail">
          <button
            className={styles.cross}
            type="button"
            name="close"
            onClick={handleClick}
          >
            cross
          </button>
          <Card product={product} />
        </div>
      </Home>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params } = context;
    const query = context.query as { [k: string]: string };

    setStoreValues(store, query);

    const {
      options: { search, page, limit },
    } = store.getState();

    const { data: product } = await store.dispatch(
      productsApi.endpoints?.getProduct.initiate(Number(params?.id))
    );

    const { data } = await store.dispatch(
      productsApi.endpoints?.getProducts.initiate({ search, page, limit })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data,
        product,
        page,
        limit,
        search,
      },
    };
  }
);
