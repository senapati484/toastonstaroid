import React from "react";

export default function ToastDefault({
  message,
  style = {},
  icon = "",
  size = "large",
  shape = "rounded",
  ...rest
}) {
  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return { padding: "16px 24px", fontSize: "14px" };
      case "medium":
        return { padding: "20px 28px", fontSize: "16px" };
      case "large":
      default:
        return { padding: "24px 32px", fontSize: "16px" };
    }
  };

  const getShapeStyle = () => {
    switch (shape) {
      case "square":
        return { borderRadius: "0" };
      case "pill":
        return { borderRadius: "9999px" };
      case "rounded":
      default:
        return { borderRadius: "12px" };
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        background: "hsl(0 0% 100%)",
        color: "hsl(240 10% 3.9%)",
        boxShadow:
          "0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)",
        minWidth: "356px",
        maxWidth: "500px",
        borderRadius: "8px",
        border: "1px solid hsl(240 5.9% 90%)",
        padding: "16px",
        ...getSizeStyle(),
        ...getShapeStyle(),
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: "hsl(240 5.9% 10%)",
          }}
        >
          {icon}
        </span>
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontWeight: 500,
            lineHeight: 1.5,
            color: "hsl(240 10% 3.9%)",
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
}
