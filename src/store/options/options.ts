/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EOptions } from '../../types/enums/EOptions';

interface IOptionsState {
  page: number;
  limit: number;
  search: string;
}

const initialState: IOptionsState = {
  page:
    Number(new URLSearchParams(window.location.search).get(EOptions.page)) || 1,
  limit: Number(localStorage.getItem(EOptions.limit)) || 10,
  search: localStorage.getItem(EOptions.search) || '',
};

export const optionsSlice = createSlice({
  name: 'optionsSlice',
  initialState,
  reducers: {
    setPage: (state, payload: PayloadAction<number>) => {
      state.page = payload.payload;
    },

    setLimit: (state, payload: PayloadAction<number>) => {
      state.limit = payload.payload;
    },

    setSearchValue: (state, payload: PayloadAction<string>) => {
      state.search = payload.payload;
    },
  },
});

export const { setPage, setLimit, setSearchValue } = optionsSlice.actions;
export default optionsSlice.reducer;
