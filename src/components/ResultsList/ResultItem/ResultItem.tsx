import './resultItem.css';
import { Link } from 'react-router-dom';

type IResultItemProps = {
  id: number;
  title: string;
};

export function ResultItem({ id, title }: IResultItemProps) {
  return (
    <li className="item">
      <Link to={`/detail/${id}`}>
        <h3 className="item-heading">{title}</h3>
      </Link>
    </li>
  );
}
