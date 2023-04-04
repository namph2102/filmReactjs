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

export { Handle, componentsProps, componentsPropsCommemt };
