import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (message = "", icon?: string) => {
  const options: any = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  if (icon) options.icon = icon;
  return {
    normal(suboptions?: object) {
      return toast(message, { ...options, ...suboptions });
    },
    success(suboptions?: object) {
      return toast.success(message, { ...options, ...suboptions });
    },
    error(suboptions?: object) {
      return toast.error(message, { ...options, ...suboptions });
    },
    warning(suboptions?: object) {
      return toast.warning(message, { ...options, ...suboptions });
    },
    info(suboptions?: object) {
      return toast.info(message, { ...options, ...suboptions });
    },
  };
};
export default ToastMessage;
