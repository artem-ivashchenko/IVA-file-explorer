import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const searchItem = createAsyncThunk('items/search', async ({ query }) => {
  try {
    const response = await dbx.filesSearchV2({
      query,
    })
    
    const result = response.result.matches.map(match => {
      const item = match.metadata.metadata;
      const { sharing_info, file_owner_team_encrypted_id, ...rest } = item;
      return rest;
    })

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
})

export default searchItem;