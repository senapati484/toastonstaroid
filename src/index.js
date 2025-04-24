import React from "react";
import { ToastContainer } from "./ToastContainer";
import { useToastStore } from "./store";
import ToastDefault from "./varients/ToastDefault";
import GlassToast from "./varients/GlassToast";
import SmokeToast from "./varients/SmokeToast";
import ShadowToast from "./varients/ShadowToast";
import AnimatedToast from "./varients/AnimatedToast";
import FireToast from "./varients/FireToast";
import CyberpunkToast from "./varients/CyberpunkToast";

const toast = (message, options = {}) => {
  if (typeof message === "string") {
    useToastStore.getState().addToast({
      message,
      component:
        options.variant === "glass" ? (
          <GlassToast message={message} {...options} />
        ) : options.variant === "smoke" ? (
          <SmokeToast message={message} {...options} />
        ) : options.variant === "shadow" ? (
          <ShadowToast message={message} {...options} />
        ) : options.variant === "fire" ? (
          <FireToast message={message} {...options} />
        ) : options.variant === "cyberpunk" ? (
          <CyberpunkToast message={message} {...options} />
        ) : (
          <ToastDefault message={message} {...options} />
        ),
      ...options,
    });
  } else {
    useToastStore.getState().addToast(message);
  }
};

// Variant methods
toast.success = (message, options = {}) => {
  toast(message, { variant: "success", ...options });
};

toast.error = (message, options = {}) => {
  toast(message, { variant: "error", ...options });
};

toast.warning = (message, options = {}) => {
  toast(message, { variant: "warning", ...options });
};

toast.info = (message, options = {}) => {
  toast(message, { variant: "info", ...options });
};

// Special variants
toast.glass = (message, options = {}) => {
  toast(message, { variant: "glass", ...options });
};

toast.smoke = (message, options = {}) => {
  toast(message, { variant: "smoke", ...options });
};

toast.shadow = (message, options = {}) => {
  toast(message, { variant: "shadow", ...options });
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

// Cyberpunk variant with neon effects and glitch animation
toast.cyberpunk = (message, options = {}) => {
  toast(message, {
    variant: "cyberpunk",
    duration: 6000, // Longer duration to show off the effects
    ...options,
  });
};

export { ToastContainer, toast };
