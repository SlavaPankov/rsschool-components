import { Outlet } from 'react-router-dom';
import { SearchForm } from '../../components/SearchForm';
import { Heading } from '../../components/Heading';
import { ResultsList } from '../../components/ResultsList';
import { Pagination } from '../../components/Pagination';
import './mainPage.css';
import { UseProductsContextProvider } from '../../context/productsContext';
import { UseSearchContextProvider } from '../../context/searchContext';

export function MainPage() {
  return (
    <>
      <Heading />
      <UseSearchContextProvider>
        <SearchForm />
        <div className="content">
          <div className="paginationContainer">
            <UseProductsContextProvider>
              <ResultsList />
              <Pagination />
            </UseProductsContextProvider>
          </div>
          <Outlet />
        </div>
      </UseSearchContextProvider>
    </>
  );
}
