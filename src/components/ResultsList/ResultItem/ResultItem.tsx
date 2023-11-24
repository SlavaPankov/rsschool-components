import Link from 'next/link';
import styles from '@/styles/resultItem.module.css';
import { useRouter } from 'next/router';
import { noId } from '@/utils/noId';

type IResultItemProps = {
  id: number;
  title: string;
};

export function ResultItem({ id, title }: IResultItemProps) {
  const router = useRouter();

  return (
    <li className={styles.item}>
      <Link
        href={{
          pathname: `/detail/${id}`,
          query: noId(router.query as { [k: string]: string }),
        }}
      >
        <h3 className={styles.itemHeading}>{title}</h3>
      </Link>
    </li>
  );
}
