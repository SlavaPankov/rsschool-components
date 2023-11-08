import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import './pagination.css';
import { useLocation } from 'react-router-dom';
import { EPaginationButtonDirection } from '../../types/enums/EPaginationButtonDirection';
import { searchContext } from '../../context/searchContext';
import { productsContext } from '../../context/productsContext';

export function Pagination() {
  const location = useLocation();
  const { limit, setLimit, setPage, page } = useContext(searchContext);
  const { isPagination, total } = useContext(productsContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('limit', event.target.value);
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.currentTarget.dataset.direction === EPaginationButtonDirection.next
    ) {
      if (page * limit !== total) {
        setPage(page + 1);
      }
    } else if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    setIsDisabled(location.pathname.includes('detail'));
  }, [location]);

  return (
    <div className="pagination">
      {isPagination && (
        <>
          <button
            disabled={isDisabled}
            onClick={handleClick}
            type="button"
            data-direction={EPaginationButtonDirection.prev}
          >
            Prev
          </button>
          <button type="button">{page}</button>
          <button
            disabled={isDisabled}
            onClick={handleClick}
            type="button"
            data-direction={EPaginationButtonDirection.next}
          >
            Next
          </button>
          <label className="limit" htmlFor="limit">
            Limit:
            <select
              name="limit"
              id="limit"
              defaultValue={limit}
              onChange={handleChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </>
      )}
    </div>
  );
}
