import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../../types/interfaces/IResponse';

interface IRequest {
  search: string;
  skip?: number;
  limit?: number;
}

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IResponse, IRequest>({
      query: ({ search, skip = 0, limit = 10 }) =>
        `/?q=${search}&skip=${skip}&limit=${limit}`,
    }),
    getProduct: builder.query<IResponse, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
