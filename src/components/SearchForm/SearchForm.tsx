import { ChangeEvent, FormEvent } from 'react';
import './searchForm.css';
import { useSearchParams } from 'react-router-dom';
import { ErrorButton } from '../ErrorButton';

type ISearchFormProps = {
  value: string;
  setValue: (data: string) => void;
  limit: number;
  onSubmit: (query: string, page: number, limit: number) => void;
  setPage: (page: number) => void;
};

export function SearchForm({
  value,
  setValue,
  limit,
  onSubmit,
  setPage,
}: ISearchFormProps) {
  const [, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('search', value);

    onSubmit(value, 1, limit);
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
