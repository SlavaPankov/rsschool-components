import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  accept: string;
  image: string;
  country: string;
}

interface IFormDataState {
  data: IData[];
}

const initialState: IFormDataState = {
  data: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    appendData: (state, action: PayloadAction<IData>) => {
      state.data.unshift(action.payload);
    },
  },
});

export const { appendData } = formDataSlice.actions;
export default formDataSlice.reducer;
