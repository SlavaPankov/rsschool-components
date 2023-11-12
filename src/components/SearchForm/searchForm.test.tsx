import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UseSearchContextProvider } from '../../context/searchContext/searchContext';
import { SearchForm } from './SearchForm';

const testInput = 'test';

afterEach(() => {
  cleanup();
});

describe('Search form', () => {
  it('should clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <UseSearchContextProvider>
        <SearchForm />
      </UseSearchContextProvider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: testInput },
    });
    await user.click(screen.getByRole('button', { name: 'search' }));

    expect(localStorage.getItem('search')).toBe(testInput);
  });

  it('should retrieves the value from the local storage upon mounting', () => {
    render(
      <UseSearchContextProvider>
        <SearchForm />
      </UseSearchContextProvider>,
      { wrapper: BrowserRouter }
    );

    const input = screen.getByRole('textbox');

    expect((input as HTMLInputElement).value).toBe(
      localStorage.getItem('search')
    );
  });
});
