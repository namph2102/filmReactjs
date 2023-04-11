import { Tooltip } from "@mui/material";
import React from "react";
import { BiCog, BiTimer, BiXCircle } from "react-icons/bi";
const listSpeend = [0.25, 0.5, 1, 1.25, 1.5, 2];
const SettingSpeed: React.FC<{
  handleChangeSound: (speed: number) => void;
  speed: number;
}> = ({ handleChangeSound, speed = 1 }) => {
  return (
    <div
      className="relative video_speed-container z-50
   flex items-center"
    >
      <Tooltip title="Cài đặt" arrow placement="top">
        <button>
          <BiCog size="1.5rem" />
        </button>
      </Tooltip>
      <div className="box_settings__overlay text-white w-32  right-0 bottom-4 absolute">
        <span className="flex items-center justify-between px-2 py-1  bg-black">
          <BiTimer size="2rem" />
          <BiXCircle size="1.75rem" />
        </span>
        <ul className="text-base list-disc flex flex-col ml-12">
          {listSpeend.map((run, index) => (
            <li
              onClick={() => {
                handleChangeSound(run);
              }}
              className={speed == run ? "active" : ""}
              key={index}
            >
              {run}X
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingSpeed;
