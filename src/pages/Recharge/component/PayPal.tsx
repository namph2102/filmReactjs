import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { configPaypal } from "../../../contants";
import { formatCurrent } from "../../../untils";
import IconPaywin from "../../../assets/paywin.png";
import axios from "axios";
import PathLink from "../../../contants";
import ToastMessage from "../../../untils/ToastMessage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { updateAccount } from "../../../Redux/UserSlice";
import { IPropsRecharge } from "..";
const initialOptions = {
  "client-id": configPaypal.clientID,
  currency: "USD",
  intent: "capture",
};

const listMoney = [10000, 20000, 50000, 100000, 200000, 500000, 1000000];
const PayPalContainer: React.FC<IPropsRecharge> = ({ idUser, username }) => {
  const dispatch: AppDispatch = useDispatch();
  const [money, setMoney] = useState<number>(0);
  const handleDetailRecent = (details: any) => {
    console.log(details);
    const { id, status } = details;
    if (status == "COMPLETED") {
      axios
        .post(PathLink.domain + "topup", {
          method: "post",
          message: "Nạp tiền với PayPal",
          data: {
            username,
            idUser,
            status: 2,
            payCode: id,
            money,
            nameWallet: "PayPal",
          },
        })
        .then((responsive: any) => {
          dispatch(updateAccount(responsive.data.account));
        });
      setMoney(0);
      ToastMessage(
        `Nạp thành công ${formatCurrent(money / 100)} coin vào tài khoản`
      ).success();
    }
  };
  return (
    <>
      <div className="flex flex-col pt-4 md:items-start items-center lg:items-center">
        <img
          src={IconPaywin}
          className="rounded-xl max-w-[300px] w-full px-2"
          alt=""
        />
        <ul className="list-disc ml-4  text-text text-sm mt-8 mb-4">
          <li>
            Nạp tiền sử dụng tài khoản{" "}
            <span className="text-primary"> PayPal</span> hoặc{" "}
            <span className="text-primary"> MasterCard</span>
          </li>
          <li>Nạp thẻ thành công nhớ nhắn admin nhen</li>
          <li>Admin check thẻ bằng cơm nên sẽ hơi lâu :(</li>
          <li>An toàn bảo mật nha</li>
        </ul>
      </div>
      <div className="text-text flex flex-col md:items-start items-center ">
        <p className="font-bold text-xl my-2 w-full">Thanh toán bằng PayPal</p>
        <div>
          <p className="text-base my-2 font-semibold">Số Tiền: </p>
          <select
            className="input__style--topup py-4 px-3 text-lg w-28 cursor-pointer text-text bg-black "
            name=""
            id=""
            onChange={(e) => {
              setMoney(Number(e.target.value));
            }}
          >
            <option value="0">Chọn số tiền</option>
            {listMoney.map((money) => (
              <option key={money} value={money}>
                {formatCurrent(money)}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm  my-4 flex-1 ">
          <p className="text-base font-bold">Lưu ý: </p>
          <span className="text-primary">
            + {money ? formatCurrent(money) : "10,000"} VNĐ bằng{" "}
            {money ? formatCurrent(money / 100) : "100"}
          </span>
          <img
            className="w-6 ml-2 inline-block"
            src="/images/coin.png"
            alt=""
          />
          <p className="text-sm text-primary">
            + 1 đô bằng 23.500 VNĐ ( Quy đổi thành {(money / 23500).toFixed(2)}{" "}
            đô)
          </p>
        </div>

        {money ? (
          <div className="w-full  lg:max-w-[500px]">
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                className=" text-white bg-slate-300 pt-4 px-2 rounded-sm"
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (money / 23500).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions: any) => {
                  return actions.order
                    .capture()
                    .then(handleDetailRecent)
                    .catch(() => {
                      ToastMessage("Bạn đã nạp thất bại!").info();
                    });
                }}
              />
            </PayPalScriptProvider>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PayPalContainer;
