import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './searchForm.css';
import { ErrorButton } from '../ErrorButton';

type ISearchFormProps = {
  onSubmit: (search: string) => void;
};

export function SearchForm({ onSubmit }: ISearchFormProps) {
  const [search, setSearch] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('search', search);

    onSubmit(search);
  };

  useEffect(() => {
    const searchLS = localStorage.getItem('search');

    setSearch(searchLS || '');

    onSubmit(searchLS || '');
  }, [onSubmit]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="search">
        <input
          className="input"
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="May the force be with you"
        />
      </label>
      <button type="submit">search</button>
      <ErrorButton />
    </form>
  );
}
