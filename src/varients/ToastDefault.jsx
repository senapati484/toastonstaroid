import React from "react";

const styles = {
  success: {
    background: "#10B981",
    color: "#FFFFFF",
    icon: "✓",
  },
  error: {
    background: "#EF4444",
    color: "#FFFFFF",
    icon: "✕",
  },
  warning: {
    background: "#F59E0B",
    color: "#FFFFFF",
    icon: "⚠",
  },
  info: {
    background: "#3B82F6",
    color: "#FFFFFF",
    icon: "ℹ",
  },
  default: {
    background: "#1F2937",
    color: "#FFFFFF",
    icon: "•",
  },
};

export default function ToastDefault({
  message,
  variant = "default",
  style = {},
  description,
  action,
  ...rest
}) {
  const currentStyle = styles[variant] || styles.default;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: currentStyle.background,
        color: currentStyle.color,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        minWidth: "300px",
        maxWidth: "500px",
        minHeight: "48px",
        borderRadius: "6px",
        padding: "12px 24px",
        margin: "8px",
        fontSize: "16px",
        lineHeight: "1.5",
        transition: "all 0.3s ease",
        transform: "translateY(0)",
        opacity: 1,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          marginRight: "12px",
          fontSize: "20px",
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
              fontSize: "14px",
              marginTop: "4px",
              opacity: 0.9,
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
            background: "none",
            border: "none",
            color: "inherit",
            padding: "8px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            opacity: 0.9,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "1")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.9")}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
