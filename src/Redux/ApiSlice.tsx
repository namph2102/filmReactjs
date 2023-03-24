import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface IApiFilm {
  id: number;
  name: string;
  origin_name: string;
  slug: string;
  episode_current: number;
  lang: string;
  thumb_url: string;
  poster_url: string;
  view: number;
}
interface IApiStateInit {
  series: IApiFilm[] | any;
  feature: IApiFilm[] | any;
  listFilmUpdate: IApiFilm[] | any;
  status: string;
}
const ApiSlice = createSlice({
  name: "apiget",
  initialState: {
    series: [],
    feature: [],
    listFilmUpdate: [],
    status: "nothings",
  } as IApiStateInit,
  reducers: {},
});
export default ApiSlice.reducer;
