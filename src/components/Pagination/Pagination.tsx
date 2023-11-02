import { MouseEvent } from 'react';
import './pagination.css';
import { EPaginationButtonDirection } from '../../types/enums/EPaginationButtonDirection';

type IPaginationProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
};

export function Pagination({
  onClick,
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
      <button
        disabled={isNextDisabled}
        onClick={onClick}
        type="button"
        data-direction={EPaginationButtonDirection.next}
      >
        Next
      </button>
    </div>
  );
}

Pagination.defaultProps = {
  isPrevDisabled: true,
  isNextDisabled: false,
};
