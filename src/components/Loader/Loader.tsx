import styles from '@/components/Loader/loader.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Loader() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', () => setIsLoading(false));
    router.events.on('routeChangeError', () => setIsLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => setIsLoading(true));
      router.events.off('routeChangeComplete', () => setIsLoading(false));
      router.events.off('routeChangeError', () => setIsLoading(false));
    };
  }, [router.events]);

  if (!isLoading) return null;

  return <p className={styles.loader}>Loading...</p>;
}
