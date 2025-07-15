import React, { useEffect, useRef } from "react";
import { variantStyles, animations, effects } from "./styles";
import anime from "animejs";

const GlitchText = ({ text, intensity = 0.3 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    let timeout;

    const glitch = () => {
      if (!element) return;

      const originalText = text;
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const glitchLength = Math.floor(text.length * intensity);
      const positions = Array.from({ length: glitchLength }, () =>
        Math.floor(Math.random() * text.length)
      );

      positions.forEach((pos) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        element.textContent =
          originalText.substring(0, pos) +
          char +
          originalText.substring(pos + 1);
      });

      timeout = setTimeout(() => {
        element.textContent = originalText;
        timeout = setTimeout(glitch, Math.random() * 2000 + 1000);
      }, 50);
    };

    const interval = setInterval(glitch, Math.random() * 5000 + 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, intensity]);

  return <span ref={textRef}>{text}</span>;
};

const Scanline = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.04) 2px,
        rgba(255, 255, 255, 0.04) 4px
      )`,
      pointerEvents: "none",
      mixBlendMode: "overlay",
    }}
  />
);

const NeonBorder = ({ colors }) => {
  const borderRef = useRef(null);

  useEffect(() => {
    const animation = anime({
      targets: borderRef.current,
      background: [
        `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
        `linear-gradient(180deg, ${colors[1]}, ${colors[0]})`,
        `linear-gradient(270deg, ${colors[0]}, ${colors[1]})`,
        `linear-gradient(360deg, ${colors[1]}, ${colors[0]})`,
      ],
      duration: 4000,
      easing: "linear",
      loop: true,
    });

    return () => animation.pause();
  }, [colors]);

  return (
    <div
      ref={borderRef}
      style={{
        position: "absolute",
        inset: "-2px",
        borderRadius: "14px",
        opacity: 0.5,
        zIndex: -1,
      }}
    />
  );
};

export default function CyberpunkToast({
  message,
  description,
  variant = "default",
  onClose,
  style,
  ...props
}) {
  const cyberpunkStyle = variantStyles.cyberpunk;
  const glowColors = cyberpunkStyle.glowColors[variant];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "auto",
        maxWidth: "420px",
        minHeight: "48px",
        padding: "16px 24px",
        background: "rgba(10, 12, 18, 0.95)",
        backdropFilter: `blur(${effects.blur.medium})`,
        borderRadius: "12px",
        color: "#ffffff",
        boxShadow: `
          ${effects.shadow.lg},
          0 0 20px ${glowColors[0]}33,
          0 0 40px ${glowColors[1]}22,
          inset 0 0 20px rgba(0, 0, 0, 0.5)
        `,
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <NeonBorder colors={glowColors} />
      <Scanline />

      <div
        style={{
          position: "relative",
          flex: 1,
          zIndex: 1,
          textShadow: `0 0 8px ${glowColors[0]}66`,
        }}
      >
        <div style={{ fontWeight: 600 }}>
          <GlitchText
            text={message}
            intensity={cyberpunkStyle.glitchIntensity}
          />
        </div>
        {description && (
          <div
            style={{
              marginTop: "4px",
              fontSize: "14px",
              opacity: 0.8,
            }}
          >
            <GlitchText
              text={description}
              intensity={cyberpunkStyle.glitchIntensity * 0.5}
            />
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        style={{
          position: "relative",
          zIndex: 1,
          background: "transparent",
          border: "none",
          color: "inherit",
          padding: "4px",
          marginLeft: "12px",
          cursor: "pointer",
          opacity: 0.7,
          transition: "opacity 0.2s, text-shadow 0.2s",
          textShadow: `0 0 4px ${glowColors[1]}44`,
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "1";
          e.target.style.textShadow = `0 0 8px ${glowColors[1]}88`;
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "0.7";
          e.target.style.textShadow = `0 0 4px ${glowColors[1]}44`;
        }}
      >
        ✕
      </button>
    </div>
  );
}
