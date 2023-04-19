import React from "react";

import InputItem from "./InputItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ToastMessage from "../../untils/ToastMessage";
import axios from "axios";
import PathLink from "../../contants";
const PasswordChange = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required("Trường mật khẩu cũ không được để trống!")
        .trim(),
      newPassword: Yup.string()
        .required("Trường mật khẩu mới không được để trống!")
        .min(5, "Mật khẩu ít nhất 5 kí tự!")
        .max(40, "Không vượt quá 40 kí tự!")
        .trim(),
      confirmPassword: Yup.string()
        .required("Trường nhập lại mật khẩu mới không được để trống!")
        .oneOf([Yup.ref("newPassword")], "Mật khẩu chưa khớp nhau!")
        .trim(),
    }),
    onSubmit(value) {
      let { oldPassword, newPassword } = value;
      oldPassword = oldPassword.trim();
      newPassword = newPassword.trim();

      if (oldPassword == newPassword) {
        ToastMessage("Mật khẩu mới phải khác mật khẩu cũ !").warning();

        return;
      }
      axios
        .post(PathLink.domain + "user/changePassword", {
          medthod: "post",
          message: "Change password",
          data: {
            _id: account._id,
            username: account.username,
            oldPassword: value.oldPassword,
            newPassword: value.newPassword,
          },
        })
        .then((res) => {
          ToastMessage(res.data.message).success();
          formik.resetForm();
        })
        .catch((err) => {
          ToastMessage(err.response?.data.message).warning();
        });
    },
  });

  const handleCheckUser = () => {
    if (!account._id) {
      ToastMessage("Bạn cần đăng nhập để thực hiên chức năng này !").info();
    }
  };
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="title_special self-start">Thay đổi mật khẩu</h2>
      <form onSubmit={formik.handleSubmit} className="sm:max-w-[400px] w-full">
        <InputItem
          nameFormik="oldPassword"
          name="Mật khẩu cũ"
          value={formik.values.oldPassword}
          handleChange={formik.handleChange}
          message={formik.errors.oldPassword}
        />
        <InputItem
          nameFormik="newPassword"
          name="Mật khẩu mới"
          value={formik.values.newPassword}
          handleChange={formik.handleChange}
          message={formik.errors.newPassword}
        />
        <InputItem
          nameFormik="confirmPassword"
          name="Nhập lại mật khẩu mới"
          value={formik.values.confirmPassword}
          handleChange={formik.handleChange}
          message={formik.errors.confirmPassword}
        />
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 py-3 px-2 rounded-lg text-white my-3"
            onClick={handleCheckUser}
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </section>
  );
};

export default PasswordChange;
