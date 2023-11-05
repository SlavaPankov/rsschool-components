import { ChangeEvent, MouseEvent } from 'react';
import './pagination.css';
import { EPaginationButtonDirection } from '../../types/enums/EPaginationButtonDirection';

type IPaginationProps = {
  currentPage: number;
  limit: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
};

export function Pagination({
  currentPage,
  limit,
  onClick,
  onChange,
  isNextDisabled,
  isPrevDisabled,
}: IPaginationProps) {
  return (
    <div className="pagination">
      <button
        disabled={isPrevDisabled}
        onClick={onClick}
        type="button"
        data-direction={EPaginationButtonDirection.prev}
      >
        Prev
      </button>
      <button type="button">{currentPage}</button>
      <button
        disabled={isNextDisabled}
        onClick={onClick}
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
          onChange={onChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
  );
}

Pagination.defaultProps = {
  isPrevDisabled: true,
  isNextDisabled: false,
};
