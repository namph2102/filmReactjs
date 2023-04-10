import React, { useState } from "react";
import "./form.scss";
import { BiXCircle } from "react-icons/bi";
import FireBaseMovie from "./FireBaseMovie";
import { RiEyeCloseFill, RiEyeFill, RiUserHeartLine } from "react-icons/ri";
import { defaultIconSize } from "../../contants";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastMessage from "../../untils/ToastMessage";
import { useDispatch } from "react-redux";
import { CreateUser } from "../../Redux/UserSlice";
import { AppDispatch } from "../../Redux/Store";
import PathLink from "../../contants";
import axios from "axios";
import { getListBookmarks } from "../../Redux/BookmarkSlice";
const RegisterMovie = ({
  onHandleClose,
  onShowFormRegister,
}: {
  onHandleClose: (isOpen: boolean) => void;
  onShowFormRegister: (isOpen: boolean) => void;
}) => {
  const [seeEyesP, setEyesP] = useState<boolean>(false);
  const [seeEyesRP, setEyesRP] = useState<boolean>(false);
  const [IsChecked, setIsChecked] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const formik: any = useFormik({
    initialValues: {
      username: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Trường tài khoản không được bỏ trống")
        .min(5, "Ít nhất 5 ký tự !")
        .max(40, "Không vượt quá 40 ký tự"),
      password: Yup.string()
        .required("Trường mật khẩu không được bỏ trống")
        .min(5, "Ít nhất 5 ký tự !")
        .max(40, "Không vượt quá 40 ký tự"),
      repassword: Yup.string()
        .required("Trường nhập lại mật khẩu không được bỏ trống")
        .max(40, "Không vượt quá 40 ký tự")
        .oneOf([Yup.ref("password")], "Trường mật khẩu không khớp nhau"),
    }),
    onSubmit(values: any) {
      let { username, password, repassword } = values;
      password = password.trim();
      repassword = password.trim();
      username = username.trim();
      dispatch(CreateUser({ username, password })).then((state) => {
        if (state?.payload.status === 200) {
          localStorage.setItem(
            PathLink.nameToken,
            state?.payload.data.accessToken
          );
          axios.defaults.headers.common = state?.payload.data.accessToken;
          localStorage.setItem(
            PathLink.localusername,
            state?.payload.data.username
          );
          ToastMessage(state?.payload.message).success();
          formik.handleReset();
          dispatch(getListBookmarks());
          onHandleClose(false);
        } else {
          ToastMessage(state?.payload.message).warning();
        }
      });
    },
  });
  const handleBlur = (key: string) => {
    if (formik.errors[key]) ToastMessage(formik.errors[key]).warning();
  };
  const HandleConfirmPassword = () => {
    if (formik.values.password !== formik.values.repassword) {
      ToastMessage(formik.errors.repassword).error();
    }
  };
  return (
    <section className="form_login">
      <div className="flex sm:w-11/12 text-text w-full lg:w-1/2  flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full bg-content  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="lg:p-6 p-3 relative space-y-4 md:space-y-6 sm:p-8">
            <button
              type="button"
              onClick={() => onHandleClose(false)}
              className="absolute top-4 right-2"
            >
              <BiXCircle
                size="2.5rem"
                title="Đóng Cửa sổ"
                className="hover:text-blue-500"
              />
            </button>
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-text md:text-2xl dark:text-white">
              Đăng Ký
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Tài khoản
                </label>
                <div className="form_input flex items-center text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    type="text"
                    name="username"
                    id="username"
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    placeholder="Nhập tài khoản của bạn ..."
                    onBlur={() => handleBlur("username")}
                    required
                  />
                  <button type="button" disabled={true} className="p-2">
                    {" "}
                    <RiUserHeartLine size={defaultIconSize} />
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Mật Khẩu
                </label>
                <div className="form_input flex items-center text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type={seeEyesP ? "text" : "password"}
                    name="password"
                    id="password"
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    placeholder="*******"
                    onBlur={() => handleBlur("password")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setEyesP(!seeEyesP)}
                    className="p-2"
                  >
                    {" "}
                    {!seeEyesP ? (
                      <RiEyeCloseFill size={defaultIconSize} />
                    ) : (
                      <RiEyeFill size={defaultIconSize} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="repassword"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Nhập lại mật khẩu
                </label>
                <div className="form_input flex items-center text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    value={formik.values.repassword}
                    onChange={formik.handleChange}
                    type={seeEyesRP ? "text" : "password"}
                    name="repassword"
                    id="repassword"
                    onBlur={() => handleBlur("repassword")}
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    placeholder="*******"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setEyesRP(!seeEyesRP)}
                    className="p-2"
                  >
                    {" "}
                    {!seeEyesRP ? (
                      <RiEyeCloseFill size={defaultIconSize} />
                    ) : (
                      <RiEyeFill size={defaultIconSize} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      onChange={() => setIsChecked(!IsChecked)}
                      className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onShowFormRegister(true)}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Đã có tài khoản ?
                </button>
              </div>
              <button
                type="submit"
                onClick={HandleConfirmPassword}
                className="w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng ký ngay
              </button>
            </form>
            <FireBaseMovie onHandleClose={onHandleClose} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterMovie;
