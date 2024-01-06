import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  preview: 'icons',
  type: 'foldersFirst',
  query: '',
  sortField: {
    name: 'type',
    value: 'foldersFirst'
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  }
})

export default filterSlice.reducer;
export const {setSortField,setPreview,setType,setQuery} = filterSlice.actions;