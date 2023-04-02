import React, { memo, useState, useEffect } from "react";

import { Tooltip } from "@mui/material";
import { RiFireFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
const HeaderComment = () => {
  const totalCommemt = useSelector(
    (state: RootState) => state.commemt.totalHeader
  );
  const idFilm = useSelector((state: RootState) => state.commemt.idFilm);

  return (
    <div
      className={`thread-wapper flex justify-between px-3 border-b-2 border-gray-600 relative mb-10`}
    >
      <div className="total_comment text-lg font-semibold">
        {totalCommemt} Bình Luận
      </div>
      <div
        style={{ width: `${((totalCommemt * 100) / 200).toFixed(2)}%` }}
        className="process"
      ></div>
      <div className="flex items-center">
        <div className="border_items">
          <Tooltip title="Max 200">
            <span>
              {" "}
              <RiFireFill color="red" fontSize="1.5rem" cursor="pointer" />
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderComment);
