import { ToastContainer } from "./ToastContainer";
import { useToastStore } from "./store";

// Create a toast function that uses the store
const toast = (options) => {
  useToastStore.getState().addToast(options);
};

// Add variant methods
toast.success = (message, options = {}) => {
  toast({ message, variant: "success", ...options });
};

toast.error = (message, options = {}) => {
  toast({ message, variant: "error", ...options });
};

toast.warning = (message, options = {}) => {
  toast({ message, variant: "warning", ...options });
};

toast.info = (message, options = {}) => {
  toast({ message, variant: "info", ...options });
};

export { ToastContainer, toast };
