import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const fetchLink = createAsyncThunk('items/fetchLink', async ({path}, {rejectWithValue} ) => {
  try {
    let validLink = '';
    const responseLinks = await dbx.sharingListSharedLinks({path})

    if(!responseLinks.result.links.length) {
      const responseCreate = await dbx.sharingCreateSharedLinkWithSettings({path})
      validLink = responseCreate.result.url;
    } else {
      validLink = responseLinks.result.links[0].url;
    }
    
    if(validLink) {
      window.open(validLink, '_blank');
    }
  } catch (error) {
    return rejectWithValue('Couldn`t view the file');
  }
});

export default fetchLink;