import { SearchForm } from '../../components/SearchForm';
import { Heading } from '../../components/Heading';
import './mainPage.css';
import { UseSearchContextProvider } from '../../context/searchContext/searchContext';
import { UseProductsContextProvider } from '../../context/productsContext/productsContext';
import { Content } from '../../components/Content';

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
