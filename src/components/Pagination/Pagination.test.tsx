/* eslint-disable react/jsx-no-constructed-context-values */
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import {
  IProductsContextData,
  productsContext,
} from '../../context/productsContext';
import { Pagination } from './Pagination';
import { UseSearchContextProvider } from '../../context/searchContext';

const productContextValue: IProductsContextData = {
  products: [],
  isLoading: false,
  isPagination: true,
  total: 100,
};
let mockSearchParams: string = '';
vi.mock('react-router-dom', async () => {
  const mock = (await vi.importActual('react-router-dom')) as object;
  return {
    ...mock,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParams)
      );
      return [
        params,
        (newParams: string) => {
          mockSearchParams = newParams;
          setParams(new URLSearchParams(mockSearchParams));
        },
      ];
    },
  };
});

describe('Pagination', () => {
  it('should updates URL query parameter when click next button', async () => {
    render(
      <UseSearchContextProvider>
        <productsContext.Provider value={productContextValue}>
          <Pagination />
        </productsContext.Provider>
      </UseSearchContextProvider>,
      { wrapper: MemoryRouter }
    );
    const user = userEvent.setup();

    const button = screen.getByRole('button', { name: /Next/ });
    await user.click(button);
    await user.click(button);

    expect(mockSearchParams).toStrictEqual({ page: '3' });
  });

  it('should updates URL query parameter when click prev button', async () => {
    render(
      <UseSearchContextProvider>
        <productsContext.Provider value={productContextValue}>
          <Pagination />
        </productsContext.Provider>
      </UseSearchContextProvider>,
      { wrapper: MemoryRouter }
    );

    const user = userEvent.setup();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    await user.click(prevButton);

    expect(mockSearchParams).toStrictEqual({ page: '2' });
  });
});
