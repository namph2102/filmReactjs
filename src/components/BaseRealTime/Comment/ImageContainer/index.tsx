import { Tooltip } from "@mui/material";
import React from "react";

const SublistIcon: React.FC<{
  listIcons: { title: string; link: string }[];
}> = ({ listIcons }) => {
  return (
    <ul className="ml-2 flex gap-1">
      {listIcons.map((icon, index) => (
        <Tooltip key={index} title={icon.title} placement="top" arrow>
          <img
            width="28px"
            height="28px"
            className="object-cover cursor-pointer"
            src={icon.link}
            alt=""
          />
        </Tooltip>
      ))}
    </ul>
  );
};

export default SublistIcon;
