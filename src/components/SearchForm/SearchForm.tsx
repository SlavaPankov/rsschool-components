import { ChangeEvent, FormEvent } from 'react';
import './searchForm.css';
import { ErrorButton } from '../ErrorButton';

type ISearchFormProps = {
  value: string;
  setValue: (data: string) => void;
  onSubmit: (query: string) => void;
};

export function SearchForm({ value, setValue, onSubmit }: ISearchFormProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('search', value);

    onSubmit(value);
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
