import React from "react";
import { IHistory, StatusHistory } from "../component/HistoryTopup";
import moment from "moment";

const ItemHistory: React.FC<{ history: IHistory }> = ({ history }) => {
  return (
    <div
      key={history.payCode}
      className="grid grid-cols-6   text-sm sm:text-base mb-2"
    >
      <span className="text-center break-words px-2 text-xs sm:text-base">
        {moment(history.createdAt).format("DD/MM/YYYY  hh:mm:ss")}
      </span>
      <span className="text-center capitalize pr-2">
        {history.nameBank || history.nameWallet}
      </span>
      <span className="text-primary">
        {history.money.toLocaleString("en-vi")} đ
      </span>
      <span>Nạp coin</span>
      <span className="break-words text-center sm:pr-4">
        #{history.payCode}
      </span>
      <span
        className={`text-center font-bold capitalize ${
          history.status == 1
            ? "text-primary"
            : history.status == 2
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {StatusHistory[`${history.status.toString()}`]}
      </span>
    </div>
  );
};

export default ItemHistory;
