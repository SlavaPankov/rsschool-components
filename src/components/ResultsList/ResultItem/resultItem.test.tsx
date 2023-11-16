/* eslint-disable react/jsx-no-constructed-context-values */
import { afterEach, beforeAll, describe, vi, expect, it } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ResultItem } from './ResultItem';
import { Content } from '../../Content';
import { DetailPage } from '../../../pages/DetailPage';
import { productMock } from '../../../test/mocks/productMock';
import store from '../../../store/store';

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  window.scrollTo = () => vi.fn();
});

function prepare() {
  const routes = [
    {
      path: '/',
      element: (
        <Provider store={store}>
          <Content />
        </Provider>
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

    await waitFor(() => screen.getAllByRole('link'));
    const link = screen.getAllByRole('link')[1];
    await user.click(link);

    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });

  it('should clicking triggers an additional API call to fetch detailed information', async () => {
    prepare();
    const user = userEvent.setup();
    await waitFor(() => screen.getAllByRole('link'));
    const link = screen.getAllByRole('link')[1];

    await user.click(link);
    await waitFor(() => screen.getByTestId('detail'));
    const detailHeading = await screen.findByRole('heading', { level: 2 });

    expect(detailHeading).toBeInTheDocument();
  });
});
