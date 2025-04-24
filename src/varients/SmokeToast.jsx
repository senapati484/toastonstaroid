import React, { useEffect, useRef } from "react";
import anime from "animejs";

const SmokeParticles = () => {
  const smokeRef = useRef(null);

  useEffect(() => {
    const particles = smokeRef.current.children;

    const animations = Array.from(particles).map((particle, index) => {
      return anime({
        targets: particle,
        translateY: [
          {
            value: -50 - anime.random(0, 50),
            duration: anime.random(2000, 3000),
            easing: "easeOutCubic",
          },
          {
            value: -150 - anime.random(0, 100),
            duration: anime.random(3000, 4000),
            easing: "easeInOutQuad",
          },
        ],
        translateX: [
          {
            value: anime.random(-30, 30),
            duration: anime.random(2000, 3000),
            easing: "easeOutSine",
          },
          {
            value: anime.random(-50, 50),
            duration: anime.random(3000, 4000),
            easing: "easeInOutQuad",
          },
        ],
        scale: [
          { value: 0, duration: 0 },
          { value: 1, duration: 500, easing: "easeOutCubic" },
          {
            value: anime.random(1.5, 2.5),
            duration: 4000,
            easing: "easeInOutQuad",
          },
        ],
        opacity: [
          { value: 0, duration: 0 },
          { value: anime.random(0.3, 0.6), duration: 500 },
          { value: 0, duration: 3500, easing: "easeInQuad" },
        ],
        delay: anime.random(0, 2000),
        loop: true,
      });
    });

    return () => {
      animations.forEach((anim) => anim.pause());
    };
  }, []);

  return (
    <div
      ref={smokeRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: anime.random(-10, 10),
            left: `${anime.random(0, 100)}%`,
            width: anime.random(40, 80),
            height: anime.random(40, 80),
            background:
              "radial-gradient(circle at 50% 50%, rgba(150, 150, 150, 0.8), rgba(150, 150, 150, 0) 70%)",
            filter: "blur(8px)",
            borderRadius: "50%",
            transform: "translateY(0) scale(0)",
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default function SmokeToast({
  message,
  style = {},
  description,
  action,
  onClose,
  ...rest
}) {
  const toastRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    anime({
      targets: toastRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
    });

    // Text fade effect
    anime({
      targets: contentRef.current,
      opacity: [0.8, 1],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });

    // Progress bar
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: rest.duration || 5000,
        easing: "linear",
      });
    }
  }, []);

  return (
    <div
      ref={toastRef}
      style={{
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #2c3e50, #34495e)",
        color: "#FFFFFF",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
        width: "320px",
        maxWidth: "90vw",
        minHeight: "60px",
        borderRadius: "12px",
        padding: "16px 24px",
        margin: "8px",
        fontSize: "16px",
        lineHeight: "1.5",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        ...style,
      }}
      {...rest}
    >
      <SmokeParticles />
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
      {/* <span
        style={{
          marginRight: "16px",
          fontSize: "24px",
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
          opacity: 0.9,
        }}
      >
        💨
      </span> */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontWeight: 500,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {message}
        </div>
        {description && (
          <div
            style={{
              fontSize: "14px",
              marginTop: "4px",
              opacity: 0.8,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
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
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "inherit",
            padding: "8px 16px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "6px",
            transition: "all 0.3s ease",
            position: "relative",
            zIndex: 1,
            backdropFilter: "blur(5px)",
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
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "18px",
          marginLeft: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          padding: 0,
          position: "relative",
          zIndex: 2,
          opacity: 0.7,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "0.7";
        }}
      >
        X
      </button>
      {/* <button
        onClick={onClose}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "inherit",
          padding: "8px 16px",
          marginLeft: "16px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "6px",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(5px)",
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
      </button> */}
    </div>
  );
}
