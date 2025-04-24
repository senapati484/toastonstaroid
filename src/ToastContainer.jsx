import React, { useEffect, useState } from "react";
import ToastSuccess from "./varients/ToastSuccess";
import ToastError from "./varients/ToastError";
import ToastWarning from "./varients/ToastWarning";
import ToastInfo from "./varients/ToastInfo";
import ToastDefault from "./varients/ToastDefault";

/**
 * ToastContainer
 * @param {object} props
 * @param {object} [props.containerStyle] - Custom styles for the container
 * @param {function} [props.renderToast] - Custom render function for a toast: (toast, idx) => ReactNode
 * @param {object} [props.toastProps] - Default props for all toasts (e.g. shape, size, style)
 * @param {string} [props.position] - Position of the toast container. One of: 'bottom-right', 'bottom-center', 'top-right', 'top-center', 'bottom-left', 'top-left'. Default: 'bottom-right'.
 */
export function ToastContainer({
  containerStyle = {},
  renderToast,
  toastProps = {},
  position = "bottom-right",
}) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Setup global update function for toast()
    window.__TOAST_CONTAINER_UPDATE__ = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, toast.duration || 4000);
    };
    // Process any queued toasts
    if (window.__TOAST_QUEUE__ && Array.isArray(window.__TOAST_QUEUE__)) {
      window.__TOAST_QUEUE__.forEach(window.__TOAST_CONTAINER_UPDATE__);
      window.__TOAST_QUEUE__ = [];
    }
    return () => {
      window.__TOAST_CONTAINER_UPDATE__ = null;
    };
  }, []);

  // Compute position style
  let positionStyle = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",
    maxHeight: "100vh",
    pointerEvents: "none",
  };
  switch (position) {
    case "bottom-center":
      positionStyle = {
        ...positionStyle,
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
      };
      break;
    case "top-center":
      positionStyle = {
        ...positionStyle,
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
      };
      break;
    case "top-right":
      positionStyle = { ...positionStyle, top: 0, right: 0 };
      break;
    case "bottom-left":
      positionStyle = { ...positionStyle, bottom: 0, left: 0 };
      break;
    case "top-left":
      positionStyle = { ...positionStyle, top: 0, left: 0 };
      break;
    case "bottom-right":
    default:
      positionStyle = { ...positionStyle, bottom: 0, right: 0 };
      break;
  }

  // Animation styles
  const getAnimationStyle = (idx) => {
    return {
      pointerEvents: "auto",
      transform: `translateY(${idx * 8}px)`,
      opacity: 1 - idx * 0.1,
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return (
    <div
      style={{ ...positionStyle, ...containerStyle }}
      data-testid="toast-container"
    >
      {toasts.map((toast, idx) => {
        // Allow custom render function
        if (typeof renderToast === "function") {
          return renderToast(toast, idx);
        }
        const common = {
          ...toastProps,
          ...toast,
          key: idx,
          style: {
            ...getAnimationStyle(idx),
            ...toastProps.style,
            ...toast.style,
          },
        };
        switch (toast.variant) {
          case "success":
            return <ToastSuccess {...common} />;
          case "error":
            return <ToastError {...common} />;
          case "warning":
            return <ToastWarning {...common} />;
          case "info":
            return <ToastInfo {...common} />;
          default:
            return <ToastDefault {...common} />;
        }
      })}
    </div>
  );
}
