import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { Api } from './Api';
import { handlers } from '../test/mocks/handlers';
import { productMock } from '../test/mocks/productMock';
import { responseMock } from '../test/mocks/responseMock';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('Api test', () => {
  const api = new Api();

  it('should return one element', async () => {
    const response = await api.getProductById('1');

    expect(response).toEqual(productMock);
  });

  it('should return null', async () => {
    const response = await api.getProductById('asd');

    expect(response).toBe(null);
  });

  it('should return api response', async () => {
    const response = await api.search('');

    expect(response).toEqual(responseMock);
  });
});
