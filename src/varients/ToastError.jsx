import React from "react";
import { variantStyles } from "./styles";

export default function ToastError({
  message,
  style = {},
  icon = variantStyles.error.icon,
  description,
  action,
  ...rest
}) {
  const styles = variantStyles.error;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: styles.background,
        color: styles.color,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "356px",
        borderRadius: "12px",
        padding: "16px",
        gap: "4px",
        border: `1px solid ${styles.borderColor}`,
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
            gap: "4px",
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
                  fontSize: "16px",
                  color: styles.iconColor,
                  fontWeight: "bold",
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
              padding: "0",
              margin: "0",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              color: styles.color,
              textDecoration: "underline",
              opacity: 0.8,
              transition: "opacity 0.2s",
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
