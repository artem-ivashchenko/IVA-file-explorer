import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const fetchItems = createAsyncThunk('items/fetch', async (path, {rejectWithValue}) => {
  try {
    const response = await dbx.filesListFolder({ path });
    return response.result.entries;
  } catch (error) {
    if(error.status === 400) {
      return rejectWithValue('There is something wrong with the request structure');
    }
    if(error.status === 401) {
      return rejectWithValue('Please, check the validity of your access token (Click info button)');
    }
  }
});

export default fetchItems;