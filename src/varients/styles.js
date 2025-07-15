export const baseColors = {
  success: {
    light: "#10B981",
    dark: "#059669",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.2)",
    text: "#065F46",
  },
  error: {
    light: "#EF4444",
    dark: "#DC2626",
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.2)",
    text: "#991B1B",
  },
  warning: {
    light: "#F59E0B",
    dark: "#D97706",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.2)",
    text: "#92400E",
  },
  info: {
    light: "#3B82F6",
    dark: "#2563EB",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.2)",
    text: "#1E40AF",
  },
  default: {
    light: "#1F2937",
    dark: "#111827",
    bg: "rgba(31, 41, 55, 0.1)",
    border: "rgba(31, 41, 55, 0.2)",
    text: "#1F2937",
  },
};

export const dimensions = {
  width: "auto",
  maxWidth: "420px",
  minHeight: "48px",
  padding: "12px 24px",
  margin: "8px",
  borderRadius: "12px",
  spacing: {
    buttons: "12px",
    content: "8px",
  },
};

export const effects = {
  blur: {
    light: "4px",
    medium: "8px",
    heavy: "12px",
  },
  shadow: {
    sm: "0 2px 4px rgba(0,0,0,0.1)",
    md: "0 4px 8px rgba(0,0,0,0.15)",
    lg: "0 8px 16px rgba(0,0,0,0.2)",
    xl: "0 12px 24px rgba(0,0,0,0.25)",
  },
  glow: {
    sm: "0 0 4px",
    md: "0 0 8px",
    lg: "0 0 16px",
    xl: "0 0 24px",
  },
};

export const animations = {
  slideIn: {
    duration: 400,
    easing: "easeOutExpo",
  },
  progressBar: {
    duration: 5000,
    easing: "linear",
  },
  float: {
    duration: 2000,
    easing: "easeInOutSine",
  },
  particle: {
    duration: {
      min: 1000,
      max: 3000,
    },
    easing: "easeOutExpo",
  },
  reveal: {
    duration: 800,
    easing: "easeOutCubic",
    stagger: 50,
  },
};

export const variantStyles = {
  glass: {
    default: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    success: {
      background: "rgba(34, 197, 94, 0.1)",
      color: "#22c55e",
      border: "1px solid rgba(34, 197, 94, 0.2)",
    },
    error: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#ef4444",
      border: "1px solid rgba(239, 68, 68, 0.2)",
    },
    warning: {
      background: "rgba(234, 179, 8, 0.1)",
      color: "#eab308",
      border: "1px solid rgba(234, 179, 8, 0.2)",
    },
    info: {
      background: "rgba(59, 130, 246, 0.1)",
      color: "#3b82f6",
      border: "1px solid rgba(59, 130, 246, 0.2)",
    },
  },
  fire: {
    glowColors: {
      default: "#ff6b6b",
      success: "#22c55e",
      error: "#ef4444",
      warning: "#eab308",
      info: "#3b82f6",
    },
    particleColors: {
      default: ["#ff6b6b", "#ffa502"],
      success: ["#22c55e", "#4ade80"],
      error: ["#ef4444", "#f87171"],
      warning: ["#eab308", "#fcd34d"],
      info: ["#3b82f6", "#60a5fa"],
    },
  },
  smoke: {
    particleColor: "rgba(255, 255, 255, 0.1)",
    text: {
      default: "#ffffff",
      success: "#4ade80",
      error: "#f87171",
      warning: "#fcd34d",
      info: "#60a5fa",
    },
  },
  wind: {
    particleColors: {
      default: "rgba(255, 255, 255, 0.1)",
      success: "rgba(74, 222, 128, 0.1)",
      error: "rgba(248, 113, 113, 0.1)",
      warning: "rgba(252, 211, 77, 0.1)",
      info: "rgba(96, 165, 250, 0.1)",
    },
  },
  cyberpunk: {
    glowColors: {
      default: ["#ff00ff", "#00ffff"],
      success: ["#00ff00", "#4ade80"],
      error: ["#ff0000", "#f87171"],
      warning: ["#ffff00", "#fcd34d"],
      info: ["#00ffff", "#60a5fa"],
    },
    scanlineOpacity: 0.1,
    glitchIntensity: 0.3,
  },
  rain: {
    dropColors: {
      success: "#4CAF50",
      error: "#FF5252",
      warning: "#FFC107",
      info: "#2196F3",
      default: "#64B5F6",
    },
    background: {
      success: "rgba(76, 175, 80, 0.1)",
      error: "rgba(255, 82, 82, 0.1)",
      warning: "rgba(255, 193, 7, 0.1)",
      info: "rgba(33, 150, 243, 0.1)",
      default: "rgba(100, 181, 246, 0.1)",
    },
  },
  sparkle: {
    colors: {
      success: "#4CAF50",
      error: "#FF5252",
      warning: "#FFC107",
      info: "#2196F3",
      default: "#FFD700",
    },
    glowColors: {
      success: "rgba(76, 175, 80, 0.5)",
      error: "rgba(255, 82, 82, 0.5)",
      warning: "rgba(255, 193, 7, 0.5)",
      info: "rgba(33, 150, 243, 0.5)",
      default: "rgba(255, 215, 0, 0.5)",
    },
  },
};

export const createCustomVariant = (config) => {
  return {
    background: config.background || "rgba(255, 255, 255, 0.1)",
    color: config.color || "#ffffff",
    border: config.border || "1px solid rgba(255, 255, 255, 0.2)",
    effects: {
      blur: config.blur || effects.blur.medium,
      shadow: config.shadow || effects.shadow.md,
      glow: config.glow
        ? {
            color: config.glow.color || config.color || "#ffffff",
            intensity: config.glow.intensity || effects.glow.md,
          }
        : null,
    },
    animations: {
      enter: config.animations?.enter || animations.slideIn,
      exit: config.animations?.exit || {
        duration: 300,
        easing: "easeInCubic",
      },
      progress: config.animations?.progress || animations.progressBar,
    },
    particles: config.particles
      ? {
          enabled: true,
          color: config.particles.color || config.color || "#ffffff",
          count: config.particles.count || 20,
          size: config.particles.size || { min: 2, max: 6 },
          speed: config.particles.speed || { min: 1, max: 3 },
          direction: config.particles.direction || "up",
          ...config.particles,
        }
      : null,
  };
};
