import { Outlet } from 'react-router-dom';
import { ResultsList } from '../ResultsList';
import { Pagination } from '../Pagination';

export function Content() {
  return (
    <div className="content">
      <div className="paginationContainer">
        <ResultsList />
        <Pagination />
      </div>
      <Outlet />
    </div>
  );
}
