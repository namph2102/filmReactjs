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
const CodePayContainer: React.FC<IPropsRecharge> = ({ username, idUser }) => {
  const [createCode, setCreateCode] = useState<string>("");
  const [nameBank, setNameBank] = useState<string>("AriBank");
  const formik = useFormik({
    initialValues: {
      money: "",
    },
    validationSchema: Yup.object().shape({
      money: Yup.string()
        .required("Số tiền không được để trống !")
        .min(5, "Số tiền ít nhất là 10,000 đ")
        .matches(/^\d+$/, "Tiền phải là chữ số !"),
    }),
    onSubmit(value) {
      console.log(value);
      axios
        .post(PathLink.domain + "topup", {
          method: "post",
          message: "Nạp tiền với " + nameBank,
          data: {
            username,
            idUser,
            status: 1,
            payCode: createCode,
            money: value.money.trim().replace(/ /g, ""),
            nameBank,
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
          <h2 className="text-base mb-2 font-bold">Tên ngân hàng: </h2>
          <select
            onChange={(e) => setNameBank(e.target.value)}
            className="input__style--topup py-4 px-3 text-lg w-28 cursor-pointer text-text bg-black "
          >
            <option value="AriBank">AriBank</option>
            <option value="Vietcombank">Vietcombank</option>
          </select>
        </div>

        <RenderCopyField name="Số tài khoản" value="6150021022002" />
        <RenderCopyField name="Tên tài khoản" value="Phạm Hoài Nam" />
        <RenderCopyField name="Số điện thoại" value="0325024277" />
      </section>
      <section className="flex flex-col md:items-start items-center mt-3">
        <img
          src="/images/banner_vietcom.png"
          className="w-full max-w-[400px]"
          alt=""
        />
        <h3 className="text-base mb-2 font-bold mt-2">Phương Thức:</h3>
        <strong className="text-primary text-2xl">Internet Banking</strong>
        <p className="mt-2 mb-3">
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

export default CodePayContainer;
