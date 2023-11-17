import { SearchForm } from '../../components/SearchForm';
import { Heading } from '../../components/Heading';
import './mainPage.css';
import { Content } from '../../components/Content';

export function MainPage() {
  return (
    <>
      <Heading />
      <SearchForm />
      <Content />
    </>
  );
}
