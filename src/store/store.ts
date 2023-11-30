import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products/products';
import countriesSlice from './countries/countriesSlice';

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    countries: countriesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
