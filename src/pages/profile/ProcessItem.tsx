import React from "react";
import { handlePercent } from "../../untils";

const ProcessItem: React.FC<{
  name: string;
  valueStart: number;
  valueEnd: number;
  icon: string;
  nameSub: string;
}> = ({ name, valueStart, valueEnd, icon, nameSub }) => {
  return (
    <div className="profile_exp-ground flex items-center">
      <img src={icon} width={40} className="object-cover" alt="" />
      <div className="w-60 rounded-md bg-white relative box_exp">
        <div
          className={`process_exp-${name} flex items-center justify-end h-3 rounded-md relative`}
          style={{
            width: handlePercent(valueStart, valueEnd),
          }}
        ></div>
        <div
          style={{
            left: `calc(${handlePercent(valueStart, valueEnd)} - 50px)`,
          }}
          className="absolute process_exp-sub_exp"
        >
          {nameSub}
        </div>
        <span
          className="text-text pr-1 absolute"
          style={{
            textShadow: "0px 0px 1px #ffff",
            left: `calc(50%)`,
            transform: "translateX(-50%)",
          }}
        >
          {valueStart}/{valueEnd}
        </span>
      </div>
    </div>
  );
};

export default ProcessItem;
