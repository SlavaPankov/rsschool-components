import { Link } from 'react-router-dom';
import styles from './pageHeading.module.css';

interface IPageHeadingProps {
  title: string;
}

export function PageHeading({ title }: IPageHeadingProps) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Link to="/">На главную</Link>
    </header>
  );
}
