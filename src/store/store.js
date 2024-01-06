import {configureStore} from '@reduxjs/toolkit';
import pathReducer from './slice/pathSlice';
import itemReducer from './slice/itemSlice';
import filterReducer from './slice/filterSlice';

const store = configureStore({
  reducer: {
    path: pathReducer,
    items: itemReducer,
    filters: filterReducer,
  } 
})

export default store;