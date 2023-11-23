import styles from '@/styles/resultsList.module.css';
import { IResponse } from '@/types/interfaces/IResponse';
import { ResultItem } from './ResultItem';

interface IResultsListProps {
  list: IResponse;
}

export function ResultsList({ list }: IResultsListProps) {
  if (!list.products.length) {
    return <div>No results</div>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {list.products.map((product) => (
          <ResultItem id={product.id} title={product.title} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
