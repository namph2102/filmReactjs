import React, { useState } from "react";
import { BiRevision } from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import { Tooltip } from "@mui/material";
export enum TPageCurrent {
  comment = "Bình Luận",
  rank = "Xếp hạng",
  intrust = "Hướng dẩn",
}
const UIBaseReadTime: React.FC<{ setPagecurrent: (value: string) => void }> = ({
  setPagecurrent,
}) => {
  return (
    <>
      <section className="bg-content border-2 border-gray-800 py-2 px-5">
        <div className="flex justify-between items-center">
          <div>
            <Tooltip title="Quay trở về" arrow>
              <button
                onClick={() => setPagecurrent(TPageCurrent.comment)}
                className="btn_grag"
              >
                <BiRevision size={defaultIconSize} />
              </button>
            </Tooltip>
          </div>
          <div>
            <button
              className="btn_grag inline-flex"
              onClick={() => setPagecurrent(TPageCurrent.comment)}
            >
              {TPageCurrent.comment}
            </button>
            <button
              className="btn_grag mx-2"
              onClick={() => setPagecurrent(TPageCurrent.rank)}
            >
              {TPageCurrent.rank}
            </button>
            <button
              className="btn_grag"
              onClick={() => setPagecurrent(TPageCurrent.intrust)}
            >
              {TPageCurrent.intrust}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UIBaseReadTime;
