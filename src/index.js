import { ToastContainer } from "./ToastContainer";
import { useToastStore } from "./store";

const toast = (message, options = {}) => {
  if (typeof message === "string") {
    useToastStore.getState().addToast({ message, ...options });
  } else {
    useToastStore.getState().addToast(message);
  }
};

// Variant methods
toast.success = (message, options = {}) => {
  toast(message, { variant: "success", ...options });
};

toast.error = (message, options = {}) => {
  toast(message, { variant: "error", ...options });
};

toast.warning = (message, options = {}) => {
  toast(message, { variant: "warning", ...options });
};

toast.info = (message, options = {}) => {
  toast(message, { variant: "info", ...options });
};

export { ToastContainer, toast };
