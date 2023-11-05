import './resultItem.css';
import { Link, useLocation } from 'react-router-dom';

type IResultItemProps = {
  id: number;
  title: string;
};

export function ResultItem({ id, title }: IResultItemProps) {
  const { search } = useLocation();

  return (
    <li className="item">
      <Link to={{ pathname: `/detail/${id}`, search: `${search}` }}>
        <h3 className="item-heading">{title}</h3>
      </Link>
    </li>
  );
}
