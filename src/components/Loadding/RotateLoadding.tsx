import React from "react";
import imgaeLoading from "../../assets/loading.png";
const RotateLoadding = () => {
  return (
    <div className="wrapper-loading my-5  mx-auto w-full">
      <img
        src={imgaeLoading}
        className="animate-spin inline-block"
        width="40"
        height="40"
      />
      <span className="text-lg text-primary font-medium ml-4">
        Chờ tí xíu ....{" "}
      </span>
    </div>
  );
};

export default RotateLoadding;
