import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { variantStyles } from "./styles";

const FireParticle = ({ x, y, color }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      bottom: y,
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      backgroundColor: color,
      filter: "blur(1px)",
    }}
  />
);

const FireToast = ({
  message,
  description,
  variant = "default",
  onClose,
  style,
  ...props
}) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const particleColors = ["#ff6b6b", "#ffd93d", "#ff9f43"];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles = [];
    const numParticles = 20;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor =
        particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.filter = "blur(1px)";
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    const animation = anime({
      targets: particles,
      translateY: function () {
        return anime.random(-40, -10);
      },
      translateX: function () {
        return anime.random(-20, 20);
      },
      scale: [1, 0],
      opacity: [1, 0],
      easing: "easeOutExpo",
      duration: function () {
        return anime.random(1000, 1500);
      },
      delay: function () {
        return anime.random(0, 400);
      },
      loop: true,
    });

    particlesRef.current = particles;

    return () => {
      animation.pause();
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        padding: "16px 24px",
        background: "rgba(255, 107, 107, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        color: "#ffffff",
        boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontWeight: 600 }}>{message}</div>
        {description && (
          <div style={{ marginTop: "4px", fontSize: "14px", opacity: 0.9 }}>
            {description}
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "transparent",
          border: "none",
          color: "inherit",
          padding: "4px",
          cursor: "pointer",
          opacity: 0.7,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "1")}
        onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
      >
        ✕
      </button>
    </div>
  );
};

export default FireToast;
