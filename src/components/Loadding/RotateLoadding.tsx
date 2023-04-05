import React from "react";
import imgaeLoading from "../../assets/loading.png";
const RotateLoadding: React.FC<{ message?: string }> = ({
  message = "Chờ tí xíu ....",
}) => {
  return (
    <div className="wrapper-loading my-5  mx-auto w-full">
      <img
        src={imgaeLoading}
        className="animate-spin inline-block"
        width="40"
        height="40"
      />
      <span className="text-sm text-primary font-medium ml-4">{message}</span>
    </div>
  );
};

export default RotateLoadding;
