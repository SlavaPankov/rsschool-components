/* eslint-disable react/jsx-no-constructed-context-values */
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { DetailPage } from './DetailPage';
import { Api } from '../../api/Api';
import { IProduct } from '../../types/interfaces/IProduct';
import { MainPage } from '../MainPage';

function prepare() {
  const routes = [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/detail/:id',
      element: <DetailPage />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', `/detail/1`],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);
}

const product: IProduct = {
  id: 1,
  title: 'Test',
  description: 'Test card',
  price: 1000,
  discountPercentage: 900,
  rating: 5.0,
  stock: 11,
  brand: 'test brand',
  category: 'category',
  thumbnail: './src/image.png',
  images: [],
};

beforeAll(() => {
  window.scrollTo = () => vi.fn();
});

describe('Detail page', () => {
  it('should loading indicator is displayed while fetching data', async () => {
    vi.spyOn(Api.prototype, 'getProductById').mockImplementation(
      () =>
        new Promise<IProduct>((res) => {
          setTimeout(() => res(product), 200);
        })
    );
    prepare();

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
  });

  it('should the detailed card component correctly displays the detailed card data', async () => {
    vi.spyOn(Api.prototype, 'getProductById').mockImplementation(
      () =>
        new Promise<IProduct>((res) => {
          setTimeout(() => res(product), 200);
        })
    );
    prepare();

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      product.title
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnail);
    expect(screen.getByTestId('paragraph')).toHaveTextContent(
      product.description
    );
    expect(screen.getByTestId('price')).toHaveTextContent(`${product.price}`);
  });

  it('should clicking the close button hides the component', async () => {
    prepare();

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      product.title
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(screen.queryByText(product.title)).toBeNull();
  });
});
