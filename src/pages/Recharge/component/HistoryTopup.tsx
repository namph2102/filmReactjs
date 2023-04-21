import React, { useState, useEffect } from "react";
import { IPropsRecharge } from "..";
import ItemHistory from "../UI/ItemHistory";
import axios from "axios";
import PathLink from "../../../contants";
export const StatusHistory: any = {
  "1": "Chờ xử lý",
  "2": "thành công",
  "3": "Thất bại",
};
export interface IHistory {
  createdAt: string;
  money: number;
  nameBank: string | "";
  nameWallet: string | "";
  payCode: string;
  status: number;
  updatedAt: string;
}
const HistoryTopup: React.FC<IPropsRecharge> = ({ idUser, username }) => {
  const [history, setHistory] = useState<IHistory[]>([]);
  useEffect(() => {
    axios
      .post(PathLink.domain + "topup/userHistory", {
        method: "post",
        message: "Get history give user",
        data: {
          idUser,
        },
      })
      .then((response) => {
        setHistory(response.data.history);
      });
  }, []);
  return (
    <div className="history_wrapper w-full px-7">
      <p className="mt-32"></p>
      <div className="pb-2 history__warraper-topup">
        {history.length > 0 &&
          history.map((h) => <ItemHistory key={h.updatedAt} history={h} />)}
      </div>
    </div>
  );
};

export default HistoryTopup;
