import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/pagination.module.css';

interface IPaginationProps {
  page: number;
  limit: number;
  total: number;
}

export function Pagination({ page, limit, total }: IPaginationProps) {
  const router = useRouter();

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (Number(event.target.value) === 10) {
      delete router.query.limit;
    } else {
      router.query.limit = `${event.target.value}`;
    }

    delete router.query.page;

    await router.push({ pathname: router.pathname, query: router.query });
  };

  const handleNextClick = async () => {
    if (page * limit !== total) {
      router.query.page = `${page + 1}`;
    }

    await router.push({ pathname: router.pathname, query: router.query });
  };

  const handlePrevClick = async () => {
    if (page > 1) {
      router.query.page = `${page - 1}`;
    }

    if (page - 1 === 1) {
      delete router.query.page;
    }

    await router.push({ pathname: router.pathname, query: router.query });
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
      <button type="button">{page}</button>
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
          defaultValue={limit}
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
