import { useEffect, useState } from 'react';
import styles from '@/components/ErrorButton/errorButton.module.css';

export function ErrorButton() {
  const [hasError, setHasError] = useState<boolean>(false);
  const handleClick = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('Test error');
    }
  }, [hasError]);

  return (
    <button className={styles.errorButton} type="button" onClick={handleClick}>
      Throw Error
    </button>
  );
}
