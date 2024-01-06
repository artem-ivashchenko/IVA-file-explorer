import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";
import { saveAs } from 'file-saver'; 

const fetchContent = createAsyncThunk('items/download', async ({path, type}, {rejectWithValue}) => {
  try {
    if(!path) {
      return rejectWithValue('You cannot download the root folder');
    }

    if(type === 'folder') {
      const response = await dbx.filesDownloadZip({ path });
      saveAs(response.result.fileBlob, response.result.metadata.name)
    } else if (type === 'file'){
      const response = await dbx.filesDownload({ path });
      saveAs(response.result.fileBlob, response.result.name)
    } else {
      throw new Error('Missing type');
    }
  } catch (error) {
    if(error.status === 409) {
      return rejectWithValue('Path of the downloading link is wrong');
    }
    return rejectWithValue('Downloading went wrong');
  }
});

export default fetchContent;