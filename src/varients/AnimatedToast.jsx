import React, { useEffect, useRef } from "react";
import anime from "animejs";

const styles = {
  success: {
    background: "#ECFDF5",
    color: "#065F46",
    borderColor: "#10B981",
    icon: "✓",
    iconColor: "#10B981",
  },
  error: {
    background: "#FEF2F2",
    color: "#991B1B",
    borderColor: "#EF4444",
    icon: "✕",
    iconColor: "#EF4444",
  },
  warning: {
    background: "#FFFBEB",
    color: "#92400E",
    borderColor: "#F59E0B",
    icon: "⚠",
    iconColor: "#F59E0B",
  },
  info: {
    background: "#EFF6FF",
    color: "#1E40AF",
    borderColor: "#3B82F6",
    icon: "ℹ",
    iconColor: "#3B82F6",
  },
  magic: {
    background: "#F5F3FF",
    color: "#5B21B6",
    borderColor: "#8B5CF6",
    icon: "✨",
    iconColor: "#8B5CF6",
  },
};

export default function AnimatedToast({
  message,
  variant = "info",
  style = {},
  description,
  action,
  animation = "ripple",
  onClose,
  ...rest
}) {
  const toastRef = useRef(null);
  const progressRef = useRef(null);
  const currentStyle = styles[variant] || styles.info;

  useEffect(() => {
    if (toastRef.current) {
      switch (animation) {
        case "ripple":
          anime({
            targets: toastRef.current,
            scale: [0.95, 1],
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 400,
            easing: "easeOutCubic",
          });
          break;
        case "bounce":
          anime({
            targets: toastRef.current,
            translateY: [-20, 0],
            duration: 600,
            easing: "spring(1, 80, 10, 0)",
          });
          break;
        case "spin":
          anime({
            targets: toastRef.current,
            rotateY: [40, 0],
            opacity: [0, 1],
            duration: 600,
            easing: "easeOutCubic",
          });
          break;
        case "glitch":
          anime
            .timeline({
              targets: toastRef.current,
              duration: 500,
            })
            .add({
              translateX: [-5, 0],
              opacity: [0, 1],
              skewX: [10, 0],
              easing: "easeOutCubic",
            });
          break;
        default:
          anime({
            targets: toastRef.current,
            opacity: [0, 1],
            duration: 300,
            easing: "easeOutCubic",
          });
      }
    }

    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: rest.duration || 5000,
        easing: "linear",
      });
    }
  }, [animation]);

  return (
    <div
      ref={toastRef}
      style={{
        display: "flex",
        alignItems: "center",
        background: currentStyle.background,
        color: currentStyle.color,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        minWidth: "300px",
        maxWidth: "500px",
        minHeight: "48px",
        borderRadius: "8px",
        borderLeft: `4px solid ${currentStyle.borderColor}`,
        padding: "12px 16px",
        margin: "8px",
        fontSize: "14px",
        lineHeight: "1.5",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: currentStyle.borderColor,
            width: "0%",
          }}
        />
      </div>
      <span
        style={{
          marginRight: "12px",
          fontSize: "18px",
          color: currentStyle.iconColor,
          display: "flex",
          alignItems: "center",
        }}
      >
        {currentStyle.icon}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{message}</div>
        {description && (
          <div
            style={{
              fontSize: "13px",
              marginTop: "4px",
              opacity: 0.85,
            }}
          >
            {description}
          </div>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: "rgba(0, 0, 0, 0.05)",
            border: "none",
            color: "inherit",
            padding: "6px 12px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            borderRadius: "4px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.05)";
          }}
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          fontSize: "18px",
          marginLeft: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          padding: 0,
          position: "relative",
          zIndex: 2,
          opacity: 0.5,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.8";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "0.5";
        }}
      >
        X
      </button>
    </div>
  );
}
