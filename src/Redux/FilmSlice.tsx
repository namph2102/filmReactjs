import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./Store";
import axios from "axios";
export interface Ifilm {
  id: number;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  kind: string;
  category: string;
  type: string;
  status: string;
  view: string;
  year: string;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  date: string;
}
export interface IStateFilm {
  fimls: Ifilm[];
  isLoading: boolean;
  status: string;
}
const FimlSlice = createSlice({
  name: "film",
  initialState: {
    fimls: [],
    isLoading: true,
    status: "nothhings",
  } as IStateFilm,
  reducers: {
    uploadFimls(state, action) {
      state.fimls = action.payload.fimls;
    },

    upLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataFilm.pending, (state, action) => {
      state.status = "loading";
      state.isLoading = true;
    });
    builder.addCase(fetchDataFilm.fulfilled, (state, action) => {
      state.status = "success";
      state.fimls = action.payload.films;
      state.isLoading = false;
    });
    builder.addCase(fetchDataFilm.rejected, (state, action) => {
      state.status = "error";
      state.isLoading = true;
    });
  },
});

export const { uploadFimls } = FimlSlice.actions;
export default FimlSlice.reducer;
// thunk

export const fetchDataFilm = createAsyncThunk("film/featchfilm", async () => {
  const res = await axios.get("http://localhost:3000/api/v2");
  return { films: res.data.data };
});
