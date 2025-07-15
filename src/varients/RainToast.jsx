import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { variantStyles, animations, dimensions, effects } from "./styles";

const RainDrops = ({ variant = "default" }) => {
  const rainRef = useRef(null);

  useEffect(() => {
    const drops = Array.from({ length: 30 }).map(() => {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      rainRef.current?.appendChild(drop);
      return drop;
    });

    const animations = drops.map((drop) => {
      return anime({
        targets: drop,
        translateY: ["-100%", "1000%"],
        translateX: () => anime.random(-20, 20),
        opacity: [
          { value: 0, duration: 0 },
          { value: 0.7, duration: 200 },
          { value: 0, duration: 800 },
        ],
        scale: () => anime.random(0.5, 1.5),
        easing: "linear",
        duration: () => anime.random(1000, 1500),
        delay: () => anime.random(0, 1000),
        loop: true,
      });
    });

    return () => animations.forEach((anim) => anim.pause());
  }, []);

  return (
    <div className="rain-effect">
      <div ref={rainRef} className="drops" />
      <style>
        {`
          .rain-effect {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }

          .rain-drop {
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(
              to bottom,
              transparent,
              ${variantStyles.rain?.dropColors?.[variant] || "#64B5F6"}
            );
            filter: blur(1px);
            opacity: 0;
          }

          .rain-effect::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at center,
              rgba(100, 181, 246, 0.1) 0%,
              transparent 70%
            );
            z-index: -1;
          }
        `}
      </style>
    </div>
  );
};

export default function RainToast({
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
  const contentRef = useRef(null);

  useEffect(() => {
    anime({
      targets: toastRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: animations.slideIn.duration,
      easing: "easeOutExpo",
    });

    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: animations.progressBar.duration,
        easing: animations.progressBar.easing,
      });
    }

    // Subtle content movement
    anime({
      targets: contentRef.current,
      translateY: [-2, 2],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  return (
    <div
      ref={toastRef}
      style={{
        display: "flex",
        alignItems: "center",
        width: dimensions.width,
        maxWidth: dimensions.maxWidth,
        minHeight: dimensions.minHeight,
        padding: dimensions.padding,
        margin: dimensions.margin,
        borderRadius: dimensions.borderRadius,
        background:
          "linear-gradient(135deg, rgba(100, 181, 246, 0.2) 0%, rgba(30, 136, 229, 0.15) 100%)",
        backdropFilter: `blur(${effects.blur.medium})`,
        color: "#FFFFFF",
        boxShadow: `0 8px 32px rgba(100, 181, 246, 0.2), ${effects.shadow.lg}`,
        border: "1px solid rgba(100, 181, 246, 0.2)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      <RainDrops variant={variant} />
      <div
        ref={contentRef}
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ fontWeight: 500 }}>{message}</div>
        {description && (
          <div style={{ fontSize: "14px", marginTop: "4px", opacity: 0.8 }}>
            {description}
          </div>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: "rgba(100, 181, 246, 0.2)",
            border: "1px solid rgba(100, 181, 246, 0.3)",
            color: "#fff",
            padding: "8px 16px",
            marginLeft: dimensions.spacing.buttons,
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.3s ease",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(100, 181, 246, 0.3)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(100, 181, 246, 0.2)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          padding: "4px",
          marginLeft: dimensions.spacing.buttons,
          cursor: "pointer",
          opacity: 0.7,
          transition: "opacity 0.2s",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "1")}
        onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
      >
        ✕
      </button>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(100, 181, 246, 0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(100, 181, 246, 0.3)",
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}
