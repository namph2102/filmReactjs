import React from "react";
import { IPropsRecharge } from "..";
import ToastMessage from "../../../untils/ToastMessage";
import RenderCopyField from "../UI/RenderCopyField";
import { useFormik } from "formik";
import InputFeild from "../UI/InputFeild";
import * as Yup from "yup";
import axios from "axios";

import PathLink from "../../../contants";

const Banking: React.FC<IPropsRecharge> = ({ username, idUser }) => {
  const formik = useFormik({
    initialValues: {
      money: "",
      payCode: "",
      nameBank: "",
    },
    validationSchema: Yup.object().shape({
      money: Yup.string()
        .required("Số tiền không được để trống !")
        .min(5, "Số tiền ít nhất là 10,000 đ")
        .matches(/^\d+$/, "Tiền phải là chữ số"),
      payCode: Yup.string().required("Mã chuyển khoản không được để trống!"),
      nameBank: Yup.string().required("Ngân hàng không được để trống!"),
    }),
    onSubmit(value) {
      axios
        .post(PathLink.domain + "topup", {
          method: "post",
          message: "Nạp tiền với Ngân hàng",
          data: {
            username,
            idUser,
            status: 1,
            payCode: value.payCode.trim().replace(/ /g, ""),
            money: value.money.trim().replace(/ /g, ""),
            nameBank: value.nameBank.replace(/\s+/g, " ").trim(),
          },
        })
        .then((responsive: any) => {
          ToastMessage(
            `Bạn Đã nạp ${Number(formik.values.money.trim()).toLocaleString(
              "en-vi"
            )} VNĐ đang chờ xét duyệt!`
          ).success();

          formik.resetForm();
        });
    },
  });

  return (
    <>
      <div className="flex flex-col md:p-4">
        <p className="text-primary text-base">
          Khi chuyển khoản xong nhớ nhắn cho mình nha!
        </p>
        <a
          href="https://www.facebook.com/profile.php?id=100087004991368"
          target="_blank"
          className="my-3 block "
        >
          <img
            className="hover:scale-105 ease-in duration-100"
            src="/images/lienhe.png"
            width="200"
            alt=""
          />
        </a>
        <p className="w-full text-base mt-4 mb-1 font-bold">
          Chuyển khoản qua ngân hàng:
        </p>
        <input
          className="input__style--topup py-4 px-4  text-lg w-28 cursor-pointer text-text bg-black "
          defaultValue="AriBank"
          readOnly
        />
        <RenderCopyField name="Số Tài Khoản" value="5409205132543" />
        <RenderCopyField name="Tên Tài Khoản" value="Phạm Hoài Nam" />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="text-text flex flex-col items-center md:pl-8"
      >
        <p className="text-base  my-4 ">
          <strong className="text-primary "> Lưu ý:</strong>
          <span>Admin sẽ duyệt thẻ trong thời gian ngắn nhất !</span>
        </p>
        <InputFeild
          name="Tên ngân hàng"
          placeHolder="Nhập tên ngân hàng"
          nameFormik="nameBank"
          value={formik.values.nameBank}
          handleChange={formik.handleChange}
          message={formik.errors.nameBank}
        />
        <InputFeild
          name="Số tiền"
          placeHolder="Nhập số tiền"
          nameFormik="money"
          value={formik.values.money}
          handleChange={formik.handleChange}
          message={formik.errors.money}
        />
        <InputFeild
          name="Mã Giao Dịch"
          placeHolder="Nhập mã giao dịch"
          nameFormik="payCode"
          value={formik.values.payCode}
          handleChange={formik.handleChange}
          message={formik.errors.payCode}
        />
        <div className="text-center">
          <button
            onClick={() =>
              (!formik.values.money ||
                !formik.values.money ||
                !formik.values.money) &&
              ToastMessage("Vui lòng nhập đầy đủ dữ liệu!").info()
            }
            type="submit"
          >
            <img
              className="hover:scale-110 ease-in duration-200"
              src="/images/btn_topup.png"
              alt=""
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default Banking;
