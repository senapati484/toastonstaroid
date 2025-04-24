import React, { useEffect, useRef } from "react";
import anime from "animejs";

const GlitchText = ({ text }) => {
  return (
    <div className="glitch-wrapper" style={{ position: "relative" }}>
      <div className="glitch-text" data-text={text}>
        {text}
      </div>
      <style>
        {`
          .glitch-text {
            position: relative;
            animation: glitch 2s infinite;
          }
          
          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
          }
          
          .glitch-text::before {
            animation: glitch-effect 3s infinite;
            color: #0ff;
            z-index: -1;
          }
          
          .glitch-text::after {
            animation: glitch-effect 2s infinite;
            color: #f0f;
            z-index: -2;
          }
          
          @keyframes glitch-effect {
            0% {
              transform: translate(0);
            }
            20% {
              transform: translate(-3px, 3px);
            }
            40% {
              transform: translate(-3px, -3px);
            }
            60% {
              transform: translate(3px, 3px);
            }
            80% {
              transform: translate(3px, -3px);
            }
            100% {
              transform: translate(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const NeonBorder = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "12px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-1px",
          padding: "1px",
          borderRadius: "12px",
          background: "linear-gradient(45deg, #0ff, #f0f, #0ff)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "borderRotate 4s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes borderRotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default function CyberpunkToast({
  message,
  style = {},
  description,
  action,
  onClose,
  ...rest
}) {
  const toastRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    anime({
      targets: toastRef.current,
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
    });

    // Progress bar animation with cyber effect
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: rest.duration || 5000,
        easing: "steps(50)",
      });
    }

    // Add random glitch effects
    const glitchAnimation = anime.timeline({
      loop: true,
      autoplay: true,
    });

    glitchAnimation.add({
      targets: toastRef.current,
      translateX: [
        { value: -5, duration: 50, delay: anime.random(2000, 4000) },
        { value: 0, duration: 50 },
      ],
      translateY: [
        { value: 5, duration: 50, delay: anime.random(2000, 4000) },
        { value: 0, duration: 50 },
      ],
      filter: [
        { value: "brightness(150%) contrast(110%)", duration: 50 },
        { value: "brightness(100%) contrast(100%)", duration: 50 },
      ],
    });

    return () => {
      glitchAnimation.pause();
    };
  }, []);

  return (
    <div
      ref={toastRef}
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(10, 12, 18, 0.95)",
        color: "#fff",
        boxShadow: "0 8px 32px rgba(0, 255, 255, 0.2)",
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
        backdropFilter: "blur(10px)",
        ...style,
      }}
      {...rest}
    >
      <NeonBorder />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(0, 255, 255, 0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #0ff, #f0f)",
            width: "0%",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
          }}
        />
      </div>
      <span
        style={{
          marginRight: "16px",
          fontSize: "24px",
          filter: "drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))",
        }}
      >
        🤖
      </span>
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <GlitchText text={message} />
        {description && (
          <div
            style={{
              fontSize: "14px",
              marginTop: "4px",
              opacity: 0.8,
              color: "#0ff",
              textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
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
            background: "rgba(0, 255, 255, 0.1)",
            border: "1px solid #0ff",
            color: "#0ff",
            padding: "8px 16px",
            marginLeft: "16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "6px",
            transition: "all 0.3s ease",
            position: "relative",
            zIndex: 1,
            textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0, 255, 255, 0.2)";
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0, 255, 255, 0.1)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.2)";
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
          color: "#0ff",
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
          textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.2)";
          e.target.style.textShadow = "0 0 8px #0ff";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.textShadow = "0 0 5px rgba(0, 255, 255, 0.5)";
        }}
      >
        ×
      </button>
    </div>
  );
}
