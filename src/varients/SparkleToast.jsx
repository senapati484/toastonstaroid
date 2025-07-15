import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { variantStyles, animations, dimensions, effects } from "./styles";

const Sparkles = ({ variant = "default" }) => {
  const sparkleRef = useRef(null);

  useEffect(() => {
    const sparkles = Array.from({ length: 15 }).map(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkleRef.current?.appendChild(sparkle);
      return sparkle;
    });

    const animations = sparkles.map((sparkle) => {
      const randomX = anime.random(-100, 100);
      const randomY = anime.random(-100, 100);

      return anime({
        targets: sparkle,
        translateX: [0, randomX],
        translateY: [0, randomY],
        scale: [
          { value: 0, duration: 0 },
          { value: 1, duration: 300 },
          { value: 0, duration: 300 },
        ],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 200 },
          { value: 0, duration: 400 },
        ],
        rotate: anime.random(-45, 45),
        easing: "easeOutExpo",
        duration: 1000,
        delay: anime.random(0, 1000),
        loop: true,
      });
    });

    return () => animations.forEach((anim) => anim.pause());
  }, []);

  return (
    <div className="sparkle-effect">
      <div ref={sparkleRef} className="sparkles" />
      <style>
        {`
          .sparkle-effect {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }

          .sparkle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${variantStyles.sparkle?.colors?.[variant] || "#FFD700"};
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            transform-origin: center;
            opacity: 0;
          }

          .sparkle-effect::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at center,
              rgba(255, 215, 0, 0.1) 0%,
              transparent 70%
            );
            z-index: -1;
          }
        `}
      </style>
    </div>
  );
};

export default function SparkleToast({
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
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: animations.slideIn.duration,
      easing: "easeOutElastic(1, .5)",
    });

    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: animations.progressBar.duration,
        easing: animations.progressBar.easing,
      });
    }

    // Subtle sparkle effect on content
    anime({
      targets: contentRef.current,
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
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
          "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 223, 67, 0.1) 100%)",
        backdropFilter: `blur(${effects.blur.medium})`,
        color: "#FFFFFF",
        boxShadow: "0 8px 32px rgba(255, 215, 0, 0.2), " + effects.shadow.lg,
        border: "1px solid rgba(255, 215, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      <Sparkles variant={variant} />
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
            background: "rgba(255, 215, 0, 0.2)",
            border: "1px solid rgba(255, 215, 0, 0.3)",
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
            e.target.style.background = "rgba(255, 215, 0, 0.3)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 215, 0, 0.2)";
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
          background: "rgba(255, 215, 0, 0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(255, 215, 0, 0.3)",
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}
