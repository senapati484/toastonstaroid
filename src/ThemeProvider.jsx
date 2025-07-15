import React, { createContext, useContext, useEffect, useState } from "react";
import { variantStyles, effects } from "./varients/styles";

const ThemeContext = createContext(null);

const defaultTheme = {
  light: {
    background: {
      default: "rgba(255, 255, 255, 0.9)",
      glass: "rgba(255, 255, 255, 0.6)",
      smoke: "rgba(0, 0, 0, 0.8)",
      fire: "rgba(20, 20, 20, 0.95)",
      wind: "rgba(255, 255, 255, 0.1)",
      cyberpunk: "rgba(10, 12, 18, 0.95)",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#4a4a4a",
      inverse: "#ffffff",
    },
    border: {
      default: "rgba(0, 0, 0, 0.1)",
      glass: "rgba(255, 255, 255, 0.2)",
      accent: "rgba(0, 0, 0, 0.2)",
    },
    effects: {
      blur: effects.blur,
      shadow: effects.shadow,
    },
  },
  dark: {
    background: {
      default: "rgba(32, 32, 32, 0.9)",
      glass: "rgba(32, 32, 32, 0.6)",
      smoke: "rgba(0, 0, 0, 0.9)",
      fire: "rgba(20, 20, 20, 0.98)",
      wind: "rgba(255, 255, 255, 0.05)",
      cyberpunk: "rgba(10, 12, 18, 0.98)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      inverse: "#1a1a1a",
    },
    border: {
      default: "rgba(255, 255, 255, 0.1)",
      glass: "rgba(255, 255, 255, 0.1)",
      accent: "rgba(255, 255, 255, 0.2)",
    },
    effects: {
      blur: effects.blur,
      shadow: {
        sm: "0 2px 4px rgba(0,0,0,0.2)",
        md: "0 4px 8px rgba(0,0,0,0.25)",
        lg: "0 8px 16px rgba(0,0,0,0.3)",
        xl: "0 12px 24px rgba(0,0,0,0.35)",
      },
    },
  },
};

export function ToastThemeProvider({
  children,
  theme = defaultTheme,
  defaultMode = "auto", // 'light', 'dark', or 'auto'
}) {
  const [mode, setMode] = useState(defaultMode);
  const [currentTheme, setCurrentTheme] = useState(
    defaultMode === "light"
      ? theme.light
      : defaultMode === "dark"
        ? theme.dark
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? theme.dark
          : theme.light
  );

  useEffect(() => {
    if (mode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        setCurrentTheme(e.matches ? theme.dark : theme.light);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      setCurrentTheme(mode === "dark" ? theme.dark : theme.light);
    }
  }, [mode, theme]);

  const contextValue = {
    theme: currentTheme,
    mode,
    setMode,
    setTheme: (newTheme) => {
      const updatedTheme = {
        light: { ...defaultTheme.light, ...newTheme.light },
        dark: { ...defaultTheme.dark, ...newTheme.dark },
      };
      setCurrentTheme(mode === "dark" ? updatedTheme.dark : updatedTheme.light);
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useToastTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useToastTheme must be used within a ToastThemeProvider");
  }
  return context;
};
