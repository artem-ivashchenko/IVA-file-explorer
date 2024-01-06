import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const deleteItem = createAsyncThunk('items/deleteItem', async ({ path}, {rejectWithValue}) => {
  try {
    await dbx.filesDeleteV2({
      path,
    })

    return 'Item has been deleted';
  } catch (error) {
    return rejectWithValue('Couldn`t delete the file');
  }
})

export default deleteItem;