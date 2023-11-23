import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/searchForm.module.css';
import { ErrorButton } from '@/components/ErrorButton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setPage, setSearchValue } from '@/store/options/options';

export function SearchForm({ search }: { search: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setSearchValue(value));
    dispatch(setPage(1));

    if (!value) {
      delete router.query.search;
    } else {
      router.query.search = value;
    }

    await router.push({ pathname: router.pathname, query: router.query });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="search">
        <span className={styles.span}>Search:</span>
        <input
          className={styles.input}
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
