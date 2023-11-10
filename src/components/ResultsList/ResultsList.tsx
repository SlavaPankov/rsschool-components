import { useContext } from 'react';
import './resultsList.css';
import { ResultItem } from './ResultItem';
import { productsContext } from '../../context/productsContext';
import { Loader } from '../Loader';

export function ResultsList() {
  const { products, isLoading } = useContext(productsContext);

  if (isLoading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <div>No results</div>;
  }

  return (
    <div>
      <ul className="list">
        {products.map((item) => (
          <ResultItem id={item.id} title={item.title} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
