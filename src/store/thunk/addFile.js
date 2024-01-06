import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const addFile = createAsyncThunk('items/addFile', async ({ path, contents}, {rejectWithValue}) => {
  try {
    await dbx.filesUpload({
      path,
      contents,
    })
    
    return 'File has successfully uploaded';
  } catch (error) {
    return rejectWithValue('Couldn`t add file');
  }
})

export default addFile;