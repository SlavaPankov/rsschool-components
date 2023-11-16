import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { SearchForm } from './SearchForm';
import store from '../../store/store';

const testInput = 'test';

afterEach(() => {
  cleanup();
});

describe('Search form', () => {
  it('should clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>,
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
      <Provider store={store}>
        <SearchForm />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const input = screen.getByRole('textbox');

    expect((input as HTMLInputElement).value).toBe(
      localStorage.getItem('search')
    );
  });
});
