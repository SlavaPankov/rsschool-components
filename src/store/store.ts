import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from './countries/countriesSlice';
import formDataSlice from './formData/formData';

const store = configureStore({
  reducer: {
    countries: countriesSlice,
    formData: formDataSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
