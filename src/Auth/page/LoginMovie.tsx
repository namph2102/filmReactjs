import { useFormik } from "formik";
import { useState } from "react";
import { BiXCircle } from "react-icons/bi";
import { RiEyeCloseFill, RiEyeFill, RiUserHeartLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AppDispatch } from "../../Redux/Store";
import { defaultIconSize } from "../../contants";
import FireBaseMovie from "./FireBaseMovie";
import "./form.scss";
import { LoginForm } from "../../Redux/UserSlice";
import ToastMessage from "../../untils/ToastMessage";
const LoginMovie = ({
  onHandleClose,
  onShowFormRegister,
}: {
  onHandleClose: (isOpen: boolean) => void;
  onShowFormRegister: (isOpen: boolean) => void;
}) => {
  const username = localStorage.getItem("username") ?? "";
  const [seePassword, setSeePassWord] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const formik: any = useFormik({
    initialValues: {
      username: username,
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Trường tài khoản không được bỏ trống !"),
      password: Yup.string().required("Trường tài khoản không được bỏ trống !"),
    }),
    onSubmit(values) {
      dispatch(
        LoginForm({ username: values.username, password: values.password })
      )
        .then((response: any) => {
          if (response.status == 200) {
            ToastMessage(response.message).success();
            onHandleClose(false);
            formik.handleReset();
          } else {
            ToastMessage(response.message).warning();
            formik.values.password = "";
          }
        })
        .catch((err: any) => {
          ToastMessage(err.message).error();
          formik.handleReset();
        });
    },
  });

  return (
    <section className="form_login">
      <div className="flex sm:w-11/12 text-text w-full lg:w-1/2  flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full bg-content  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="lg:p-6 p-3 relative space-y-4 md:space-y-6 sm:p-8">
            <button
              type="button"
              onClick={() => {
                onHandleClose(false);
                formik.handleReset();
              }}
              className="absolute top-4 right-2"
            >
              <BiXCircle
                size="2.5rem"
                title="Đóng Cửa sổ"
                className="hover:text-blue-500"
              />
            </button>
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-text md:text-2xl dark:text-white">
              Đăng Nhập
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Tên tài khoản
                </label>
                <div className="form_input flex items-center text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    type="text"
                    name="username"
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    required
                  />
                  <button type="button" className="p-2">
                    <RiUserHeartLine size={defaultIconSize} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Mật Khẩu
                </label>
                <div className="form_input flex items-center  text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    type={seePassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setSeePassWord(!seePassword)}
                    className="p-2"
                  >
                    {seePassword ? (
                      <RiEyeFill size={defaultIconSize} />
                    ) : (
                      <RiEyeCloseFill size={defaultIconSize} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="loginremember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() => onShowFormRegister(false)}
                >
                  Đăng ký ngay?
                </button>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng Nhập
              </button>
            </form>
            <FireBaseMovie onHandleClose={onHandleClose} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginMovie;
