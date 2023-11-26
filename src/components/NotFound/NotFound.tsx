import Link from 'next/link';
import styles from '@/components/Heading/heading.module.css';

export function NotFound() {
  return (
    <div className={styles.heading}>
      <h1>Page not found</h1>
      <Link href={{ pathname: '/' }}>Go to main</Link>
    </div>
  );
}
