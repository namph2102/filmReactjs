import React from "react";

const HandleHookKind = (
  kind: string,
  total: number,
  current: number,
  trailer: boolean
) => {
  if (trailer) {
    return "Trailer";
  } else {
    if (kind == "feature") {
      return "Phim lẻ";
    } else if (total == current && current != 1) {
      return `Hoàn Tất (${current} / ${current})`;
    } else if (total !== current) {
      return `Tập ${current}`;
    }
  }
  return "Phim chiếu rạp";
};

export default HandleHookKind;
