import React, { useState } from "react";
import { IPropsRecharge } from "..";
import { listMoney } from "./PayPal";
import CartCodeItem from "../UI/CartCodeItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFeild from "../UI/InputFeild";
import ToastMessage from "../../../untils/ToastMessage";
import axios from "axios";
import PathLink from "../../../contants";
interface Icard {
  name: string;
  rate: number;
}
const listNameCard: (Icard & { image: string })[] = [
  {
    rate: 0.99,
    name: "VietTel",
    image: "viettel",
  },
  {
    rate: 0.97,
    name: "Vina",
    image: "vina",
  },
  {
    rate: 0.95,
    name: "Mobile",
    image: "mobi",
  },
  {
    rate: 0.9,
    name: "VietNam Mobile",
    image: "vnmobile",
  },
];
const CardCode: React.FC<IPropsRecharge> = ({ username, idUser }) => {
  const [card, setCard] = useState<Icard>({
    rate: listNameCard[0].rate,
    name: listNameCard[0].name,
  });
  const [money, setMoney] = useState<string>("");
  const formik = useFormik({
    initialValues: {
      seri: "",
      payCode: "",
    },
    validationSchema: Yup.object().shape({
      seri: Yup.string()
        .required("Seri không được bỏ trống !")
        .matches(/^\d+$/, "Seri phải là chữ số")
        .min(10, "Mã số Seri không hợp lệ !")
        .max(20, "Mã số Seri không hợp lệ !"),
      payCode: Yup.string()
        .required("Mã thẻ không được bỏ trống !")
        .matches(/^\d+$/, "Mã thẻ phải là chữ số")
        .min(10, "Mã thẻ không hợp lệ !")
        .max(20, "Mã Thẻ không hợp lệ !"),
    }),
    onSubmit(value) {
      let { seri, payCode } = value;
      seri = seri.trim().replace(/ /g, "");
      payCode = seri.trim().replace(/ /g, "");
      axios
        .post(PathLink.domain + "topup", {
          method: "post",
          message: "Nạp tiền với Ngân hàng",
          data: {
            username,
            idUser,
            status: 1,
            money: money.trim(),
            payCode,
            seri,
            nameWallet: `Thẻ ${card.name}`,
          },
        })
        .then((responsive: any) => {
          ToastMessage(
            `Bạn Đã nạp ${Number(money).toLocaleString(
              "en-vi"
            )} VNĐ đang chờ xét duyệt!`
          ).success();

          formik.resetForm();
        });
    },
  });
  return (
    <>
      <section>
        <div className="flex justify-between py-4">
          {listNameCard.length > 0 &&
            listNameCard.map((item) => (
              <button
                key={item.name}
                onClick={() => setCard({ rate: item.rate, name: item.name })}
                className="w-[22.5%]"
              >
                <img
                  className="w-full"
                  src={`/images/${
                    item.name !== card.name ? `${item.image}h` : item.image
                  }.png`}
                  alt=""
                />
              </button>
            ))}
        </div>

        <div className="text-center relative card-topup_container border-[3px] rounded-[12px] border-solid border-blue-900">
          <div className="card-topup_container-header text-base flex  text-center py-2">
            <span className="basis-1/2">Mệnh giá</span>
            <span className="basis-1/2">Quy Đổi</span>
          </div>
          <div className="card-topup_container-body pb-8">
            {listMoney.length > 0 &&
              listMoney.map((value) => (
                <CartCodeItem key={value} value={value} rate={card.rate} />
              ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 overlay"></div>
        </div>
      </section>
      <section className="md:pl-8">
        <p className="text-primary mt-4">
          {" "}
          * Lưu ý: Chọn đúng loại thẻ vả chọn đúng mệnh giá
        </p>
        <p className="text-base font-bold mt-4 mb-2">Chọn mệnh giá:</p>
        <select
          onChange={(e) => setMoney(e.target.value)}
          className="input__style--topup py-4 px-3 text-lg w-28 cursor-pointer text-text bg-black "
        >
          {listMoney.length > 0 &&
            listMoney.map((item) => (
              <option value={item}>
                {card.name} {item.toLocaleString("en-vi")} VNĐ
              </option>
            ))}
        </select>
        <form onSubmit={formik.handleSubmit}>
          <InputFeild
            name="Số Seri"
            placeHolder="Nhập số seri"
            nameFormik="seri"
            value={formik.values.seri}
            handleChange={formik.handleChange}
            message={formik.errors.seri}
          />
          <InputFeild
            name="Mã thẻ"
            placeHolder="Nhập mã thẻ"
            nameFormik="payCode"
            value={formik.values.payCode}
            handleChange={formik.handleChange}
            message={formik.errors.payCode}
          />
          <button
            type="submit"
            className="mt-4"
            onClick={() =>
              (!formik.values.payCode || !formik.values.seri || !money) &&
              ToastMessage("Vui lòng nhập đầy đủ dữ liệu!").info()
            }
          >
            <img
              className="hover:scale-110 ease-in duration-200"
              src="/images/btn_topup.png"
              alt=""
            />
          </button>
        </form>
      </section>
    </>
  );
};

export default CardCode;
