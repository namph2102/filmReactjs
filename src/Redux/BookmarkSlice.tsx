import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PathLink from "../contants";
import { bookmarkLocal } from "../untils/localStorage";
import { AppDispatch } from "./Store";
export interface TBookmark {
  name: string;
  avata: string;
  slug: string;
  time: string;
}
const BookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    listfilm: [],
    loading: false,
  } as { listfilm: TBookmark[]; loading: boolean },
  reducers: {
    updateLisBookmark(state, action) {
      state.listfilm = action.payload.listBookmark;
    },
    addBookmark(state, action) {
      state.listfilm.push(action.payload.item);
    },
    deleteBookmark(state, action) {
      const index = state.listfilm.findIndex(
        (film) => film.name == action.payload.name
      );
      if (index !== -1) {
        state.listfilm.splice(index, 1);
      }
    },
  },
});

export default BookmarkSlice.reducer;

export const getListBookmarks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const username = localStorage.getItem("username") ?? "";
      let listBookmark = [];
      if (!username) {
        const lists = bookmarkLocal.get();
        if (lists.length > 0) {
          listBookmark = bookmarkLocal
            .get()
            .map((bk: { key: string; value: TBookmark }) => bk.value);
        }
      } else {
        const response = await axios.post(PathLink.domain + "bookmark", {
          data: {
            username,
          },
        });
        listBookmark = response.data.listBookMark;
        console.log(listBookmark);
      }
      if (listBookmark.length > 0) {
        dispatch(BookmarkSlice.actions.updateLisBookmark({ listBookmark }));
      }
    } catch {}
  };
};
