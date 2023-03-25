import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (message = "", icon?: string) => {
  const options: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  if (icon) options.icon = icon;
  return {
    normal() {
      toast(message, options);
    },
    success() {
      toast.success(message, options);
    },
    error() {
      toast.error(message, options);
    },
    warning() {
      toast.warning(message, options);
    },
    info() {
      toast.info(message, options);
    },
  };
};
export default ToastMessage;
