import { toast } from "react-toastify";

export const TOAST_TYPES = {
  Warn: "warn",
  Success: "success",
  Info: "info",
  Error: "error",
};

export const Toast_Handler = (type, message) => {
  if (type === "error") {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (type === "warn") {
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (type === "info") {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
