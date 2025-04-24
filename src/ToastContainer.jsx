import React, { useEffect, useState } from "react";
import ToastSuccess from "./varients/ToastSuccess";
import ToastError from "./varients/ToastError";
import ToastWarning from "./varients/ToastWarning";
import ToastInfo from "./varients/ToastInfo";
import ToastDefault from "./varients/ToastDefault";
import { useToastStore } from "./store";

const MAX_VISIBLE_TOASTS = 3;
const TOAST_GAP = 12;
const TOAST_HEIGHT = 72;

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
  const { toasts, removeToast } = useToastStore();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedToasts, setExpandedToasts] = useState(false);

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

  // Compute position style
  let positionStyle = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column-reverse",
    padding: "16px",
    pointerEvents: "none",
    transition: "all 0.2s ease",
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

  const getToastStyle = (index) => {
    const isHovered = hoveredIndex === index || expandedToasts;
    const visibleToasts = Math.min(toasts.length, MAX_VISIBLE_TOASTS);
    const baseTransform = `translateY(${index * -TOAST_GAP}px)`;

    if (index >= MAX_VISIBLE_TOASTS) {
      return {
        transform: expandedToasts
          ? `translateY(${index * -(TOAST_HEIGHT + TOAST_GAP)}px)`
          : `translateY(${(MAX_VISIBLE_TOASTS - 1) * -TOAST_GAP - 10}px)`,
        opacity: expandedToasts ? 1 : 0,
        pointerEvents: expandedToasts ? "auto" : "none",
      };
    }

    const scale = isHovered ? 1 : 1 - index * 0.05;
    const opacity = isHovered ? 1 : 1 - index * 0.15;

    return {
      transform: `${baseTransform} scale(${scale})`,
      opacity,
      filter: `brightness(${1 - index * 0.1})`,
    };
  };

  return (
    <div
      style={{ ...positionStyle, ...containerStyle }}
      data-testid="toast-container"
      onMouseEnter={() => setExpandedToasts(true)}
      onMouseLeave={() => {
        setExpandedToasts(false);
        setHoveredIndex(null);
      }}
    >
      {toasts.map((toast, index) => {
        // Allow custom render function
        if (typeof renderToast === "function") {
          return renderToast(toast, index);
        }

        const common = {
          ...toastProps,
          ...toast,
          key: toast.id,
          style: {
            ...getToastStyle(index),
            ...toastProps.style,
            ...toast.style,
          },
          onMouseEnter: () => setHoveredIndex(index),
          onMouseLeave: () => setHoveredIndex(null),
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
