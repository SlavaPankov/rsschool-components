/* eslint-disable react/jsx-no-constructed-context-values */
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ResultItem } from './ResultItem';
import { productsContext } from '../../../context/productsContext';
import { Content } from '../../Content';
import { DetailPage } from '../../../pages/DetailPage';
import { Api } from '../../../api/Api';
import { productMock } from '../../../test/mocks/productMock';

function prepare() {
  const routes = [
    {
      path: '/',
      element: (
        <productsContext.Provider
          value={{
            products: [productMock],
            isPagination: false,
            isLoading: false,
            total: 0,
          }}
        >
          <Content />
        </productsContext.Provider>
      ),
      children: [
        {
          path: '/detail/:id',
          element: <DetailPage />,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', `/detail/${productMock.id}`],
    initialIndex: 0,
  });

  render(<RouterProvider router={router} />);
}

describe('Result Item', () => {
  it('should render relevant data', () => {
    render(<ResultItem id={productMock.id} title={productMock.title} />, {
      wrapper: BrowserRouter,
    });

    const heading = screen.getByRole('heading', {
      level: 3,
    });

    const link = screen.getByRole('link');

    expect(heading).toHaveTextContent(productMock.title);
    expect(heading).not.toHaveTextContent('');
    expect(link).toHaveAttribute('href', `/detail/${productMock.id}`);
  });

  it('should clicking on a card opens a detailed card component', async () => {
    prepare();
    const user = userEvent.setup();

    const link = screen.getByRole('link');
    await user.click(link);

    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });

  it('should clicking triggers an additional API call to fetch detailed information', async () => {
    prepare();
    const mock = vi.spyOn(Api.prototype, 'getProductById');

    const user = userEvent.setup();
    const link = screen.getByRole('link');

    await user.click(link);
    await waitFor(() => screen.getByTestId('detail'));
    expect(mock).toBeCalled();
    expect(mock).toBeCalledTimes(1);
  });
});
