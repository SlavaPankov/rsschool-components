import styles from '@/components/ResultsList/resultsList.module.css';
import { IProduct } from '@/types/interfaces/IProduct';
import { ResultItem } from './ResultItem';

interface IResultsListProps {
  list: IProduct[];
}

export function ResultsList({ list }: IResultsListProps) {
  if (!list.length) {
    return <div data-testid="empty">No results</div>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {list.map((product) => (
          <ResultItem id={product.id} title={product.title} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
