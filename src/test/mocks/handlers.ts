/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import { productMock } from './productMock';

export const handlers = [
  http.get('https://dummyjson.com/products/search', () => {
    return HttpResponse.json({
      products: Array(3)
        .fill(productMock)
        .map((item, index) => ({ ...item, id: index })),
      isLoading: false,
      isPagination: false,
      total: 1,
    });
  }),
];
