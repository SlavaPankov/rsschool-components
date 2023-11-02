import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { Heading } from './components/Heading';
import { IPerson } from './types/IPerson';
import { ResultsList } from './components/ResultsList';
import { Loader } from './components/Loader';

export function App() {
  const [results, setResults] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (search: string) => {
    setIsLoading(true);
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${search.trim()}`
    );
    const { results: responseResults }: { results: IPerson[] } =
      await response.json();
    setIsLoading(false);
    setResults(responseResults);
  };

  return (
    <>
      <Heading />
      <SearchForm onSubmit={handleSubmit} />
      {isLoading ? <Loader /> : <ResultsList list={results} />}
    </>
  );
}
