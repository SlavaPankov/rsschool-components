/* eslint-disable react/jsx-no-constructed-context-values */
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { ResultsList } from './ResultsList';
import { UseProductsContextProvider } from '../../context/productsContext';
import { handlers } from '../../test/mocks/handlers';
import { UseSearchContextProvider } from '../../context/searchContext';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = () => {
  return render(
    <UseSearchContextProvider>
      <UseProductsContextProvider>
        <ResultsList />
      </UseProductsContextProvider>
    </UseSearchContextProvider>,
    { wrapper: BrowserRouter }
  );
};

describe('Results list', () => {
  it('should be render list of 3 items', async () => {
    wrapper();

    await waitFor(() => screen.getByRole('list'));

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const item = getAllByRole('listitem');

    expect(item.length).toBe(3);
  });

  it('should render empty message', () => {
    const { getByText } = wrapper();

    expect(getByText(/^No results/)).toHaveTextContent('No results');
  });
});
