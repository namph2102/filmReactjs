import React, { memo, useState, useEffect } from "react";

import { Tooltip } from "@mui/material";
import { RiFireFill } from "react-icons/ri";
import styles from "./Comment.module.scss";
import PathLink from "../../../contants";
import axios from "axios";
const HeaderComment = () => {
  const [totalCommemt, setTotalCommemt] = useState<number>(0);
  useEffect(() => {
    let idTimeout: any;
    (async function () {
      idTimeout = setInterval(async () => {
        const res = await axios.post(
          PathLink.domain + "api/comments/getlength",
          {
            method: "post",
            id_film: 0,
          }
        );
        setTotalCommemt(res.data.data);
      }, 2000);
    })();
    return () => {
      clearInterval(idTimeout);
    };
  }, [totalCommemt]);

  return (
    <div
      className={`thread-wapper flex justify-between px-3 border-b-2 border-gray-600 relative mb-2`}
    >
      <div className="total_comment text-lg font-semibold">
        {totalCommemt} Bình Luận
      </div>
      <div
        style={{ width: `${((totalCommemt * 100) / 200).toFixed(2)}%` }}
        className={`${styles.process}`}
      ></div>
      <div className="flex items-center">
        <div className={styles.border_items}>
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
