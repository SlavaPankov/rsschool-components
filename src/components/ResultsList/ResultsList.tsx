import './resultsList.css';
import { ResultItem } from './ResultItem';
import { Loader } from '../Loader';
import { useGetProductsQuery } from '../../store/products/products';
import { useAppSelector } from '../../hooks/useAppSelector';

export function ResultsList() {
  const { search, page, limit } = useAppSelector((state) => state.options);
  const { data, isFetching } = useGetProductsQuery({ search, page, limit });

  if (isFetching) {
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
