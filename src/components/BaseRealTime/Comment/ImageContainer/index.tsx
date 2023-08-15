import { Tooltip } from "@mui/material";
import React from "react";

const SublistIcon: React.FC<{
  listIcons: { title: string; link: string; _id?: string }[];
}> = ({ listIcons }) => {
  return (
    <ul className="ml-2 flex gap-1 flex-wrap">
      {listIcons.map((icon) => (
        <Tooltip key={icon._id} title={icon.title} placement="top" arrow>
          <img
            className="object-cover cursor-pointer sm:w-7 sm:h-7 w-5 h-5"
            src={icon.link}
            alt=""
          />
        </Tooltip>
      ))}
    </ul>
  );
};

export default SublistIcon;
