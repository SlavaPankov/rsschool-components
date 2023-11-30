import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import styles from './AutocompleteSelect.module.css';

interface IAutocompleteSelectProps {
  label?: string;
  error: string;
  list: { name: string }[];
}

export function AutocompleteSelect({
  label,
  list,
  error,
}: IAutocompleteSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isListShowing, setIsListShowing] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<typeof list>(list);
  const [chosenValue, setChosenValue] = useState<string>('');

  const setInputValue = (value: string) => {
    const { current } = inputRef;

    if (!current) {
      return;
    }

    current.value = value;
  };

  const filterList = (value: string) => {
    const filtered = list.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredList(filtered);
  };

  const handleFocus = () => {
    setIsListShowing(true);

    const { current } = inputRef;

    if (!current) {
      return;
    }

    filterList(current.value);
  };

  const handleBlur = () => {
    if (!chosenValue) {
      setInputValue('');
    } else {
      setInputValue(chosenValue);
    }

    setTimeout(() => setIsListShowing(false), 200);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { textContent } = event.currentTarget;

    if (!textContent) {
      return;
    }

    setInputValue(textContent);
    setChosenValue(textContent);
    setIsListShowing(false);
    inputRef.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    filterList(event.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="country" className={styles.label}>
        {label && <span>{label}</span>}
      </label>
      <div className={styles.listContainer}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          name="country"
          id="country"
          placeholder="country"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
        />
        {isListShowing && (
          <div className={styles.wrapper}>
            {filteredList.length ? (
              <ul className={styles.list}>
                {filteredList.map((item) => (
                  <li className={styles.item} key={item.name}>
                    <button
                      onClick={handleClick}
                      type="button"
                      className={styles.button}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.noResult}>No results</div>
            )}
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

AutocompleteSelect.defaultProps = {
  label: '',
};
