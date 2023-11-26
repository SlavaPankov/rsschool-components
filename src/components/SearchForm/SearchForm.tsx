import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/components/SearchForm/searchForm.module.css';
import { ErrorButton } from '@/components/ErrorButton';

export function SearchForm() {
  const router = useRouter();
  const [value, setValue] = useState<string>(
    (router.query.search as string) || ''
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      delete router.query.search;
    } else {
      router.query.search = value;
    }

    delete router.query.page;

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
