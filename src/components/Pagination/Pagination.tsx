import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import './pagination.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import { EPaginationButtonDirection } from '../../types/enums/EPaginationButtonDirection';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setLimit, setPage } from '../../store/options/options';
import { useGetProductsQuery } from '../../store/products/products';

export function Pagination() {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { limit, page, search } = useAppSelector((state) => state.options);
  const { data, isFetching } = useGetProductsQuery({ search, page, limit });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('limit', event.target.value);
    dispatch(setLimit(Number(event.target.value)));
    dispatch(setPage(1));
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.currentTarget.dataset.direction === EPaginationButtonDirection.next
    ) {
      if (page * limit !== data?.total) {
        dispatch(setPage(page + 1));
      }
    } else if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  useEffect(() => {
    setIsDisabled(location.pathname.includes('detail'));
  }, [location]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setIsDisabled(data.products.length < data.limit);
  }, [data]);

  useEffect(() => {
    if (page > 1) {
      setSearchParams({ page: `${page}` });
    } else {
      setSearchParams({});
    }
  }, [page]);

  return (
    <div className="pagination">
      <button
        disabled={isDisabled}
        onClick={handleClick}
        type="button"
        name="prev"
        data-direction={EPaginationButtonDirection.prev}
      >
        Prev
      </button>
      <button type="button">{page}</button>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        type="button"
        name="next"
        data-direction={EPaginationButtonDirection.next}
      >
        Next
      </button>
      <label className="limit" htmlFor="limit">
        Limit:
        <select
          disabled={isFetching}
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
