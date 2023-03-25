import React, { memo, useState } from "react";

import { Tooltip } from "@mui/material";
import { RiFireFill, RiArrowDownSFill } from "react-icons/ri";
import styles from "./Comment.module.scss";
const HeaderComment = () => {
  const [isOpenSubmenu, setIsOpenSubMenu] = useState<boolean>(false);

  return (
    <div
      className={`thread-wapper flex justify-between px-3 border-b-2 border-gray-600 relative mb-2`}
    >
      <div className="total_comment text-lg font-semibold">41 Bình Luận</div>
      <div className={`${styles.process} w-3/4`}></div>
      <div className="flex items-center">
        <div className={styles.border_items}>
          <Tooltip title="Hot nhất">
            <span>
              {" "}
              <RiFireFill color="red" fontSize="1.5rem" cursor="pointer" />
            </span>
          </Tooltip>
        </div>
        <div
          onClick={() => setIsOpenSubMenu(!isOpenSubmenu)}
          className={`flex items-center text-base  ${styles.border_items_bl}`}
        >
          Được bỏ phiếu nhiều nhất <RiArrowDownSFill />
          <ul className={`${!isOpenSubmenu && "hidden"} ${styles.subfilter}`}>
            <li>Cũ nhất</li>
            <li>Mới nhất</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderComment);
