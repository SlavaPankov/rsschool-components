import Link from 'next/link';

import styles from '@/styles/resultItem.module.css';

type IResultItemProps = {
  id: number;
  title: string;
};

export function ResultItem({ id, title }: IResultItemProps) {
  return (
    <li className={styles.item}>
      <Link href={{ pathname: `/detail/${id}` }}>
        <h3 className={styles.itemHeading}>{title}</h3>
      </Link>
    </li>
  );
}
