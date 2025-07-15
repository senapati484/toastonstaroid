# Toastonstaroid

A modern, customizable toast notification library for React with beautiful animations and variants.

## Features ✨

- 🚀 Easy to use with simple API
- 🎨 Multiple creative variants with stunning effects
- 🎯 Fully customizable styles and animations
- 🔥 Interactive hover effects
- 📦 Lightweight (~12KB gzipped)
- 💫 Glass morphism and modern design effects
- 🌈 Beautiful gradient backgrounds
- ⚡️ Smooth transitions and animations
- 📱 Responsive and mobile-friendly
- 🎭 Multiple animation types
- 🎨 Theme support (Light/Dark)
- 🎛 Customizable positioning
- ⚛️ Compatible with React 16.8+ through React 19

## Installation 📦

```bash
npm install toastonstaroid
# or
yarn add toastonstaroid
```

## Basic Usage

```jsx
import { ToastContainer, useToastStore } from "toastonstaroid";

function App() {
  return (
    <>
      <YourApp />
      <ToastContainer position="top-right" />
    </>
  );
}

function YourComponent() {
  const { addToast } = useToastStore();

  const showToast = () => {
    addToast({
      message: "Hello World!",
      variant: "success",
      type: "glass", // Choose your preferred variant
      duration: 5000
    });
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## Toast Variants 🎨

### 1. Glass Toast 🌟
Modern glassmorphism effect with blur backdrop and elegant transparency.

```jsx
addToast({
  type: "glass",
  message: "Data saved successfully",
  variant: "success",
  description: "Your changes have been saved to the cloud",
  backdrop: true, // Enables backdrop blur
  blurAmount: "10px", // Customize blur intensity
  transparency: 0.8 // Adjust transparency
});
```

### 2. Shadow Toast 🎭
Elegant toasts with dynamic gradient backgrounds and smooth shadows.

```jsx
addToast({
  type: "shadow",
  message: "Profile updated",
  variant: "info",
  style: {
    gradient: "cosmic" // Available: cosmic, sunset, ocean, forest
    shadowIntensity: "high", // low, medium, high
    pulseEffect: true // Enable shadow pulsing
  }
});
```

### 3. Fire Toast 🔥
Dynamic fire effect animation with particle system for impactful notifications.

```jsx
addToast({
  type: "fire",
  message: "Critical Update!",
  variant: "warning",
  intensity: "high", // Controls fire effect intensity
  particleCount: 30, // Number of fire particles
  windEffect: true // Add wind effect to flames
});
```

### 4. Smoke Toast 💨
Ethereal smoke animation effect for subtle notifications.

```jsx
addToast({
  type: "smoke",
  message: "Processing request...",
  variant: "default",
  density: "medium", // Controls smoke density
  turbulence: 0.5, // Add turbulence to smoke
  colorShift: true // Enable color shifting effect
});
```

### 5. Neon Toast 🌈
Vibrant neon effect with pulsing glow and color transitions.

```jsx
addToast({
  type: "neon",
  message: "Achievement Unlocked!",
  variant: "success",
  glowIntensity: "high", // Controls neon glow
  pulseRate: 1.5, // Speed of pulsing effect
  rainbow: true // Enable rainbow color cycle
});
```

### 6. Matrix Toast 🖥️
Digital rain effect inspired by The Matrix.

```jsx
addToast({
  type: "matrix",
  message: "System Update",
  variant: "info",
  rainSpeed: "fast", // Controls digital rain speed
  density: "high", // Character density
  glowColor: "#00ff00" // Custom matrix glow color
});
```

### 7. Hologram Toast 👾
Futuristic holographic display with glitch and scan effects.

```jsx
addToast({
  type: "hologram",
  message: "New Message",
  variant: "info",
  scanlineEffect: true, // Add scanning effect
  glitchAmount: 0.3, // Control glitch intensity
  flickerRate: 2 // Rate of hologram flicker
});
```

### 8. Pixel Toast 🎮
Retro pixel art style with optional 8-bit animations.

```jsx
addToast({
  type: "pixel",
  message: "Level Complete!",
  variant: "success",
  pixelSize: 4, // Size of pixels
  dithering: true, // Add dithering effect
  animation: "slideIn8Bit" // Special 8-bit animations
});
```

### 9. Liquid Toast 💧
Fluid animation effects with dynamic color blending.

```jsx
addToast({
  type: "liquid",
  message: "Downloading...",
  variant: "info",
  viscosity: 0.8, // Control fluid movement
  rippleEffect: true, // Add ripple on appear
  colorBlend: ["#4a90e2", "#67b26f"] // Gradient colors
});
```

### 10. Aurora Toast 🌌
Northern lights inspired effect with flowing colors.

```jsx
addToast({
  type: "aurora",
  message: "Magic Happening",
  variant: "default",
  waveSpeed: 2, // Speed of color waves
  colorPalette: "twilight", // preset color schemes
  intensity: 0.7 // Aurora effect intensity
});
```

### 11. Cyberpunk Toast 🌐
Futuristic cyberpunk design with neon effects and glitch animations.

```jsx
addToast({
  type: "cyberpunk",
  message: "System Override",
  variant: "error",
  glitchIntensity: 0.5, // Controls glitch effect
  neonRim: true, // Add neon border
  scanlines: true, // Add CRT scanlines
  cyberTheme: "neon" // neon, tech, hack themes
});
```

### 12. Paper Toast 📜
Elegant paper-like effect with fold animations.

```jsx
addToast({
  type: "paper",
  message: "New Note",
  variant: "default",
  foldEffect: true, // Add unfolding animation
  paperTexture: "rough", // paper texture type
  inkEffect: true // Add ink spread effect
});
```

### 13. Cosmic Toast 🌠
Space-themed toast with star particles and nebula effects.

```jsx
addToast({
  type: "cosmic",
  message: "Launch Successful",
  variant: "success",
  starDensity: "high", // Amount of stars
  nebulaEffect: true, // Add nebula background
  meteorShowers: true // Add shooting stars
});
```

### 14. Wind Toast 🌪
Elegant wind-like particle animations with dynamic flow.

```jsx
addToast({
  type: "wind",
  message: "Refreshing Feed",
  variant: "info",
  direction: "left", // Wind direction
  intensity: "medium", // Wind strength
  particleType: "leaves" // leaves, petals, dust
});
```

### 15. Crystal Toast 💎
Crystal-like transparent effect with light refraction.

```jsx
addToast({
  type: "crystal",
  message: "Premium Activated",
  variant: "success",
  facets: 8, // Number of crystal faces
  refractionAmount: 0.5, // Light refraction
  shimmerEffect: true // Add shimmer animation
});
```

### 16. Rain Toast 🌧️
Beautiful rain effect with customizable droplets and colors.

```jsx
addToast({
  type: "rain",
  message: "Syncing Data",
  variant: "info",
  dropletCount: 30, // Number of raindrops
  dropletSpeed: "medium", // slow, medium, fast
  thunder: true // Add thunder effect
});
```

### 17. Sparkle Toast ✨
Elegant sparkle animation with star-shaped particles.

```jsx
addToast({
  type: "sparkle",
  message: "Achievement Unlocked!",
  variant: "success",
  sparkleCount: 15, // Number of sparkles
  sparkleSize: "medium", // small, medium, large
  glowIntensity: 0.5 // Intensity of the glow effect
});
```

Each variant comes with its own set of customizable properties and can be combined with standard toast options like `duration`, `position`, and `onClose`. You can also create custom variants by extending these base variants or creating entirely new ones using our variant API.

## Animation Presets 🎭

All variants support these base animations:
- `fade` - Simple fade in/out
- `slide` - Sliding entrance/exit
- `bounce` - Bouncy effect
- `flip` - 3D flip animation
- `zoom` - Scale in/out
- `rotate` - Rotation effect
- `glitch` - Digital glitch effect
- `elastic` - Elastic bounce
- `fold` - Paper fold effect
- `float` - Floating animation

## Positioning Options 📍

```jsx
<ToastContainer 
  position="top-right" // Default position
  gutter={8} // Space between toasts
