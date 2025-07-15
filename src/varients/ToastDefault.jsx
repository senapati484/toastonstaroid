import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { variantStyles, animations, dimensions, effects } from "./styles";

const StatusIndicator = ({ variant }) => {
  const indicatorRef = useRef(null);

  useEffect(() => {
    anime({
      targets: indicatorRef.current,
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutElastic(1, .6)",
    });
  }, []);

  return (
    <div
      ref={indicatorRef}
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: variantStyles.glass[variant].color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "12px",
        opacity: 0,
        boxShadow: `0 0 12px ${variantStyles.glass[variant].color}40`,
      }}
    >
      {variant === "success" && "✓"}
      {variant === "error" && "✕"}
      {variant === "warning" && "!"}
      {variant === "info" && "i"}
    </div>
  );
};

const ProgressRing = ({ progress, color }) => (
  <div className="progress-ring">
    <style>
      {`
        .progress-ring {
          width: 24px;
          height: 24px;
          position: relative;
        }
        
        .progress-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(
            ${color} ${progress}%,
            transparent ${progress}%
          );
          mask: radial-gradient(farthest-side, transparent 70%, black 71%);
          -webkit-mask: radial-gradient(farthest-side, transparent 70%, black 71%);
        }
      `}
    </style>
  </div>
);

export default function ToastDefault({
  message,
  description,
  action,
  variant = "default",
  onClose,
  style = {},
  ...rest
}) {
  const toastRef = useRef(null);
  const progressRef = useRef(null);
  const currentStyle =
    variantStyles.glass[variant] || variantStyles.glass.default;

  useEffect(() => {
    // Entrance animation
    anime({
      targets: toastRef.current,
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: animations.slideIn.duration,
      easing: animations.slideIn.easing,
    });

    // Progress bar animation
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: animations.progressBar.duration,
        easing: animations.progressBar.easing,
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
        width: dimensions.width,
        maxWidth: dimensions.maxWidth,
        minHeight: dimensions.minHeight,
        borderRadius: dimensions.borderRadius,
        padding: dimensions.padding,
        margin: dimensions.margin,
        position: "relative",
        overflow: "hidden",
        backdropFilter: `blur(${effects.blur.medium})`,
        boxShadow: effects.shadow.lg,
        transform: "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = effects.shadow.xl;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = effects.shadow.lg;
      }}
      {...rest}
    >
      <StatusIndicator variant={variant} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, letterSpacing: "0.3px" }}>{message}</div>
        {description && (
          <div
            style={{
              fontSize: "14px",
              marginTop: "4px",
              opacity: 0.9,
              letterSpacing: "0.2px",
            }}
          >
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: dimensions.spacing.buttons,
        }}
      >
        {action && (
          <button
            onClick={action.onClick}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: `blur(${effects.blur.light})`,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "inherit",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            {action.label}
          </button>
        )}
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "inherit",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease",
            backdropFilter: `blur(${effects.blur.light})`,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.transform = "rotate(0deg)";
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: currentStyle.color,
            width: "0%",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
