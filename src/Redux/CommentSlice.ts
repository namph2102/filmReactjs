import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PathLink from "../contants";
import { TpropComment } from "../contants";

type TCommetSlice = {
  isloading: boolean;
  listMainComment: TpropComment[];
  idFilm: string;
  limit: number;
  count: number;
  totalHeader: number;
  isComment: boolean;
};
const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    isComment: false,
    idFilm: "0",
    limit: 15,
    count: 0,
    listMainComment: [],
    isloading: false,
    totalHeader: 0,
  } as TCommetSlice,
  reducers: {
    // When click new film handle but now dont have handle
    updateIdFim(state, action) {
      if (action.payload.idFilm) {
        state.limit = 15;
        state.isComment = true;
        state.idFilm = action.payload.idFilm;
      }
    },
    updateStatusShowComment(state, action) {
      state.isComment = action.payload.isShow;
    },
    updateLimit(state) {
      if (state.limit > state.count) state.limit = state.count;
      else state.limit += 15;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetListComments.fulfilled, (state, action) => {
      state.listMainComment = action.payload.comments;
      state.count = action.payload.count;
      state.totalHeader = action.payload.allCommemtFilm;
    });
  },
});
export const { updateLimit, updateStatusShowComment, updateIdFim } =
  CommentSlice.actions;
export default CommentSlice.reducer;
export interface IApiSendDataComment {
  subcomment: string | number;
  id_user: string;
  comment: string;
  id_film: string | number;
}
// method post
export const PostAddComemt = createAsyncThunk(
  "comment/comments/add",

  async (apiComment: IApiSendDataComment, getSate) => {
    const res = await axios.post(PathLink.domain + "comments/addcommemt", {
      method: "POST",
      data: apiComment,
    });
    return { data: res.data.data };
  }
);
// method post to get subcomment
type payload = {
  id_parent: number;
  subcomment: number[] | any;
};
export const GetListComments = createAsyncThunk(
  "comments/list",
  async ({ idFilm, limit }: { idFilm: string; limit: number }) => {
    try {
      const res = await axios.post(PathLink.domain + "comments/list", {
        method: "POST",
        idFilm,
        limit,
      });
      // console.log(res.data);
      return {
        comments: res.data.data,
        count: res.data.total_commemt,
        allCommemtFilm: res.data.allCommemtFilm,
        status: 200,
      };
    } catch {
      return { status: 404, count: 0, comments: [] };
    }
  }
);

export const GetSubcommentComment = (payload: payload) => {
  return async () => {
    if (!payload.subcomment.length) return;
    try {
      const res = await axios.post(PathLink.domain + "comments/subcomment", {
        method: "POST",
        data: {
          id_parent: payload.id_parent,
          subcomment: payload.subcomment,
        },
        headers: {
          Authorization: "Bearer " + "dasdsasasasasasasasasasasa",
        },
      });

      return res.data.data;
    } catch {
      return { message: "Không tìm  thấy" };
    }
  };
};

export const GetHandleLikeCopmment = (commemt: {
  id_comment: string;
  crease: number;
}) => {
  return async () => {
    return await axios.post(PathLink.domain + "comments/addlike", {
      method: "POST",
      data: { id_comment: commemt.id_comment, crease: commemt.crease },
    });
  };
};

export const getlengthComment = (idFilm: string) => {
  return async () => {
    try {
      const res = await axios.post(PathLink.domain + "comments/getlength", {
        method: "POST",
        idFilm,
      });
      return { message: res.data.message, length: res.data.data, status: 200 };
    } catch (message) {
      return { status: 404 };
    }
  };
};
