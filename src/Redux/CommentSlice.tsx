import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PathLink from "../contants";
import { TpropComment } from "../contants";
type TCommetSlice = {
  isloading: boolean;
  listSubcomment: TpropComment[];
};
const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    isloading: true,
  } as TCommetSlice,
  reducers: {},
  extraReducers: (build) => {},
});

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
  async (apiComment: IApiSendDataComment) => {
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
export const GetListComments = (idFilm: number = 0) => {
  return async () => {
    try {
      const res = await axios.post(PathLink.domain + "comments/list", {
        method: "POST",
        idFilm,
      });
      return { comments: res.data.data, status: 200 };
    } catch {
      return { state: 404, comments: [] };
    }
  };
};
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

export const getlengthComment = (idFilm: number) => {
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
