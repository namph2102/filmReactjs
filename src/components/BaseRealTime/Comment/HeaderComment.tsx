import React, { memo, useState, useEffect } from "react";

import { Tooltip } from "@mui/material";
import { RiFireFill } from "react-icons/ri";
import styles from "./Comment.module.scss";
import PathLink from "../../../contants";
import { useDispatch } from "react-redux";
import { getlengthComment } from "../../../Redux/CommentSlice";
const HeaderComment: React.FC<{ idFilm: number }> = ({ idFilm = 0 }) => {
  const dispatch: any = useDispatch();
  const [totalCommemt, setTotalCommemt] = useState<number>(0);
  useEffect(() => {
    let idTimeout: any;
    (async function () {
      idTimeout = setInterval(async () => {
        dispatch(getlengthComment(idFilm)).then(
          (comments: { status: number; message: string; length: number }) => {
            if (comments.status == 200) {
              if (totalCommemt !== comments.length)
                setTotalCommemt(comments.length);
            }
          }
        );
      }, 2000);
    })();
    return () => {
      clearInterval(idTimeout);
    };
  }, []);

  return (
    <div
      className={`thread-wapper flex justify-between px-3 border-b-2 border-gray-600 relative mb-10`}
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
