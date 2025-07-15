import React from "react";
import { useToastStore } from "./store";
import { createPortal } from "react-dom";

const ToastContainer = ({
  position = "top-right",
  gutter = 8,
  containerStyle = {},
}) => {
  const toasts = useToastStore((state) => state.toasts);

  const positionStyles = {
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, right: 0 },
    "bottom-left": { bottom: 0, left: 0 },
    "bottom-right": { bottom: 0, right: 0 },
    "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        [position.includes("bottom") ? "bottom" : "top"]: "20px",
        [position.includes("right") ? "right" : "left"]: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: position.includes("center")
          ? "center"
          : position.includes("right")
            ? "flex-end"
            : "flex-start",
        gap: "10px",
        maxWidth: "100%",
        padding: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: "420px",
            minWidth: "300px",
          }}
        >
          {toast.component}
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
