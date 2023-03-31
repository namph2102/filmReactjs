import React from "react";
import { BiXCircle } from "react-icons/bi";
import { RiEyeFill, RiUserHeartLine } from "react-icons/ri";
import { defaultIconSize } from "../../contants";
import FireBaseMovie from "./FireBaseMovie";
import "./form.scss";
const LoginMovie = ({
  onHandleClose,
}: {
  onHandleClose: (isOpen: boolean) => void;
}) => {
  const username = localStorage.getItem("username") ?? "";
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
              Đăng Nhập
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="usernamelogin"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Tên tài khoản
                </label>
                <div className="form_input flex items-center text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    type="text"
                    name="usernamelogin"
                    id="usernamelogin"
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    value={username}
                    required
                  />
                  <button type="button" className="p-2">
                    <RiUserHeartLine size={defaultIconSize} />
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="passwordlogin"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Mật Khẩu
                </label>
                <div className="form_input flex items-center  text-black justify-between bg-gray-50 border border-gray-300 rounded-lg">
                  <input
                    type="password"
                    name="passwordlogin"
                    id="passwordlogin"
                    className="flex-1 py-3 px-2 border-0 outline-none text-sm"
                    required
                  />
                  <button type="button" className="p-2">
                    <RiEyeFill size={defaultIconSize} />
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
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng Nhập
              </button>
            </form>
            <FireBaseMovie />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginMovie;
