import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IResponse } from '@/types/interfaces/IResponse';
import { IProduct } from '@/types/interfaces/IProduct';

interface IRequest {
  search: string;
  page?: number;
  limit?: number;
}

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getProducts: builder.query<IResponse, IRequest>({
      query: ({ search, page = 1, limit = 10 }) =>
        `/search?q=${search}&skip=${(page - 1) * limit}&limit=${limit}`,
    }),
    getProduct: builder.query<IProduct, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
export const {
  util: { getRunningQueriesThunk },
} = productsApi;
