import { createSlice } from "@reduxjs/toolkit";
const initialState = '';

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action) => {
      return action.payload;
    },
    clearPath: () => {
      return '';
    }
  },
})

export default pathSlice.reducer;
export const { setPath } = pathSlice.actions;