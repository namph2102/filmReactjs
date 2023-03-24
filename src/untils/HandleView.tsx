import React from "react";
import { RiEyeLine } from "react-icons/ri";
import { defaultIconSize } from "../contants";
export const HandleView = (views: number): JSX.Element => {
  let result = "";
  if (views > 1_000_000) result = `${(views / 1_000_000).toFixed(1)}M`;
  else if (views > 1_000) result = `${(views / 1_000).toFixed(1)}K`;
  else result = views + "";
  return (
    <>
      <span> {result}</span>
      <span>
        <RiEyeLine fontSize="0.7rem" />
      </span>
      <span>lượt xem</span>
    </>
  );
};
