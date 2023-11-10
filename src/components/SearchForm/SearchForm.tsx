import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './searchForm.css';
import { useSearchParams } from 'react-router-dom';
import { ErrorButton } from '../ErrorButton';
import { searchContext } from '../../context/searchContext/searchContext';

export function SearchForm() {
  const { search, setSearch, setPage } = useContext(searchContext);
  const [value, setValue] = useState<string>(search);
  const [, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('search', value);

    setSearch(value);
    setPage(1);
    setSearchParams({});
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="search">
        <input
          className="input"
          type="text"
          id="search"
          name="search"
          value={value}
          onChange={handleChange}
          placeholder="May the force be with you"
        />
      </label>
      <button type="submit">search</button>
      <ErrorButton />
    </form>
  );
}
