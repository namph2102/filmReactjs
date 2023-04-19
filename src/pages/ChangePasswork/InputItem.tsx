import React, { useState } from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
type Tprop = {
  name: string;
  nameFormik: string;
  value: string;
  message: string | any;
  handleChange: (e: React.ChangeEvent<any>) => void;
};
const InputItem: React.FC<Tprop> = ({
  name,
  nameFormik,
  value,
  message,
  handleChange,
}) => {
  const defaultIconSize = "1.5rem";
  const [seePassword, setSeePassWord] = useState<boolean>(false);
  const [isShowError, setisShowError] = useState<boolean>(false);
  const handleBlur = () => {
    console.log("blur");
    !isShowError && setisShowError(true);
  };
  const handleInput = () => {
    isShowError && setisShowError(false);
  };
  console.log(isShowError);
  return (
    <div className="mt-6">
      <label className="block mb-2  font-bold  text-base">{name}</label>
      <div className="form_input flex items-center justify-between rounded-lg bg-input">
        <input
          type={seePassword ? "text" : "password"}
          name={nameFormik}
          placeholder={`Nhập ${name}....`}
          className="flex-1 w-full py-2 px-1 border-0 bg-input text-white outline-none text-sm"
          onChange={handleChange}
          onBlur={handleBlur}
          onInput={handleInput}
          value={value}
        />

        <button
          type="button"
          onClick={() => setSeePassWord(!seePassword)}
          className="p-2"
        >
          {seePassword ? (
            <RiEyeFill size={defaultIconSize} />
          ) : (
            <RiEyeCloseFill size={defaultIconSize} />
          )}
        </button>
      </div>
      {isShowError && value && <span className="text-red-600">{message}</span>}
    </div>
  );
};

export default InputItem;
