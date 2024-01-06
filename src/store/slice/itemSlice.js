import { createSlice } from "@reduxjs/toolkit";
import fetchItems from "../thunk/fetchItems";
import fetchContent from "../thunk/fetchContent";
import { setPath } from "./pathSlice";
import fetchLink from "../thunk/fetchLink";
import fetchThumbs from "../thunk/fetchThumbs";
import addFile from "../thunk/addFile";
import searchItem from "../thunk/searchitems";

const initialState = {
  items: [],
  filteredItems: [],
  thumbs: [],
  loading: false,
  upload: false,
  pendingID: '',
  errorAlert: '',
  errorPopUp: '',
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPending: (state, action) => {
      state.pendingID = action.payload
    },
    setUpload: (state) => {
      state.upload = !state.upload
    },
    clearFilteredItems: (state) => {
      state.filteredItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.errorAlert = "";
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.errorAlert = "";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.errorAlert = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.errorPopUp = action.payload;
      })
      .addCase(fetchLink.rejected, (state, action) => {
        state.errorPopUp = action.payload;
      })
      .addCase(fetchThumbs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThumbs.fulfilled, (state, action) => {
        state.thumbs = action.payload;
        state.loading = false;
      })
      .addCase(fetchThumbs.rejected, (state, action) => {
        state.errorPopUp = action.payload;
        state.loading = false;
      })
      .addCase(addFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredItems = action.payload;
      })
      .addCase(setPath, (state) => {
        state.errorAlert = "";
      })
  },
});

export default itemSlice.reducer;
export const {setPending, setUpload, clearFilteredItems, setLoading} = itemSlice.actions;