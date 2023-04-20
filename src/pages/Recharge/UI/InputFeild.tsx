import React, { useState } from "react";
type TPropsInput = {
  name: string;
  placeHolder: string;
  value: string;
  handleChange: any;
  nameFormik: string;
  message: string | undefined;
};
const InputFeild: React.FC<TPropsInput> = ({
  name,
  placeHolder,
  value,
  handleChange,
  nameFormik,
  message,
}) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  return (
    <div>
      <p className="my-2 text-base font-semibold">{name}:</p>
      <input
        type="text"
        name={nameFormik}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        onBlur={() => !showMessage && setShowMessage(!showMessage)}
        onInput={() => showMessage && setShowMessage(!showMessage)}
        className="input__style--topup text-base focus-within:font-semibold p-3 text-primary  w-28  bg-black"
      />

      <p className="text-red-500 h-4 mt-0.5">
        {showMessage && value ? message : ""}
      </p>
    </div>
  );
};

export default InputFeild;
