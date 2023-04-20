import React, { useState } from "react";
import ReCharegeButton from "./UI/ReCharegeButton";
import PayPalContainer from "./component/PayPal";
import "./recharge.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Banking from "./component/Banking";
import HistoryTopup from "./component/HistoryTopup";
export const listButton = [
  {
    id: 1,
    name: "PayPal",
    icon: "runing.png",
  },
  {
    id: 2,
    name: "Ngân Hàng",
    icon: "bank.png",
  },
  {
    id: 3,
    name: "Code Pay",
    icon: "payment.png",
  },
  {
    id: 4,
    name: "Thẻ cào ",
    icon: "card.png",
  },
  {
    id: 5,
    name: "Ví điện tử",
    icon: "save.png",
  },
  {
    id: 6,
    name: " Lịch sử ",
    icon: "history.png",
  },
];
export interface IPropsRecharge {
  username: string;
  idUser: string;
}
const Recharge = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [payCurrent, setPayCurrent] = useState<number>(1);
  return (
    <div className="w-full payment_wrapper">
      <h2 className="text-center text-base text-text my-4">
        Mọi sự đóng góp, ủng hộ của bạn tạo động lực lớn cho team{" "}
        <span className="text-primary">VideoTV !</span>
      </h2>
      <section className="flex flex-wrap">
        <div className="lg:basis-1/6 md:basis-1/4 basis-full grid md:grid-cols-1 grid-cols-3 gap-2 max-h-[300px] ">
          <ReCharegeButton
            listButton={listButton}
            payCurrent={payCurrent}
            handleSetPayCurrent={setPayCurrent}
          />
        </div>
        <div
          className={`lg:basis-5/6 md:basis-3/4 md:pl-3 md:mt-0 mt-4  text-text basis-full grid ${
            payCurrent != 6 && "md:grid-cols-2"
          } grid-cols-1 menu__topup__container`}
        >
          {payCurrent == 1 && (
            <PayPalContainer username={account.username} idUser={account._id} />
          )}
          {payCurrent == 2 && (
            <Banking username={account.username} idUser={account._id} />
          )}
          {payCurrent == 6 && (
            <HistoryTopup username={account.username} idUser={account._id} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Recharge;
