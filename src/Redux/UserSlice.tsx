import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./Store";
import PathLink from "../contants";
import ToastMessage from "../untils/ToastMessage";
interface IUser {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  avata: string;
  coin: number;
  description: string;
  vip: number;
  icons: any[];
  created_at: Number;
  updated_at: number;
}
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: "",
      username: "",
      password: "",
      fullname: "",
      avata: "",
      coin: 0,
      description: "",
      vip: 0,
      icons: [],
      created_at: 0,
      updated_at: 0,
    },
  },
  reducers: {
    updateUser(state, action) {
      if (action.payload.status === 200) state.user = action.payload.data;
    },
    removeUser(state, action) {
      state.user = action.payload.setNull;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(acctachkedAccount.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const account = action.payload.data;
        state.user = account;
        localStorage.setItem(PathLink.nameToken, account.accessToken);
      }
    });
  },
});
export const { removeUser } = UserSlice.actions;
export default UserSlice.reducer;
export const acctachkedAccount = createAsyncThunk(
  "user/firstLogin",
  async () => {
    const accessToken = localStorage.getItem(PathLink.nameToken);
    if (!accessToken) throw new Error("Not have actoken");
    try {
      const res = await axios.get(PathLink.domain + "user/login", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": PathLink.domain,
          Accept: "*/*",
        },
      });
      return res.data;
    } catch (error) {
      return {};
    }
  }
);
export const CreateUser = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(PathLink.domain + "user/register", {
        username,
        password,
      });

      return dispatch(UserSlice.actions.updateUser(res.data));
    } catch (err) {
      ToastMessage("Đăng ký không thành công!").error();
    }
  };
};
