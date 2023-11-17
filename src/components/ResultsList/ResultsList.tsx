import './resultsList.css';
import { useEffect } from 'react';
import { ResultItem } from './ResultItem';
import { Loader } from '../Loader';
import { useGetProductsQuery } from '../../store/products/products';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsProductsLoading } from '../../store/options/options';

export function ResultsList() {
  const dispatch = useAppDispatch();
  const { search, page, limit, isProductsLoading } = useAppSelector(
    (state) => state.options
  );
  const { data, isFetching } = useGetProductsQuery({ search, page, limit });

  useEffect(() => {
    dispatch(setIsProductsLoading(isFetching));
  }, [isFetching]);

  if (isProductsLoading) {
    return <Loader />;
  }

  if (!data || !data.products || !data.products.length) {
    return <div>No results</div>;
  }

  return (
    <div>
      <ul className="list">
        {data.products.map((product) => (
          <ResultItem id={product.id} title={product.title} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