/>
```

Available positions:
- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

## Customization Options 🎨

### Duration Control
```jsx
addToast({
  message: "Custom duration",
  duration: 5000, // Duration in milliseconds
  infinite: false // Set true for persistent toast
});
```

### Theme Support
```jsx
import { ThemeProvider } from "toastonstaroid";

<ThemeProvider theme="dark"> // or "light", "auto"
  <App />
</ThemeProvider>
```

### Custom Styling
```jsx
addToast({
  message: "Styled toast",
  style: {
    background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
    color: "#fff",
    borderRadius: "12px",
    padding: "16px 24px"
  }
});
```

### Interactive Actions
```jsx
addToast({
  message: "Update available",
  description: "A new version is ready to install",
  action: {
    label: "Update now",
    onClick: () => handleUpdate()
  }
});
```

## Progress Bars and Loading States

```jsx
addToast({
  message: "Uploading file...",
  variant: "info",
  progress: 45, // Show progress (0-100)
  loading: true, // Shows loading spinner
  hideProgressBar: false // Control progress bar visibility
});
```

## Event Handling

```jsx
addToast({
  message: "Interactive toast",
  onOpen: () => console.log("Toast shown"),
  onClose: () => console.log("Toast hidden"),
  onClick: () => console.log("Toast clicked"),
  closeOnClick: true, // Close when clicked
  pauseOnHover: true // Pause duration on hover
});
```

## Advanced Usage

### Custom Variants
```jsx
import { createCustomVariant } from "toastonstaroid";

const pulseVariant = createCustomVariant({
  name: "pulse",
  animation: {
    keyframes: {/* Your keyframes */},
    duration: 1000
  },
  style: {/* Your styles */}
});
```

### Dynamic Content
```jsx
addToast({
  message: "Live updates",
  dynamic: true,
  render: (props) => (
    <CustomToastContent {...props} />
  )
});
```

For more examples and detailed documentation, visit our [GitHub repository](https://github.com/yourusername/toastonstaroid).
