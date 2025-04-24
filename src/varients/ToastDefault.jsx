import React from "react";

const styles = {
  success: {
    background: "#ECFDF5",
    borderColor: "#10B981",
    color: "#065F46",
    icon: "✓",
    iconColor: "#10B981",
  },
  error: {
    background: "#FEF2F2",
    borderColor: "#EF4444",
    color: "#991B1B",
    icon: "✕",
    iconColor: "#EF4444",
  },
  warning: {
    background: "#FFFBEB",
    borderColor: "#F59E0B",
    color: "#92400E",
    icon: "⚠",
    iconColor: "#F59E0B",
  },
  info: {
    background: "#EFF6FF",
    borderColor: "#3B82F6",
    color: "#1E40AF",
    icon: "ℹ",
    iconColor: "#3B82F6",
  },
  default: {
    background: "#F9FAFB",
    borderColor: "#E5E7EB",
    color: "#1F2937",
    icon: "•",
    iconColor: "#6B7280",
  },
};

export default function ToastDefault({
  message,
  variant = "default",
  style = {},
  description,
  action,
  onClose,
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
        transition: "all 0.2s ease",
        transform: "translateY(0)",
        opacity: 1,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          marginRight: "12px",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          color: currentStyle.iconColor,
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
          onMouseEnter={(e) =>
            (e.target.style.background = "rgba(0, 0, 0, 0.1)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "rgba(0, 0, 0, 0.05)")
          }
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
          opacity: 0.5,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.target.style.opacity = "0.5")}
      >
        ×
      </button>
    </div>
  );
}
