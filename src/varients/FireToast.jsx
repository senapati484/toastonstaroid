import React, { useEffect, useRef } from "react";
import anime from "animejs";

const Flames = () => {
  const flamesRef = useRef(null);

  useEffect(() => {
    const flames = flamesRef.current.children;

    anime({
      targets: flames,
      translateY: function () {
        return anime.random(-15, -30);
      },
      translateX: function () {
        return anime.random(-5, 5);
      },
      scale: function () {
        return anime.random(1, 1.5);
      },
      opacity: [
        { value: 0.9, duration: 100 },
        { value: 0.5, duration: 300 },
        { value: 0.8, duration: 200 },
      ],
      rotate: function () {
        return anime.random(-15, 15);
      },
      duration: function () {
        return anime.random(900, 1300);
      },
      delay: function () {
        return anime.random(0, 300);
      },
      loop: true,
      easing: "easeInOutSine",
      direction: "alternate",
    });
  }, []);

  return (
    <div
      ref={flamesRef}
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
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${i * 15}%`,
            width: "30px",
            height: "30px",
            background:
              "radial-gradient(circle at 50% 0%, rgba(255, 87, 34, 0.8), rgba(255, 0, 0, 0) 70%)",
            filter: "blur(2px)",
            transform: "translateY(0)",
          }}
        />
      ))}
    </div>
  );
};

export default function FireToast({
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
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
    });

    // Text burning effect
    anime({
      targets: contentRef.current,
      textShadow: [
        {
          value:
            "0 0 5px rgba(255, 87, 34, 0.8), 0 0 10px rgba(255, 87, 34, 0.5)",
          duration: 500,
        },
        {
          value:
            "0 0 10px rgba(255, 87, 34, 0.8), 0 0 20px rgba(255, 87, 34, 0.5)",
          duration: 500,
        },
      ],
      opacity: [0.8, 1],
      duration: 1000,
      loop: true,
      direction: "alternate",
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
        background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
        color: "#FFFFFF",
        boxShadow:
          "0 8px 16px rgba(255, 87, 34, 0.2), 0 0 20px rgba(255, 87, 34, 0.4)",
        width: "420px",
        maxWidth: "90vw",
        minHeight: "60px",
        borderRadius: "12px",
        padding: "16px 24px",
        margin: "8px",
        fontSize: "16px",
        lineHeight: "1.5",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 87, 34, 0.3)",
        ...style,
      }}
      {...rest}
    >
      <Flames />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(255, 87, 34, 0.3)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(255, 87, 34, 0.9)",
            width: "0%",
          }}
        />
      </div>
      <span
        style={{
          marginRight: "16px",
          fontSize: "24px",
          filter: "drop-shadow(0 2px 4px rgba(255, 87, 34, 0.5))",
        }}
      >
        🔥
      </span>
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
            fontWeight: 600,
            textShadow: "0 0 8px rgba(255, 87, 34, 0.8)",
          }}
        >
          {message}
        </div>
        {description && (
          <div
            style={{
              fontSize: "14px",
              marginTop: "4px",
              opacity: 0.9,
              textShadow: "0 0 5px rgba(255, 87, 34, 0.5)",
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
            background: "rgba(255, 87, 34, 0.2)",
            border: "1px solid rgba(255, 87, 34, 0.3)",
            color: "inherit",
            padding: "8px 16px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "6px",
            transition: "all 0.2s ease",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 87, 34, 0.3)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 87, 34, 0.2)";
            e.target.style.transform = "scale(1)";
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
          textShadow: "0 0 5px rgba(255, 87, 34, 0.8)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.textShadow = "0 0 8px rgba(255, 87, 34, 1)";
          e.target.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.target.style.textShadow = "0 0 5px rgba(255, 87, 34, 0.8)";
          e.target.style.opacity = "0.7";
        }}
      >
        ×
      </button>
    </div>
  );
}
