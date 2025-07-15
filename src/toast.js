import { variantStyles, animations, effects } from "./varients/styles";

export const POSITIONS = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center",
};

export const VARIANTS = {
  DEFAULT: "default",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  GLASS: "glass",
  SMOKE: "smoke",
  SHADOW: "shadow",
  FIRE: "fire",
  WIND: "wind",
  CYBERPUNK: "cyberpunk",
  ANIMATED: "animated",
};

export const ANIMATIONS = {
  FADE: "fade",
  SLIDE: "slide",
  BOUNCE: "bounce",
  SPIN: "spin",
  GLITCH: "glitch",
  RIPPLE: "ripple",
  SMOKE: "smoke",
  FIRE: "fire",
  WIND: "wind",
};

export const ANIMATION_PRESETS = {
  [ANIMATIONS.FADE]: {
    enter: {
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutCubic",
    },
    exit: {
      opacity: [1, 0],
      duration: 300,
      easing: "easeInCubic",
    },
  },
  [ANIMATIONS.SLIDE]: {
    enter: {
      translateX: [100, 0],
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutExpo",
    },
    exit: {
      translateX: [0, -100],
      opacity: [1, 0],
      duration: 400,
      easing: "easeInExpo",
    },
  },
  [ANIMATIONS.BOUNCE]: {
    enter: {
      scale: [0.3, 1.1, 1],
      opacity: [0, 1],
      duration: 800,
      easing: "spring(1, 80, 10, 0)",
    },
    exit: {
      scale: [1, 0.5, 0],
      opacity: [1, 0],
      duration: 600,
      easing: "easeInBack",
    },
  },
  [ANIMATIONS.SPIN]: {
    enter: {
      rotate: [720, 0],
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuart",
    },
    exit: {
      rotate: [0, -720],
      scale: [1, 0],
      opacity: [1, 0],
      duration: 1000,
      easing: "easeInQuart",
    },
  },
};

export const defaultConfig = {
  position: POSITIONS.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  animation: ANIMATIONS.SLIDE,
  style: {},
};

export const variantConfig = {
  fire: {
    duration: 6000,
    animation: ANIMATIONS.FIRE,
    style: {
      background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
      backdropFilter: "blur(10px)",
    },
    particleCount: 20,
    flameHeight: 60,
  },
  smoke: {
    duration: 5000,
    animation: ANIMATIONS.SMOKE,
    style: {
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(20,20,20,0.95))",
      backdropFilter: "blur(12px)",
    },
    particleCount: 15,
    textRevealDelay: 100,
  },
  wind: {
    duration: 5000,
    animation: ANIMATIONS.WIND,
    style: {
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      backdropFilter: "blur(8px)",
    },
    particleCount: 20,
    windSpeed: 1000,
  },
  cyberpunk: {
    duration: 6000,
    animation: ANIMATIONS.GLITCH,
    style: {
      background: "rgba(10, 12, 18, 0.95)",
      backdropFilter: "blur(10px)",
    },
    glitchIntensity: 0.3,
    neonColors: ["#0ff", "#f0f", "#ff0"],
  },
  glass: {
    duration: 5000,
    animation: ANIMATIONS.FADE,
    style: {
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    opacity: 0.95,
    blurAmount: "12px",
  },
  shadow: {
    duration: 4000,
    animation: ANIMATIONS.SLIDE,
    style: {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
    shadowIntensity: 0.3,
  },
  animated: {
    duration: 5000,
    animation: ANIMATIONS.BOUNCE,
    animations: {
      ripple: {
        duration: 400,
        easing: "easeOutCubic",
      },
      bounce: {
        duration: 600,
        easing: "spring(1, 80, 10, 0)",
      },
      spin: {
        duration: 600,
        easing: "easeOutCubic",
      },
      glitch: {
        duration: 500,
        easing: "easeOutCubic",
      },
    },
  },
};

export const getVariantConfig = (variant, customConfig = {}) => {
  const baseConfig = variantConfig[variant] || {};
  const animationPreset =
    ANIMATION_PRESETS[baseConfig.animation] ||
    ANIMATION_PRESETS[ANIMATIONS.SLIDE];

  return {
    ...defaultConfig,
    ...baseConfig,
    ...customConfig,
    style: {
      ...baseConfig.style,
      ...customConfig.style,
    },
    animations: {
      ...animationPreset,
      ...(baseConfig.animations || {}),
      ...(customConfig.animations || {}),
    },
  };
};
