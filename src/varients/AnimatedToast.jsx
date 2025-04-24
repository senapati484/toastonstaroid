import React, { useEffect, useRef } from "react";
import anime from "animejs";

const styles = {
  success: {
    gradient: "linear-gradient(135deg, #00b09b, #96c93d)",
    icon: "✨",
  },
  error: {
    gradient: "linear-gradient(135deg, #ff6b6b, #ff4757)",
    icon: "💥",
  },
  warning: {
    gradient: "linear-gradient(135deg, #ffd93d, #ff9f43)",
    icon: "⚡",
  },
  info: {
    gradient: "linear-gradient(135deg, #2196f3, #4fc3f7)",
    icon: "🌟",
  },
  magic: {
    gradient: "linear-gradient(135deg, #8e2de2, #4a00e0)",
    icon: "🔮",
  },
};

export default function AnimatedToast({
  message,
  variant = "info",
  style = {},
  description,
  action,
  animation = "ripple",
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
            scale: [0.9, 1],
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 800,
            easing: "spring(1, 80, 10, 0)",
          });
          break;
        case "bounce":
          anime({
            targets: toastRef.current,
            translateY: [-40, 0],
            duration: 1200,
            easing: "spring(1, 80, 10, 0)",
          });
          break;
        case "spin":
          anime({
            targets: toastRef.current,
            rotateY: [90, 0],
            opacity: [0, 1],
            duration: 800,
            easing: "easeOutElastic(1, .6)",
          });
          break;
        case "glitch":
          anime
            .timeline({
              targets: toastRef.current,
              duration: 800,
            })
            .add({
              translateX: [-10, 0],
              opacity: [0, 1],
              skewX: [20, 0],
              easing: "easeOutElastic(1, .6)",
            });
          break;
        default:
          anime({
            targets: toastRef.current,
            opacity: [0, 1],
            duration: 400,
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
        background: currentStyle.gradient,
        color: "#FFFFFF",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        minWidth: "300px",
        maxWidth: "500px",
        minHeight: "60px",
        borderRadius: "12px",
        padding: "16px 24px",
        margin: "8px",
        fontSize: "16px",
        lineHeight: "1.5",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(8px)",
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
          background: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(255, 255, 255, 0.9)",
            width: "0%",
          }}
        />
      </div>
      <span
        style={{
          marginRight: "16px",
          fontSize: "24px",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
        }}
      >
        {currentStyle.icon}
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{ fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
        >
          {message}
        </div>
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
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            color: "inherit",
            padding: "8px 16px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "6px",
            transition: "all 0.2s ease",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.3)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "scale(1)";
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
