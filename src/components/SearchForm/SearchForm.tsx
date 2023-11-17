import { ChangeEvent, FormEvent, useState } from 'react';
import './searchForm.css';
import { useSearchParams } from 'react-router-dom';
import { ErrorButton } from '../ErrorButton';
import { EOptions } from '../../types/enums/EOptions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setPage, setSearchValue } from '../../store/options/options';

export function SearchForm() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((store) => store.options);
  const [value, setValue] = useState<string>(search);
  const [, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem(EOptions.search, value);

    dispatch(setSearchValue(value));
    dispatch(setPage(1));
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
