/* eslint-disable react/jsx-no-constructed-context-values */
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { ResultsList } from './ResultsList';
import { handlers } from '../../test/mocks/handlers';
import store from '../../store/store';
import { productsApi } from '../../store/products/products';
import { emptyResponseMock } from '../../test/mocks/responseMock';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
  store.dispatch(productsApi.util?.resetApiState());
});
afterAll(() => server.close());

const wrapper = () => {
  return render(
    <Provider store={store}>
      <ResultsList />
    </Provider>,
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

  it('should render loading indicator', async () => {
    wrapper();

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    await waitFor(() => screen.getByRole('list'));
    expect(screen.queryByText(/loading.../i)).toBeNull();
  });

  it('should render empty message', async () => {
    server.use(
      http.get('https://dummyjson.com/products/search', () => {
        return HttpResponse.json(emptyResponseMock);
      })
    );

    const { getByText } = wrapper();

    await waitFor(() => getByText(/^No results/));
    expect(getByText(/^No results/)).toHaveTextContent('No results');
  });
});
