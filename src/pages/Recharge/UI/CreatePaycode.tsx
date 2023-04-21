import React, { useEffect, useState } from "react";
import RenderCopyField from "./RenderCopyField";
import { handleCoverTime } from "../../../untils";
import ToastMessage from "../../../untils/ToastMessage";

const CreatePaycode: React.FC<{
  payCode: string;
  setCreateCode: (value: string) => void;
}> = ({ payCode, setCreateCode }) => {
  const [time, setTime] = useState(600);
  useEffect(() => {
    const idTimeOut = setTimeout(() => setTime(time - 1), 1000);

    if (time < 0) {
      clearTimeout(idTimeOut);
      setCreateCode("");
      ToastMessage("Mã thanh toán hết hạn").warning();
    }
    return () => {
      clearTimeout(idTimeOut);
    };
  }, [time]);

  return (
    <div className="mt-2 w-full">
      <p className="w-1/2">
        <RenderCopyField name="" value={payCode} />
      </p>
      <p className="text-center mt-3">
        <span className="text-white text-xl">Mã Hết Hạn Sau:</span>{" "}
        <span className="text-pimary text-base font-bold">
          {handleCoverTime(time)}
        </span>
      </p>
      <p className="text-yellow-500 text-center">
        (Lưu ý mã chỉ được xử dụng 1 lần)
      </p>
    </div>
  );
};

export default CreatePaycode;
