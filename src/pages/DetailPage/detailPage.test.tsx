/* eslint-disable react/jsx-no-constructed-context-values */
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { DetailPage } from './DetailPage';
import { MainPage } from '../MainPage';
import { productMock } from '../../test/mocks/productMock';
import store from '../../store/store';

const prepare = (id = '1') => {
  const routes = [
    {
      path: '/',
      element: <MainPage />,
      children: [
        {
          path: '/detail/:id',
          element: <DetailPage />,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', `/detail/${id}`],
    initialIndex: 1,
  });

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

beforeAll(() => {
  window.scrollTo = () => vi.fn();
});

afterEach(() => {
  cleanup();
});

describe('Detail page', () => {
  it('should loading indicator is displayed while fetching data', async () => {
    const { getByTestId } = prepare();

    expect(
      within(getByTestId('detail')).getByText(/loading.../i)
    ).toBeInTheDocument();
    await waitFor(() =>
      within(getByTestId('detail')).getByRole('heading', { level: 2 })
    );
    expect(within(getByTestId('detail')).queryByText(/loading.../i)).toBeNull();
  });

  it('should the detailed card component correctly displays the detailed card data', async () => {
    prepare();

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      productMock.title
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      productMock.thumbnail
    );
    expect(screen.getByTestId('paragraph')).toHaveTextContent(
      productMock.description
    );
    expect(screen.getByTestId('price')).toHaveTextContent(
      `${productMock.price}`
    );
  });

  it('should clicking the close button hides the component', async () => {
    const { getByTestId } = prepare();

    await waitFor(() =>
      within(getByTestId('detail')).getByRole('heading', { level: 2 })
    );

    expect(
      within(getByTestId('detail')).getByRole('heading', { level: 2 })
    ).toHaveTextContent(productMock.title);

    const user = userEvent.setup();
    const button = within(getByTestId('detail')).getByRole('button', {
      name: /^cross/i,
    });

    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(screen.queryByTestId('detail')).toBeNull();
  });

  it('should clicking out of range hides the component', async () => {
    const { getByTestId } = prepare();
    const user = userEvent.setup();

    await waitFor(() =>
      within(getByTestId('detail')).getByRole('heading', { level: 2 })
    );

    await user.click(screen.getByRole('heading', { level: 1 }));
    expect(screen.queryByTestId('detail')).toBeNull();
  });

  it('should render no product', async () => {
    const { getByTestId } = prepare('asd');

    await waitFor(() =>
      expect(
        within(getByTestId('detail')).queryByText(/loading.../i)
      ).toBeNull()
    );

    expect(
      within(getByTestId('detail')).getByText(/Product not found/i)
    ).toBeInTheDocument();
  });
});
