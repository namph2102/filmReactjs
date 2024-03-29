import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./Store";
import PathLink from "../contants";
import ToastMessage from "../untils/ToastMessage";
export interface IUser {
  _id: string;
  _uid: string;
  username: string;
  fullname: string;
  avata: string;
  coin: number;
  description: string;
  phone: number;
  vip: number;
  expLv: number;
  expVip: number;
  blocked: boolean;
  icons: any[];
  created_at?: Number;
  updated_at?: number;
  permission: string;
  accessToken: string;
  chatLength: number;
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
      fullname: "",
      avata: "",
      coin: 0,
      expLv: 0,
      expVip: 0,
      description: "",
      vip: 0,
      blocked: false,
      phone: 0,
      icons: [],
      createdAt: 0,
      updatedAt: 0,
      accessToken: "",
      created_at: 0,
      updated_at: 0,
      permission: "",
      chatLength: 40,
    },
    isLogout: false,
  },
  reducers: {
    updateUser(state, action) {
      const account = action.payload.data;
      if (action.payload.status === 200) {
        axios.defaults.headers.common["Authorization"] = account.accessToken;
        if (account.permission == "admin") {
          account.chatLength = 2000;
        } else if (account.permission === "vip") {
          account.chatLength = 80 * account.vip;
        } else account.chatLength = 40;
        state.user = account;
        localStorage.setItem("username", account.username);
        localStorage.setItem(PathLink.nameToken, account.accessToken);
      }
    },
    updateAvata(state, action) {
      if (action.payload.avata) {
        state.user.avata = action.payload.avata;
      }
    },
    updateAccount(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    removeUser(state, action) {
      state.user = action.payload.setNull;
      state.isLogout = true;
    },
    updateFireBase(state, action) {
      state.isLogout = action.payload.isLogout;
    },
    updateToken(state, action) {
      state.user.accessToken = action.payload.accessToken;
      console.log("Upload token thành công");
      axios.defaults.headers.common["Authorization"] =
        action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(acctachkedAccount.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const account = action.payload.data;
        // độ dài khung chat

        if (account.permission == "admin") {
          account.chatLength = 2000;
        } else if (account.permission === "vip") {
          account.chatLength = 80 * account.vip;
        } else account.chatLength = 40;

        state.user = account;
        localStorage.setItem(PathLink.nameToken, account.accessToken);
      }
    });
    builder.addCase(updateProfileUser.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
    });
  },
});
export const { removeUser, updateAvata, updateAccount } = UserSlice.actions;
export default UserSlice.reducer;
export const acctachkedAccount = createAsyncThunk(
  "user/firstLogin",
  async () => {
    const accessToken = localStorage.getItem(PathLink.nameToken) || "";
    if (!accessToken) throw new Error("Not have actoken");
    try {
      axios.defaults.headers.common["Authorization"] = accessToken;
      const res = await axios.get(PathLink.domain + "user/login");
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
      localStorage.clear();
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
      if (res.data.account) {
        localStorage.clear();
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

      if (res.data.status != 200) {
        throw new Error(res.data.message);
      }
      localStorage.clear();
      dispatch(UserSlice.actions.updateUser(res.data));
      return res.data;
    } catch (err: any) {
      return { message: err?.message || "Lỗi hệ thống", status: 404 };
    }
  };
};
export const updateProfileUser = createAsyncThunk(
  "user/updateprofile",
  async (data: {
    _id: string;
    description: string;
    fullname: string;
    phone: number | string;
    username: string;
  }) => {
    try {
      const responsive = await axios.post(
        PathLink.domain + "user/updateProfile",
        {
          method: "post",
          data,
        }
      );
      return responsive.data.account;
    } catch (err) {
      ToastMessage("Lỗi gì đó rồi bạn ơi !").warning();
    }
  }
);
