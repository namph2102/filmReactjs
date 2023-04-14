import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import PathLink from "../contants";
export interface Ifilm {
  _id: string | any;
  id: number;
  name: string;
  description: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  kind: string;
  category: string[];
  status: string;
  view: number;
  like: number;
  star: number;
  year: string;
  time: string;
  episode_current: number;
  eposode_total: number;
  lang: string;
  created_at: string;
  updated_at: string;
}
export interface IStateFilm {
  fimls: Ifilm[];
  filmsHome: Ifilm[];
  isLoading: boolean;
  status: string;
}
const FimlSliceImportant = createSlice({
  name: "film",
  initialState: {
    fimls: [],
    isLoading: true,
    status: "nothhings",
    filmsHome: [],
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
    builder.addCase(fetchDataFilm.pending, (state) => {
      state.status = "loading";
      state.isLoading = true;
    });
    builder.addCase(fetchDataFilm.fulfilled, (state, action) => {
      state.status = "success";
      state.filmsHome = action.payload.filmsHome;
      state.isLoading = false;
    });
    builder.addCase(fetchDataFilm.rejected, (state) => {
      state.status = "error";
      state.isLoading = true;
    });
  },
});

export const { uploadFimls } = FimlSliceImportant.actions;
export default FimlSliceImportant.reducer;
// thunk

export const fetchDataFilm = createAsyncThunk("film/featchfilm", async () => {
  try {
    const resHome = await axios.get(PathLink.domain + "api/v3/home");
    return { filmsHome: resHome.data.data };
  } catch {
    console.log("Lỗi lấy view home");
  }
  return { filmsHome: [] };
});

export const updateView = async (idFilm: string) => {
  try {
    const username = localStorage.getItem("username") || "";
    axios
      .post(PathLink.domain + "api/updateView", {
        method: "POST",
        data: {
          idFilm,
          username,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  } catch {}
};

export const updateLike = async (idFilm: string, username: string) => {
  try {
    await axios.post(PathLink.domain + "api/updateLike", {
      method: "POST",
      data: {
        idFilm,
        username,
      },
    });
  } catch {}
};
