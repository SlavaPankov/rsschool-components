/* eslint-disable react/jsx-no-constructed-context-values */
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ResultsList } from './ResultsList';
import { Api } from '../../api/Api';
import {
  IProductsContext,
  productsContext,
  UseProductsContextProvider,
} from '../../context/productsContext';

async function getProductContext(): Promise<IProductsContext> {
  const api = new Api();
  const response = await api.search('');
  return {
    products: response.products,
    isLoading: false,
    isPagination: false,
    total: response.total,
  };
}

describe('Results list', () => {
  it('should be render list of 10 items', async () => {
    const sampleData = await getProductContext();

    render(
      <productsContext.Provider value={sampleData}>
        <ResultsList />
      </productsContext.Provider>,
      { wrapper: BrowserRouter }
    );

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const item = getAllByRole('listitem');

    expect(item.length).toBe(10);
  });

  it('should render empty message', () => {
    const { getByText } = render(
      <UseProductsContextProvider>
        <ResultsList />
      </UseProductsContextProvider>,
      { wrapper: BrowserRouter }
    );

    expect(getByText(/^No results/)).toHaveTextContent('No results');
  });
});
