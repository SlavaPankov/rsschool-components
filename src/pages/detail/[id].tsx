import { Card } from '@/components/Card';
import { wrapper } from '@/store/store';
import { getRunningQueriesThunk, productsApi } from '@/store/products/products';
import { IProduct } from '@/types/interfaces/IProduct';
import styles from '@/styles/detailPage.module.css';
import { IResponse } from '@/types/interfaces/IResponse';
import { useRouter } from 'next/router';
import { noId } from '@/utils/noId';
import { Layout } from '@/components/Layout';
import { getSearchValue } from '@/utils/getSearchValue';
import { useEffect, useRef } from 'react';

interface IDetailPageProps {
  product: IProduct;
  data: IResponse;
}

export default function DetailPage({ product, data }: IDetailPageProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const closeOnClickOutOfBoundaries = async (event: MouseEvent) => {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      await router.push({
        pathname: '/',
        query: noId(router.query as { [k: string]: string }),
      });
    }
  };

  const handleClick = async () => {
    await router.push({
      pathname: '/',
      query: noId(router.query as { [k: string]: string }),
    });
  };

  useEffect(() => {
    document.addEventListener('click', closeOnClickOutOfBoundaries);

    return () => {
      document.removeEventListener('click', closeOnClickOutOfBoundaries);
    };
  }, []);

  return (
    <Layout data={data}>
      <div className={styles.detail} data-testid="detail" ref={ref}>
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
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params } = context;
    const { search, page, limit } = context.query;

    const { data } = await store.dispatch(
      productsApi.endpoints?.getProducts.initiate({
        search: getSearchValue(search, ''),
        page: Number(getSearchValue(page, String(1))),
        limit: Number(getSearchValue(limit, String(10))),
      })
    );

    const { data: product } = await store.dispatch(
      productsApi.endpoints?.getProduct.initiate(Number(params?.id))
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data,
        product,
      },
    };
  }
);
