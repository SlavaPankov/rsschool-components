/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface IOptionsState {
  page: number;
  limit: number;
  search: string;
  isProductsLoading: boolean;
  isProductLoading: boolean;
}

const initialState: IOptionsState = {
  page: 1,
  limit: 10,
  search: '',
  isProductsLoading: false,
  isProductLoading: false,
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setIsProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.isProductsLoading = action.payload;
    },

    setIsProductLoading: (state, action: PayloadAction<boolean>) => {
      state.isProductLoading = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<IOptionsState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setPage,
  setLimit,
  setSearchValue,
  setIsProductsLoading,
  setIsProductLoading,
} = optionsSlice.actions;
export default optionsSlice.reducer;
