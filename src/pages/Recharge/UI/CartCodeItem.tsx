import React from "react";

const CartCodeItem: React.FC<{ value: number; rate: number }> = ({
  value,
  rate,
}) => {
  return (
    <div className="card-topup_container-item flex text-center text-base font-semibold py-1">
      <span className="basis-1/2"> {value.toLocaleString("en-vi")} VNĐ</span>
      <span className="basis-1/2">
        <span className="flex gap-1 w-full items-center justify-center">
          <img src="/images/coin.png" width={20} alt="" />{" "}
          {Math.floor((value / 100) * rate).toLocaleString("en-vi")}
        </span>
      </span>
    </div>
  );
};

export default CartCodeItem;
