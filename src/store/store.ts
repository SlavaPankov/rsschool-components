import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products/products';
import { optionsSlice } from './options/options';

const store = configureStore({
  reducer: {
    options: optionsSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
