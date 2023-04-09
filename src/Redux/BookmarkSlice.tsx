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
      if (index >= 0) {
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
        const lists: TBookmark[] = bookmarkLocal.get();
        if (lists.length > 0) {
          listBookmark = lists;
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
      dispatch(BookmarkSlice.actions.updateLisBookmark({ listBookmark }));
    } catch {}
  };
};

export const addBookmark = (item: TBookmark, username: string) => {
  return (dispatch: AppDispatch) => {
    try {
      if (username) {
        axios.post(PathLink.domain + "bookmark/addbookmark", {
          method: "post",
          data: {
            username: username,
            item,
          },
        });
      }

      dispatch(BookmarkSlice.actions.addBookmark({ item }));
    } catch {}
  };
};

export const deleteBookmark = (name: string, username: string) => {
  return (dispatch: AppDispatch) => {
    try {
      if (username) {
        axios.post(PathLink.domain + "bookmark/deletebookmark", {
          method: "post",
          data: {
            username: username,
            name,
          },
        });
      }
      dispatch(BookmarkSlice.actions.deleteBookmark({ name }));
      console.log("Xóa thành công");
    } catch {}
  };
};

export const deleAllBookmark = (username: string) => {
  return (dispatch: AppDispatch) => {
    try {
      if (username) {
        axios.post(PathLink.domain + "bookmark/deleteallbookmark", {
          method: "post",
          data: {
            username: username,
          },
        });
      }
      localStorage.removeItem("bookmarkLocal");
      dispatch(BookmarkSlice.actions.updateLisBookmark({ listBookmark: [] }));
    } catch {}
  };
};
