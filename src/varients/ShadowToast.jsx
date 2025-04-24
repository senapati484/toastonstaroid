import React, { useEffect, useRef } from "react";
import anime from "animejs";

const variantStyles = {
  success: {
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    color: "#FFFFFF",
    shadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
  },
  error: {
    background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    color: "#FFFFFF",
    shadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
  },
  warning: {
    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    color: "#FFFFFF",
    shadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
  },
  info: {
    background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    color: "#FFFFFF",
    shadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
  },
  default: {
    background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
    color: "#FFFFFF",
    shadow: "0 8px 32px rgba(31, 41, 55, 0.3)",
  },
};

const ShadowToast = ({
  message,
  description,
  action,
  variant = "default",
  duration = 4000,
  onClose,
  style = {},
}) => {
  const toastRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      anime({
        targets: toastRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutExpo",
      });
    }
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: "100%",
        duration: duration,
        easing: "linear",
      });
    }
  }, [duration]);

  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div
      ref={toastRef}
      style={{
        position: "relative",
        width: "420px",
        maxWidth: "90vw",
        padding: "16px",
        borderRadius: "12px",
        background: styles.background,
        color: styles.color,
        boxShadow: styles.shadow,
        marginBottom: "12px",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: styles.color,
            }}
          >
            {message}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: styles.color,
              cursor: "pointer",
              padding: "4px",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            ✕
          </button>
        </div>
        {description && (
          <div
            style={{
              fontSize: "14px",
              color: styles.color,
              opacity: 0.8,
            }}
          >
            {description}
          </div>
        )}
        {action && (
          <button
            onClick={action.onClick}
            style={{
              alignSelf: "flex-start",
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: styles.color,
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
            }
          >
            {action.label}
          </button>
        )}
      </div>
      <div
        ref={progressRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          background: "rgba(255, 255, 255, 0.3)",
          width: "0%",
        }}
      />
    </div>
  );
};

export default ShadowToast;
