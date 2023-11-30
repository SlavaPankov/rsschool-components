import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../../types/interfaces/IFormData';

interface IFormDataState {
  data: IFormData[];
}

const initialState: IFormDataState = {
  data: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    appendData: (state, action: PayloadAction<IFormData>) => {
      state.data.unshift(action.payload);
    },
  },
});

export const { appendData } = formDataSlice.actions;
export default formDataSlice.reducer;
