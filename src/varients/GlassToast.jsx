import React, { useEffect, useRef } from "react";
import anime from "animejs";

const styles = {
  success: {
    background: "rgba(16, 185, 129, 0.1)",
    color: "#10B981",
    border: "1px solid rgba(16, 185, 129, 0.2)",
  },
  error: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#EF4444",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  warning: {
    background: "rgba(245, 158, 11, 0.1)",
    color: "#F59E0B",
    border: "1px solid rgba(245, 158, 11, 0.2)",
  },
  info: {
    background: "rgba(59, 130, 246, 0.1)",
    color: "#3B82F6",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },
  default: {
    background: "rgba(31, 41, 55, 0.1)",
    color: "#1F2937",
    border: "1px solid rgba(31, 41, 55, 0.2)",
  },
};

export default function GlassToast({
  message,
  variant = "default",
  style = {},
  description,
  action,
  onClose,
  ...rest
}) {
  const toastRef = useRef(null);
  const currentStyle = styles[variant] || styles.default;

  useEffect(() => {
    if (toastRef.current) {
      anime({
        targets: toastRef.current,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: "cubicBezier(.21,1.02,.73,1)",
      });
    }
  }, []);

  return (
    <div
      ref={toastRef}
      style={{
        display: "flex",
        alignItems: "center",
        background: currentStyle.background,
        color: currentStyle.color,
        border: currentStyle.border,
        width: "420px",
        minHeight: "48px",
        borderRadius: "16px",
        padding: "16px 20px",
        margin: "8px",
        fontSize: "14px",
        lineHeight: "1.5",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "@media (max-width: 640px)": {
          width: "calc(100vw - 32px)",
        },
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
      }}
      {...rest}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, letterSpacing: "0.3px" }}>{message}</div>
        {description && (
          <div
            style={{
              fontSize: "13px",
              marginTop: "4px",
              opacity: 0.9,
              letterSpacing: "0.2px",
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
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "inherit",
            padding: "8px 16px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "12px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.3)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onClose}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "inherit",
          width: "28px",
          height: "28px",
          borderRadius: "10px",
          marginLeft: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          padding: 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.3)";
          e.target.style.transform = "scale(1.1) rotate(90deg)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "scale(1) rotate(0deg)";
        }}
      >
        ×
      </button>
    </div>
  );
}
