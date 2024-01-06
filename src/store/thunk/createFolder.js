import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const createFolder = createAsyncThunk('items/createFolder', async ({path, name}, {rejectWithValue}) => {
  try {
    await dbx.filesCreateFolderV2({
      path: `${path}/${name}`,
    });

    return 'Folder has been created'
  } catch (error) {
    return rejectWithValue('Couldn`t create folder')
  }
})

export default createFolder