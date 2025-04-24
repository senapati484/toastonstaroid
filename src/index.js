import { ToastContainer } from "./ToastContainer";
import { useToastStore } from "./store";
import AnimatedToast from "./varients/AnimatedToast";
import FireToast from "./varients/FireToast";
import SmokeToast from "./varients/SmokeToast";
import CyberpunkToast from "./varients/CyberpunkToast";

const toast = (message, options = {}) => {
  if (typeof message === "string") {
    useToastStore.getState().addToast({
      message,
      component:
        options.variant === "fire" ? (
          <FireToast message={message} {...options} />
        ) : options.variant === "smoke" ? (
          <SmokeToast message={message} {...options} />
        ) : options.variant === "cyberpunk" ? (
          <CyberpunkToast message={message} {...options} />
        ) : (
          <AnimatedToast message={message} {...options} />
        ),
      ...options,
    });
  } else {
    useToastStore.getState().addToast(message);
  }
};

// Variant methods
toast.success = (message, options = {}) => {
  toast(message, { variant: "success", animation: "ripple", ...options });
};

toast.error = (message, options = {}) => {
  toast(message, { variant: "error", animation: "glitch", ...options });
};

toast.warning = (message, options = {}) => {
  toast(message, { variant: "warning", animation: "bounce", ...options });
};

toast.info = (message, options = {}) => {
  toast(message, { variant: "info", animation: "spin", ...options });
};

// Special animated variants
toast.magic = (message, options = {}) => {
  toast(message, {
    variant: "magic",
    animation: "ripple",
    style: {
      background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
      backdropFilter: "blur(8px)",
    },
    ...options,
  });
};

// Fire variant with animated flames
toast.fire = (message, options = {}) => {
  toast(message, {
    variant: "fire",
    duration: 6000, // Slightly longer duration for the fire effect
    ...options,
  });
};

// Smoke variant with drifting particles
toast.smoke = (message, options = {}) => {
  toast(message, {
    variant: "smoke",
    duration: 7000, // Longer duration for the smoke effect
    ...options,
  });
};

// Cyberpunk variant with neon effects and glitch animation
toast.cyberpunk = (message, options = {}) => {
  toast(message, {
    variant: "cyberpunk",
    duration: 6000, // Longer duration to show off the effects
    ...options,
  });
};

export { ToastContainer, toast };
