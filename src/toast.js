// toast.js
export function toast(message, options = {}) {
  if (typeof window === "undefined") return;

  const toastObj = {
    message,
    ...options,
    // Default options
    duration: options.duration || 4000,
    description: options.description || "",
    action: options.action || null,
    size: options.size || "large",
    // Add default icons based on variant
    icon:
      options.icon ||
      (() => {
        switch (options.variant) {
          case "success":
            return "✓";
          case "error":
            return "✕";
          case "warning":
            return "⚠";
          case "info":
            return "ℹ";
          default:
            return "";
        }
      })(),
  };

  if (window.__TOAST_UPDATE__) {
    window.__TOAST_UPDATE__(toastObj);
  } else {
    if (!window.__TOAST_QUEUE__) window.__TOAST_QUEUE__ = [];
    window.__TOAST_QUEUE__.push(toastObj);
  }
}

// Hook into ToastContainer
if (typeof window !== "undefined") {
  window.__TOAST_UPDATE__ = (toast) => {
    if (window.__TOAST_CONTAINER_UPDATE__) {
      window.__TOAST_CONTAINER_UPDATE__(toast);
    } else {
      if (!window.__TOAST_QUEUE__) window.__TOAST_QUEUE__ = [];
      window.__TOAST_QUEUE__.push(toast);
    }
  };
}
