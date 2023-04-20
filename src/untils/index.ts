import React from "react";

import * as Handle from "./HandleView";
const componentsProps = {
  tooltip: {
    sx: {
      bgcolor: "#2196f3",
      "& .MuiTooltip-arrow": {
        color: "#2196f3",
      },
    },
  },
};
const componentsPropsCommemt = {
  tooltip: {
    sx: {
      bgcolor: "#a27900",
      "& .MuiTooltip-arrow": {
        color: "#a27900",
        borderColor: "#a27900",
      },
    },
  },
};
const handlePercent = (numbera: number = 0, numberb: number = 1): string => {
  if (numbera >= numberb) return `100%`;
  if (numberb == 0) return `0%`;
  return `${((numbera / numberb) * 100).toFixed(2)}%`;
};
const handleCoverTime = (time: number): string => {
  time = Math.floor(time);
  let hour = 0;
  let minute = 0;
  if (time > 3600) {
    hour = Math.floor(time / 3600);
    time = time - hour * 3600;
  }
  if (time > 60) {
    minute = Math.floor(time / 60);
    time = time - minute * 60;
  }
  if (hour) {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${time.toString().padStart(2, "0")}`;
  } else if (minute) {
    return `${minute.toString().padStart(2, "0")}:${time
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `00:${time.toString().padStart(2, "0")}`;
  }
};
const handleFormat = (x: any) => {
  return x + "%";
};
const formatCurrent = (number: number) => {
  return number.toLocaleString("en-vi");
};
export {
  Handle,
  componentsProps,
  handleCoverTime,
  handlePercent,
  formatCurrent,
  componentsPropsCommemt,
  handleFormat,
};
