/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOptions {
  page: number;
  countPerPage: number;
  searchValue: string;
}

interface IOptionsState {
  store: IOptions;
}

const initialState: IOptionsState = {
  store: {
    page: 1,
    countPerPage: 10,
    searchValue: '',
  },
};

export const optionsSlice = createSlice({
  name: 'optionsSlice',
  initialState,
  reducers: {
    setPage: ({ store }, payload: PayloadAction<number>) => {
      store.page = payload.payload;
    },

    setCountPerPage: ({ store }, payload: PayloadAction<number>) => {
      store.countPerPage = payload.payload;
    },

    setSearchValue: ({ store }, payload: PayloadAction<string>) => {
      store.searchValue = payload.payload;
    },
  },
});

export const { setPage, setCountPerPage } = optionsSlice.actions;
export default optionsSlice.reducer;
