import { useEffect, useState } from 'react';
import './errorButton.css';

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
    <button className="error-button" type="button" onClick={handleClick}>
      Throw Error
    </button>
  );
}
