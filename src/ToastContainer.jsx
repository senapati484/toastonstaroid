import React, { useEffect } from "react";
import ToastDefault from "./varients/ToastDefault";
import { useToastStore } from "./store";

const TOAST_LIMIT = 3;
const TOAST_REMOVAL_DELAY = 300;

/**
 * ToastContainer
 * @param {object} props
 * @param {object} [props.containerStyle] - Custom styles for the container
 * @param {string} [props.position] - Position of the toast container. One of: 'bottom-right', 'bottom-center', 'top-right', 'top-center', 'bottom-left', 'top-left'. Default: 'bottom-right'.
 */
export function ToastContainer({
  position = "bottom-right",
  containerStyle = {},
}) {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  const positionStyles = {
    "top-right": { top: 0, right: 0 },
    "top-left": { top: 0, left: 0 },
    "bottom-right": { bottom: 0, right: 0 },
    "bottom-left": { bottom: 0, left: 0 },
    "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  };

  const visibleToasts = toasts.slice(0, TOAST_LIMIT);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        padding: "16px",
        maxHeight: "100vh",
        overflow: "hidden",
        ...positionStyles[position],
        ...containerStyle,
      }}
    >
      {visibleToasts.map((toast) => (
        <ToastDefault
          key={toast.id}
          {...toast}
          style={{
            animation:
              "0.35s cubic-bezier(.21,1.02,.73,1) forwards toast-enter",
          }}
        />
      ))}
      <style>
        {`
          @keyframes toast-enter {
            0% {
              opacity: 0;
              transform: translateY(16px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
