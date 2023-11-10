/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import { productMock } from './productMock';
import { responseMock } from './responseMock';

export const handlers = [
  http.get('https://dummyjson.com/products/search', ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get('q');

    if (search && search === 'fail') {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(responseMock);
  }),
  http.get('https://dummyjson.com/products/:id', ({ params }) => {
    if (
      !params.id ||
      Number.isNaN(Number(params.id)) ||
      Number(params.id) === 0
    ) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(productMock);
  }),
];
