import { IProduct } from '../../types/interfaces/IProduct';
import './resultsList.css';
import { ResultItem } from './ResultItem/ResultItem';

type IResultsListProps = {
  list: IProduct[];
};

export function ResultsList({ list }: IResultsListProps) {
  if (list.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ul className="list">
      {list.map((item) => (
        <ResultItem id={item.id} title={item.title} key={item.id} />
      ))}
    </ul>
  );
}
