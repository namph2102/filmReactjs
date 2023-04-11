import { Tooltip } from "@mui/material";
import React, { forwardRef } from "react";

import styles from "../VideoTag.module.scss";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
interface TProps {
  handleChangeTime: () => void;
  left: boolean;
}
const ChangeCurrentTime = (
  { handleChangeTime, left }: TProps,
  buttonRef: React.LegacyRef<HTMLButtonElement>
) => {
  return (
    <Tooltip title={`Tua ${left ? "lại" : "tới"} 10s`} placement="top" arrow>
      <button onClick={handleChangeTime} ref={buttonRef} className="relative">
        {left ? (
          <BiRotateLeft size="1.875rem" />
        ) : (
          <BiRotateRight size="1.875rem" />
        )}
        <span className={styles["content_center-absolute"]}>10s</span>
      </button>
    </Tooltip>
  );
};

export default forwardRef(ChangeCurrentTime);
