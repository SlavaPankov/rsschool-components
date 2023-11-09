import { SearchForm } from '../../components/SearchForm';
import { Heading } from '../../components/Heading';
import './mainPage.css';
import { UseSearchContextProvider } from '../../context/searchContext';
import { Content } from '../../components/Content';
import { UseProductsContextProvider } from '../../context/productsContext';

export function MainPage() {
  return (
    <>
      <Heading />
      <UseSearchContextProvider>
        <UseProductsContextProvider>
          <SearchForm />
          <Content />
        </UseProductsContextProvider>
      </UseSearchContextProvider>
    </>
  );
}
