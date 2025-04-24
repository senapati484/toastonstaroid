import React from "react";
import { variantStyles } from "./styles";

export default function ToastDefault({
  message,
  style = {},
  icon = variantStyles.default.icon,
  description,
  action,
  ...rest
}) {
  const styles = variantStyles.default;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: styles.background,
        color: styles.color,
        boxShadow: `0 4px 12px ${styles.shadowColor}, 0 1px 2px rgba(0, 0, 0, 0.04)`,
        width: "356px",
        borderRadius: "8px",
        padding: "12px",
        gap: "4px",
        border: `1px solid ${styles.borderColor}`,
        transition: "all 0.2s ease",
        willChange: "transform, opacity, filter",
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {icon && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15px",
                  color: styles.iconColor,
                  fontWeight: "bold",
                  lineHeight: "1",
                }}
              >
                {icon}
              </span>
            )}
            <span
              style={{
                fontWeight: 500,
                fontSize: "14px",
                color: styles.color,
                lineHeight: "1.4",
              }}
            >
              {message}
            </span>
          </div>
          {description && (
            <span
              style={{
                fontSize: "13px",
                color: styles.descriptionColor,
                lineHeight: "1.4",
                marginTop: "2px",
              }}
            >
              {description}
            </span>
          )}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            style={{
              background: "none",
              border: "none",
              padding: "2px 0",
              margin: "0",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
              color: styles.color,
              opacity: 0.8,
              transition: "opacity 0.2s",
              textDecoration: "none",
              ":hover": {
                opacity: 1,
              },
            }}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
