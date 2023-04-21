import React, { useState } from "react";
import { IPropsRecharge } from "..";
import axios from "axios";
import PathLink from "../../../contants";
import ToastMessage from "../../../untils/ToastMessage";
import RenderCopyField from "../UI/RenderCopyField";
import CreatePaycode from "../UI/CreatePaycode";
import { randomCharacters } from "../../../untils";
import InputFeild from "../UI/InputFeild";
import * as Yup from "yup";
import { useFormik } from "formik";
const Wallet: React.FC<IPropsRecharge> = ({ username, idUser }) => {
  const [createCode, setCreateCode] = useState<string>("");
  const [payWallet, setPayWallet] = useState<string>("Momo Pay");
  const formik = useFormik({
    initialValues: {
      money: "",
    },
    validationSchema: Yup.object().shape({
      money: Yup.string()
        .required("Số tiền không được để trống !")
        .min(5, "Số tiền ít nhất là 10,000 đ")
        .matches(/^\d+$/, "Tiền phải là chữ số"),
    }),
    onSubmit(value) {
      console.log(value);
      axios
        .post(PathLink.domain + "topup", {
          method: "post",
          message: "Nạp tiền với " + payWallet,
          data: {
            username,
            idUser,
            status: 1,
            payCode: createCode,
            money: value.money.trim().replace(/ /g, ""),
            nameWallet: payWallet,
          },
        })
        .then((response) => {
          if (response.status == 201) {
            ToastMessage("Chờ hệ thống xử lý !").success();
          }
          formik.resetForm();
          setCreateCode("");
        });
    },
  });
  const HandleCreatePayCode = () => {
    ToastMessage("Tạo mã thanh  toán thành công").success();
    const setcode = randomCharacters(8);
    setCreateCode(setcode);
  };
  return (
    <>
      <section className="md:px-6">
        <div>
          <h2 className="text-base mb-2 font-bold">Ví điện tử: </h2>
          <select
            onChange={(e) => setPayWallet(e.target.value)}
            className="input__style--topup py-4 px-3 text-lg w-28 cursor-pointer text-text bg-black "
          >
            <option value="MoMo Pay">MOMO PAY</option>
            <option value="Zalo Pay">ZALO PAY</option>
          </select>
        </div>

        <RenderCopyField name="Số tài khoản 1" value="0325024277" />
        <RenderCopyField name="Số tài khoản 2" value="0877669990" />
        <RenderCopyField name="Tên tài khoản" value="Phạm Hoài Nam" />
      </section>
      <section className="flex flex-col md:items-start items-center mt-3">
        <img
          className="w-full max-w-[400px]"
          src="/images/banner_momo.png"
          alt=""
        />
        <h3 className="text-base mb-2 font-bold mt-2">Phương Thức:</h3>
        <strong className="text-primary text-2xl">Ví điện Tử</strong>
        <p className="mt-2 m-3">
          <strong className="text-red-500 text-lg">Chuyển tiền </strong>
          <span className="text-base">
            vào tài khoản bên cạnh với nội dung ghi chú:
          </span>
        </p>
        {!createCode ? (
          <button onClick={HandleCreatePayCode}>
            <img src="/images/btn_create.png" alt="" />
          </button>
        ) : (
          <div>
            <CreatePaycode setCreateCode={setCreateCode} payCode={createCode} />
            <form onSubmit={formik.handleSubmit} className="pt-2">
              <InputFeild
                name="Số tiền"
                placeHolder="Nhập số tiền..."
                nameFormik="money"
                value={formik.values.money}
                handleChange={formik.handleChange}
                message={formik.errors.money}
              />
              <button type="submit">
                <img src="/images/btn_topup.png" alt="" />
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default Wallet;
