// toast.js
export function toast(message, options = {}) {
  if (typeof window === 'undefined') return;
  const toastObj = { message, ...options };
  if (window.__TOAST_UPDATE__) {
    window.__TOAST_UPDATE__(toastObj);
  } else {
    if (!window.__TOAST_QUEUE__) window.__TOAST_QUEUE__ = [];
    window.__TOAST_QUEUE__.push(toastObj);
  }
}

// Hook into ToastContainer
if (typeof window !== 'undefined') {
  window.__TOAST_UPDATE__ = (toast) => {
    if (window.__TOAST_CONTAINER_UPDATE__) {
      window.__TOAST_CONTAINER_UPDATE__(toast);
    } else {
      if (!window.__TOAST_QUEUE__) window.__TOAST_QUEUE__ = [];
      window.__TOAST_QUEUE__.push(toast);
    }
  };
}
