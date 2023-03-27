import React from "react";
import { BiRevision } from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import { Tooltip } from "@mui/material";
const UIBaseReadTime = () => {
  return (
    <>
      <section className="bg-content border-2 border-gray-800 py-2 px-5">
        <div className="flex justify-between items-center">
          <div>
            <Tooltip title="Quay trở về" arrow>
              <button className="btn_grag">
                <BiRevision size={defaultIconSize} />
              </button>
            </Tooltip>
          </div>
          <div>
            <button className="btn_grag inline-flex">Bình luận</button>
            <button className="btn_grag mx-2">Xếp hạng</button>
            <button className="btn_grag">Hướng dẫn</button>
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-lg p-3 bg-content text-orange-400">
          Nhóm zalo thông báo phim
          <Tooltip title="Nhớ like, Share hoặc follow bạn nhé :))">
            <a
              className="text-base font-semibold hover:text-primary ml-2"
              href="https://www.facebook.com/profile.php?id=100087004991368"
              target="_blank"
            >
              Movies
            </a>
          </Tooltip>
        </h1>
      </section>
    </>
  );
};

export default UIBaseReadTime;
