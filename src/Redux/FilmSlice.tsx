import { createSlice } from "@reduxjs/toolkit";

export interface Ifilm {
  id: number;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
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
interface initialState {
  films: Ifilm[];
  isLoading: boolean;
}
const FimlSlice = createSlice({
  name: "film",
  initialState: {
    fimls: [],
    isLoading: false,
  },
  reducers: {
    uploadFimls(state, action) {
      state.fimls = action.payload.fimls;
    },
  },
});

export const { uploadFimls } = FimlSlice.actions;
export default FimlSlice.reducer;
