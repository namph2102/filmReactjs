import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./Store";
import PathLink from "../contants";
import ToastMessage from "../untils/ToastMessage";
export interface IUser {
  _id: string;
  _uid: string;
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
interface TUserForm {
  username: string;
  password: string;
}
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: "",
      _uid: "",
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
    isLogout: false,
  },
  reducers: {
    updateUser(state, action) {
      if (action.payload.status === 200) {
        axios.create({
          baseURL: PathLink.domain,
          headers: {
            Authorization: "Bearer " + action.payload.data.accessToken,
          },
        });
        state.user = action.payload.data;
        localStorage.setItem("username", action.payload.data.username);
        localStorage.setItem(
          PathLink.nameToken,
          action.payload.data.accessToken
        );
      }
    },
    removeUser(state, action) {
      state.user = action.payload.setNull;
      state.isLogout = !state.isLogout;
    },
    updateFireBase(state, action) {
      state.isLogout = action.payload.isLogout;
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
export const CreateUser = (account: TUserForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(PathLink.domain + "user/register", {
        username: account.username,
        password: account.password,
      });

      return dispatch(UserSlice.actions.updateUser(res.data));
    } catch (err) {
      ToastMessage("Đăng ký không thành công!").error();
    }
  };
};
export const LoginForm = (account: TUserForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(PathLink.domain + "user/login", {
        method: "POST",
        notice: "Login new accoount when logout",
        account: account,
      });
      console.log(res.data.account);
      if (res.data.account) {
        dispatch(
          UserSlice.actions.updateUser({ status: 200, data: res.data.account })
        );
        return { message: res.data.message, status: 200 };
      }
      return { message: res.data.message, status: 203 };
    } catch {
      return { message: "Sorry? Lỗi hệ thống !", status: 404 };
    }
  };
};
export const loginWithFireBase = (account: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(PathLink.domain + "user/handlefirebase", {
        method: "POST",
        notice: "Firebase handle",
        account,
      });

      if (res.data.account) {
        dispatch(
          UserSlice.actions.updateUser({ status: 200, data: res.data.account })
        );
      }
      return res.data;
    } catch (err) {
      return { message: "Sorry? Lỗi hệ thống !", status: 404 };
    }
  };
};
