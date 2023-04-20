import React from "react";

const ReCharegeButton: React.FC<{
  listButton: { id: number; name: string; icon: string }[];
  payCurrent: number;
  handleSetPayCurrent: (payCurrent: number) => void;
}> = ({ listButton, payCurrent, handleSetPayCurrent }) => {
  return (
    <>
      {listButton.length > 0 &&
        listButton.map((item) => (
          <button
            onClick={() => handleSetPayCurrent(item.id)}
            key={item.id}
            className={`flex items-center justify-center gap-1  btn_rechare ${
              item.id == payCurrent && "active"
            } lg:w-4/5 w-full`}
          >
            {item.name} <img width={30} src={`/images/${item.icon}`} alt="" />
          </button>
        ))}
    </>
  );
};

export default ReCharegeButton;
