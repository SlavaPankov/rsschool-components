import { IPerson } from '../../types/interfaces/IPerson';
import './resultsList.css';
import { ResultItem } from './ResultItem/ResultItem';

type IResultsListProps = {
  list: IPerson[];
};

export function ResultsList({ list }: IResultsListProps) {
  if (list.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ul className="list">
      {list.map((item) => (
        <ResultItem
          key={item.name}
          name={item.name}
          birthDate={item.birth_year}
          eyeColor={item.eye_color}
          gender={item.gender}
          hairColor={item.hair_color}
          height={item.height}
        />
      ))}
    </ul>
  );
}
