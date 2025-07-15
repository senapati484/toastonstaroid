import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { variantStyles, animations, dimensions, effects } from "./styles";

const RippleEffect = ({ color }) => {
  const rippleRef = useRef(null);

  useEffect(() => {
    const timeline = anime.timeline({
      targets: ".ripple-circle",
      loop: true,
    });

    timeline.add({
      scale: [0, 3.5],
      opacity: [1, 0],
      easing: "easeOutCubic",
      duration: 1000,
      delay: anime.stagger(200),
    });

    return () => timeline.pause();
  }, []);

  return (
    <div ref={rippleRef} className="ripple-container">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="ripple-circle" />
      ))}
      <style>
        {`
          .ripple-container {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            pointer-events: none;
          }

          .ripple-circle {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid ${color};
            border-radius: ${dimensions.borderRadius};
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
};

const GlitchEffect = ({ text, delay = 0 }) => (
  <div className="glitch-text" style={{ animationDelay: `${delay}ms` }}>
    <div className="glitch-main">{text}</div>
    <div className="glitch-before" data-text={text}></div>
    <div className="glitch-after" data-text={text}></div>
    <style>
      {`
        .glitch-text {
          position: relative;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }

        .glitch-main {
          position: relative;
          z-index: 1;
        }

        .glitch-before,
        .glitch-after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-before {
          animation: glitch-before 2s infinite linear alternate-reverse;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
        }

        .glitch-after {
          animation: glitch-after 3s infinite linear alternate-reverse;
          clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(2deg); }
          40% { transform: skew(-2deg); }
          60% { transform: skew(1deg); }
          80% { transform: skew(-1deg); }
          100% { transform: skew(0deg); }
        }

        @keyframes glitch-before {
          0% { transform: translateX(0); }
          80% { transform: translateX(0); }
          85% { transform: translateX(-2px); }
          90% { transform: translateX(2px); }
          95% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        @keyframes glitch-after {
          0% { transform: translateX(0); }
          80% { transform: translateX(0); }
          85% { transform: translateX(2px); }
          90% { transform: translateX(-2px); }
          95% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
      `}
    </style>
  </div>
);

const BounceText = ({ text, delay = 0 }) => (
  <div className="bounce-container">
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="bounce-char"
        style={{
          animationDelay: `${delay + i * 50}ms`,
          display: char === " " ? "inline-block" : "inline-block",
        }}
      >
        {char}
      </span>
    ))}
    <style>
      {`
        .bounce-char {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  </div>
);

export default function AnimatedToast({
  message,
  description,
  action,
  variant = "default",
  animation = "ripple",
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

    // Progress bar
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: animations.progressBar.duration,
        easing: animations.progressBar.easing,
      });
    }

    // Add floating animation
    anime({
      targets: toastRef.current,
      translateY: [0, -4, 0],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  const renderContent = () => {
    switch (animation) {
      case "glitch":
        return (
          <>
            <GlitchEffect text={message} />
            {description && <GlitchEffect text={description} delay={200} />}
          </>
        );
      case "bounce":
        return (
          <>
            <BounceText text={message} />
            {description && <BounceText text={description} delay={200} />}
          </>
        );
      default:
        return (
          <>
            <div style={{ fontWeight: 600 }}>{message}</div>
            {description && (
              <div style={{ fontSize: "14px", marginTop: "4px", opacity: 0.8 }}>
                {description}
              </div>
            )}
          </>
        );
    }
  };

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
        background: currentStyle.background,
        backdropFilter: `blur(${effects.blur.medium})`,
        color: currentStyle.color,
        boxShadow: effects.shadow.lg,
        border: currentStyle.border,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {animation === "ripple" && <RippleEffect color={currentStyle.color} />}
      <div
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {renderContent()}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "inherit",
            padding: "8px 16px",
            marginLeft: dimensions.spacing.buttons,
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            position: "relative",
            zIndex: 1,
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
          background: "transparent",
          border: "none",
          color: "inherit",
          marginLeft: dimensions.spacing.buttons,
          cursor: "pointer",
          fontSize: "18px",
          opacity: 0.7,
          position: "relative",
          zIndex: 1,
          transition: "opacity 0.2s",
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
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: currentStyle.color,
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}
