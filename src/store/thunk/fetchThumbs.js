import { createAsyncThunk } from "@reduxjs/toolkit";
import dbx from "../../api/api";

const validExtensions = ['jpg', 'jpeg', 'png', 'tiff', 'tif', 'gif', 'webp', 'ppm', 'bmp'];

const fetchThumbs = createAsyncThunk('items/fetchThumbs', async ({items}, {rejectWithValue}) => {
  try {
    const validItems = [...items].filter(item => {
      const parts = item.name.split('.');
      return item['.tag'] === 'file' && validExtensions.includes(parts[parts.length - 1]);
    })
    
    const response = await dbx.filesGetThumbnailBatch({
      entries: [...validItems.map(element => ({path: element['path_lower']}))],
    })
  
    return response.result.entries.map(entry => ({
      id: entry.metadata.id,
      thumbnail: `data:image/jpeg;base64, ${entry.thumbnail}`,
    }))
  } catch (error) {
    return rejectWithValue('Couldn`t fetch all thumbnails')
  }
});

export default fetchThumbs;