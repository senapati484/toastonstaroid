import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { variantStyles, animations, dimensions, effects } from "./styles";

const WindParticles = ({ variant = "default" }) => {
  const particleRef = useRef(null);

  useEffect(() => {
    const particles = Array.from({ length: 20 }).map(() => {
      const particle = document.createElement("div");
      particle.className = "wind-particle";
      particleRef.current?.appendChild(particle);
      return particle;
    });

    const animations = particles.map((particle) => {
      return anime({
        targets: particle,
        translateX: [-300, window.innerWidth + 300],
        translateY: () => anime.random(-20, 20),
        opacity: [
          { value: 0, duration: 0 },
          { value: 0.8, duration: 200 },
          { value: 0, duration: 800 },
        ],
        scale: () => anime.random(0.5, 2),
        easing: "cubicBezier(.21,1.02,.73,1)",
        duration: () => anime.random(1000, 2000),
        delay: () => anime.random(0, 2000),
        loop: true,
      });
    });

    return () => animations.forEach((anim) => anim.pause());
  }, []);

  return (
    <div className="wind-effect">
      <div ref={particleRef} className="particles" />
      <style>
        {`
          .wind-effect {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }

          .wind-particle {
            position: absolute;
            width: 40px;
            height: 2px;
            background: ${variantStyles.wind.particleColors[variant]};
            filter: blur(3px);
            transform-origin: left center;
            opacity: 0;
          }

          .wind-effect::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at center,
              transparent 30%,
              ${variantStyles.wind.particleColors[variant]} 100%
            );
            opacity: 0.1;
          }
        `}
      </style>
    </div>
  );
};

export default function WindToast({
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
    // Entrance animation
    anime({
      targets: toastRef.current,
      translateX: [100, 0],
      opacity: [0, 1],
      duration: animations.slideIn.duration,
      easing: animations.slideIn.easing,
    });

    // Content swaying animation
    anime({
      targets: contentRef.current,
      translateX: [-5, 0],
      duration: 1500,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });

    // Progress bar
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
        width: dimensions.width,
        maxWidth: dimensions.maxWidth,
        minHeight: dimensions.minHeight,
        padding: dimensions.padding,
        margin: dimensions.margin,
        borderRadius: dimensions.borderRadius,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: `blur(${effects.blur.medium})`,
        color: "#FFFFFF",
        boxShadow: effects.shadow.lg,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      <WindParticles variant={variant} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(255, 255, 255, 0.3)",
            width: "0%",
          }}
        />
      </div>
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
          <div
            style={{
              fontSize: "14px",
              marginTop: "4px",
              opacity: 0.8,
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
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
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
            backdropFilter: `blur(${effects.blur.light})`,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255,255,255,0.2)";
            e.target.style.transform = "translateX(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255,255,255,0.1)";
            e.target.style.transform = "translateX(0)";
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
          marginLeft: dimensions.spacing.buttons,
          cursor: "pointer",
          fontSize: "18px",
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
    </div>
  );
}
