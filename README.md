# 🎉 Toastonstaroid

> A modern, stunning toast notification library for React with eye-catching animations and beautiful variants.

[![npm version](https://img.shields.io/npm/v/toastonstaroid.svg?style=flat-square)](https://www.npmjs.com/package/toastonstaroid)
[![npm downloads](https://img.shields.io/npm/dm/toastonstaroid.svg?style=flat-square)](https://www.npmjs.com/package/toastonstaroid)
[![license](https://img.shields.io/npm/l/toastonstaroid.svg?style=flat-square)](https://github.com/yourusername/toastonstaroid/blob/main/LICENSE)

## ✨ Features

- 🚀 **Simple API**: Easy to integrate and use
- 🎨 **12+ Creative Variants**: Glass, Fire, Neon, Matrix, and more!
- 🎯 **Fully Customizable**: Styles, animations, and behaviors
- 🔥 **Interactive Effects**: Beautiful hover and click animations
- 📦 **Lightweight**: Only ~12KB gzipped
- 💫 **Modern Effects**: Glass morphism, particle systems, and gradients
- ⚡️ **High Performance**: Optimized animations and renders
- 📱 **Responsive**: Works perfectly on all devices
- 🌓 **Theme Support**: Light/Dark modes + custom themes
- 🎭 **Rich Animations**: 10+ animation presets
- ⚛️ **React 16.8+ Compatible**: Supports all modern React versions

## 📦 Installation

### For React 18 and below:

```bash
npm install toastonstaroid
# or
yarn add toastonstaroid
```

### For React 19:

```bash
npm install toastonstaroid --legacy-peer-deps
# or
yarn add toastonstaroid --legacy-peer-deps
```

## 🚀 Quick Start

```jsx
import { ToastContainer, useToastStore } from "toastonstaroid";

// 1. Wrap your app with ToastContainer
function App() {
  return (
    <>
      <YourApp />
      <ToastContainer position="top-right" />
    </>
  );
}

// 2. Use the toast anywhere in your app
function YourComponent() {
  const { addToast } = useToastStore();

  const showToast = () => {
    addToast({
      message: "Hello World!",
      variant: "success",
      type: "glass",
      duration: 5000,
    });
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## 🎨 Toast Variants

### 1. Glass Toast 🌟

Modern glassmorphism effect with elegant blur backdrop.

```jsx
addToast({
  type: "glass",
  message: "Data saved successfully",
  variant: "success",
  backdrop: true,
  blurAmount: "10px",
  transparency: 0.8,
});
```

### 2. Fire Toast 🔥

Dynamic particle system with realistic fire effects.

```jsx
addToast({
  type: "fire",
  message: "Critical Alert!",
  variant: "error",
  intensity: "high",
  particleCount: 30,
  windEffect: true,
});
```

### 3. Neon Toast 💫

Vibrant neon glow with pulsing effects.

```jsx
addToast({
  type: "neon",
  message: "Achievement Unlocked!",
  variant: "success",
  glowIntensity: "high",
  pulseRate: 1.5,
  rainbow: true,
});
```

### 4. Matrix Toast 🖥️

Cyberpunk-inspired digital rain effect.

```jsx
addToast({
  type: "matrix",
  message: "System Update",
  rainSpeed: "fast",
  density: "high",
  glowColor: "#00ff00",
});
```

### 5. Rain Toast 🌧️

Beautiful rain animation with thunder effects.

```jsx
addToast({
  type: "rain",
  message: "Syncing Data",
  dropletCount: 30,
  dropletSpeed: "medium",
  thunder: true,
});
```

### 6. Sparkle Toast ✨

Elegant particle animations with star effects.

```jsx
addToast({
  type: "sparkle",
  message: "Magic Happening",
  sparkleCount: 15,
  sparkleSize: "medium",
  glowIntensity: 0.5,
});
```

### 7. Smoke Toast 💨

Ethereal smoke effects with color transitions.

```jsx
addToast({
  type: "smoke",
  message: "Processing...",
  density: "medium",
  turbulence: 0.5,
  colorShift: true,
});
```

### 8. Wind Toast 🌪

Dynamic wind particle system.

```jsx
addToast({
  type: "wind",
  message: "Refreshing Feed",
  direction: "left",
  intensity: "medium",
  particleType: "leaves",
});
```

## 🎛 Configuration

### Position Options 📍

```jsx
<ToastContainer
  position="top-right" // Default
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

### Theme Support 🌓

```jsx
import { ThemeProvider } from "toastonstaroid";

<ThemeProvider
  theme="dark" // light, dark, or auto
  customTheme={
    {
      // Your custom theme options
    }
  }
>
  <App />
</ThemeProvider>;
```

### Animation Presets 🎭

```jsx
addToast({
  message: "Animated Toast",
  animation: "bounce", // or any preset
  animationDuration: 800,
  animationEasing: "easeOutExpo",
});
```

Available animations:

- `fade` - Simple fade
- `slide` - Smooth slide
- `bounce` - Bouncy effect
- `flip` - 3D flip
- `zoom` - Scale effect
- `glitch` - Digital glitch
- `elastic` - Springy motion
- `rotate` - Spin effect

## 🛠 Advanced Usage

### Custom Variants

```jsx
import { createCustomVariant } from "toastonstaroid";

const pulseVariant = createCustomVariant({
  name: "pulse",
  animation: {
    keyframes: {
      // Your keyframes
    },
    duration: 1000,
  },
  style: {
    // Your styles
  },
});
```

### Dynamic Content

```jsx
addToast({
  message: "Live updates",
  dynamic: true,
  render: (props) => <CustomToastContent {...props} />,
});
```

### Progress & Loading

```jsx
addToast({
  message: "Uploading...",
  progress: 45,
  loading: true,
  hideProgressBar: false,
  onProgress: (progress) => console.log(progress),
});
```

## 📱 Responsive Design

All toasts are mobile-friendly by default and adjust to screen size:

- Auto-adjusting width
- Touch-friendly interactions
- Responsive animations
- Mobile-optimized positioning

## 🎯 Event Handling

```jsx
addToast({
  message: "Interactive toast",
  onOpen: () => console.log("Shown"),
  onClose: () => console.log("Closed"),
  onClick: () => console.log("Clicked"),
  closeOnClick: true,
  pauseOnHover: true,
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Peer Dependencies**

   - React 19: Use `--legacy-peer-deps` flag
   - React <16.8: Not supported (needs hooks)

2. **Animation Performance**

   - Reduce particle count for better performance
   - Use simpler variants on mobile devices

3. **Styling Conflicts**
   - Toast container has z-index: 9999
   - Use custom z-index if needed

## 🤝 Contributing

We welcome contributions! Please check our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT © [Your Name]

---

Made with ❤️ by [Your Name]
