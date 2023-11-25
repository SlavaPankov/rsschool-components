import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/pagination.module.css';

interface IPaginationProps {
  total: number;
}

export function Pagination({ total }: IPaginationProps) {
  const router = useRouter();
  const { query } = router;
  const page = Number(query.page as string) || 1;
  const limit = Number(query.limit as string) || 10;

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (Number(event.target.value) === 10) {
      delete query.limit;
    } else {
      query.limit = `${event.target.value}`;
    }

    delete query.page;

    await router.push({ pathname: router.pathname, query });
  };

  const handleNextClick = async () => {
    if (page * limit !== total) {
      query.page = `${page + 1}`;
    }

    await router.push({ pathname: router.pathname, query });
  };

  const handlePrevClick = async () => {
    if (page > 1) {
      query.page = `${page - 1}`;
    }

    if (page - 1 === 1) {
      delete query.page;
    }

    await router.push({ pathname: router.pathname, query });
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevClick}
        disabled={page === 1}
        type="button"
        name="prev"
      >
        Prev
      </button>
      <button type="button">{query.page || 1}</button>
      <button
        onClick={handleNextClick}
        disabled={page * limit === total}
        type="button"
        name="next"
      >
        Next
      </button>
      <label className={styles.limit} htmlFor="limit">
        Limit:
        <select
          name="limit"
          id="limit"
          defaultValue={query.limit || 10}
          onChange={handleChange}
          data-testid="select"
        >
          <option data-testid="select-option" value="10">
            10
          </option>
          <option data-testid="select-option" value="20">
            20
          </option>
          <option data-testid="select-option" value="50">
            50
          </option>
        </select>
      </label>
    </div>
  );
}
