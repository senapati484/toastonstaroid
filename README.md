# 🎉 Toastonstaroid

> A modern, beautiful toast notification library for React with smooth GSAP animations and elegant design.

[![npm version](https://img.shields.io/npm/v/toastonstaroid.svg?style=flat-square)](https://www.npmjs.com/package/toastonstaroid)
[![npm downloads](https://img.shields.io/npm/dm/toastonstaroid.svg?style=flat-square)](https://www.npmjs.com/package/toastonstaroid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/senapati484/toastonstaroid?style=social)](https://github.com/senapati484/toastonstaroid)
[![Website](https://img.shields.io/badge/website-toastonstaroid.vercel.app-blue?style=flat-square)](https://toastonstaroid.vercel.app)

<div align="center" style="margin: 2rem 0;">
  <a href="https://youtu.be/Uuxnm6ARe0I" target="_blank" style="display: inline-block; position: relative; text-decoration: none;">
    <img 
      src="https://img.youtube.com/vi/Uuxnm6ARe0I/maxresdefault.jpg" 
      alt="Toast Notification Demo" 
      style="
        width: 100%;
        max-width: 800px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      "
      onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 12px 28px rgba(0,0,0,0.2)';"
      onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)';"
    />
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      pointer-events: none;
    ">
      <div style="
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 15px 0 15px 26px;
        border-color: transparent transparent transparent #fff;
        margin-left: 5px;
      "></div>
    </div>
    <div style="
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16.5L16 12L10 7.5V16.5Z" fill="white"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
      </svg>
      Watch Demo
    </div>
  </a>
</div>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-variants">Variants</a> •
    <a href="#-api-reference">API Reference</a>
  </p>
</div>

## ✨ Features

- 🚀 **Simple API**: Easy to integrate and use
- 🎨 **Beautiful Animations**: Powered by GSAP for buttery-smooth transitions
- 🎯 **Multiple Positions**: Display toasts at any corner of the screen
- 🔥 **Interactive**: Hover effects and click handling
- 📱 **Fully Responsive**: Works on all device sizes
- 🎭 **Variants**: Success, Error, Warning, Info, Fire, Rain, Smoke, Cyberpunk, Dragon Ball, and Water Flow styles
- ⚡ **Lightweight**: Minimal bundle size impact
- 🎨 **Customizable**: Full control over appearance and behavior
- 🔄 **Queue System**: Handles multiple toasts gracefully
- ⏱ **Auto-dismiss**: Configurable duration for each toast

## 🛠 Tech Stack

- ⚛️ React 16.8+ (Hooks)
- 💫 GSAP for animations
- 🏪 Zustand for state management
- 🎨 React Icons for beautiful icons
- 📦 TypeScript for type safety

## 📦 Installation

### For React 16.8+

```bash
npm install toastonstaroid
# or
yarn add toastonstaroid
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

- `react` (>=16.8.0)
- `react-dom` (>=16.8.0)
- `react-icons` (>=4.0.0)
- `gsap` (>=3.0.0)
- `zustand` (>=4.0.0)

## 🚀 Quick Start

1. First, wrap your app with the `ToastContainer` component:

```jsx
import React from "react";
import { ToastContainer } from "toastonstaroid";

function App() {
  return (
    <div className="app">
      <YourApp />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
```

2. Use the `toast` function to show notifications:

```jsx
import React from "react";
import { toast } from "toastonstaroid";

function MyComponent() {
  const showToast = () => {
    // Success toast
    toast.success("Operation completed successfully!");

    // Error toast
    toast.error("Something went wrong!");

    // Warning toast
    toast.warning("This action cannot be undone");

    // Info toast
    toast.info("New update available");

    // With custom duration (5 seconds)
    toast.success("Changes saved!", 5000);
  };

  return (
    <button
      onClick={showToast}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Show Toast Notifications
    </button>
  );
}

export default MyComponent;
```

### Available Toast Types

```jsx
// Success toast
toast.success("Operation completed successfully!");

// Error toast
toast.error("Something went wrong!");

// Warning toast
toast.warning("This action cannot be undone");

// Info toast
toast.info("New update available");

// Fire toast (for important alerts)
toast.fire("Critical system update required!");

// Rain toast (for notifications)
toast.rain("New message received");

// Smoke toast (for subtle notifications)
toast.smoke("Settings saved");

// Cyberpunk toast (for futuristic UI)
toast.cyberpunk("System initialized");

// Dragon Ball Z style
toast.dragonball("Power level over 9000!");

// Water Flow style
toast.waterflow("Your changes have been saved");
```

### Customizing Duration

```jsx
// Show for 5 seconds (default is 3000ms)
toast.success("Profile updated!", 5000);

// Show until manually closed
toast.info("Processing...", 0);
```

## 🎨 Toast Variants

Toastonstaroid comes with a variety of beautiful toast variants, each with unique animations and styles:

| Variant      | Description                                   | Example                                         |
| ------------ | --------------------------------------------- | ----------------------------------------------- |
| `success`    | Indicates a successful operation              | `toast.success('Operation completed!')`         |
| `error`      | Indicates an error that needs attention       | `toast.error('Something went wrong!')`          |
| `warning`    | For warning messages                          | `toast.warning('This action cannot be undone')` |
| `info`       | General information                           | `toast.info('New message received')`            |
| `fire`       | Fiery animation for important alerts          | `toast.fire('Hot! New message')`                |
| `rain`       | Rain effect for notifications                 | `toast.rain('Don\'t forget your umbrella!')`    |
| `smoke`      | Smoke effect for subtle notifications         | `toast.smoke('Poof! It\'s gone')`               |
| `cyberpunk`  | Futuristic cyberpunk style                    | `toast.cyberpunk('Access granted')`             |
| `dragonball` | Anime-inspired with energy aura and particles | `toast.dragonball('Power level over 9000!')`    |
| `waterflow`  | Smooth flowing water animation with bubbles   | `toast.waterflow('Changes saved successfully')` |

### Basic Variants

#### Success Toast

Indicates a successful operation.

```jsx
toast.success("Operation completed successfully!");
```

#### Error Toast

Indicates an error that needs attention.

```jsx
toast.error("Failed to save changes");
```

#### Warning Toast

For warning messages.

```jsx
toast.warning("This action cannot be undone");
```

#### Info Toast

For general information.

```jsx
toast.info("New message received");
```

### Animated Variants

#### Fire Toast

Fiery animation for important alerts.

```jsx
toast.fire("Hot! New message");
```

#### Rain Toast

Rain effect for notifications.

```jsx
toast.rain("Don't forget your umbrella!");
```

#### Smoke Toast

Smoke effect for subtle notifications.

```jsx
toast.smoke("Poof! It's gone");
```

#### Cyberpunk Toast

Futuristic cyberpunk style.

```jsx
toast.cyberpunk("Access granted");
```

#### Dragon Ball Z Style

Anime-inspired with energy aura and particles.

```jsx
toast.dragonball("Power level over 9000!");
```

#### Water Flow

Smooth flowing water animation with bubbles.

```jsx
toast.waterflow("Changes saved successfully");
```

### Custom Duration

```jsx
// Show for 5 seconds
toast.success("Profile updated!", 5000);

// Show until manually closed
toast.info("Processing...", 0);
```

## 🎛️ Configuration

### ToastContainer Props

| Prop           | Type                  | Default       | Description                                                                                                                                 |
| -------------- | --------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`     | `string`              | `'top-right'` | Position of the toast container. Options: `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'` |
| `autoClose`    | `number`              | `3000`        | Auto close timeout in milliseconds (`0` to disable)                                                                                         |
| `closeOnClick` | `boolean`             | `true`        | Close toast when clicked                                                                                                                    |
| `pauseOnHover` | `boolean`             | `true`        | Pause toast timer on hover                                                                                                                  |
| `className`    | `string`              | `''`          | Additional CSS class for the container                                                                                                      |
| `style`        | `React.CSSProperties` | `{}`          | Inline styles for the container                                                                                                             |

### Toast Methods

```typescript
// Show a toast
toast.success(message: string, options?: ToastOptions): string;
toast.error(message: string, options?: ToastOptions): string;
toast.warning(message: string, options?: ToastOptions): string;
toast.info(message: string, options?: ToastOptions): string;
toast.fire(message: string, options?: ToastOptions): string;
toast.rain(message: string, options?: ToastOptions): string;
toast.smoke(message: string, options?: ToastOptions): string;
toast.cyberpunk(message: string, options?: ToastOptions): string;

// Remove a toast
toast.dismiss(toastId: string): void;

// Remove all toasts
toast.dismissAll(): void;

// Update a toast
toast.update(toastId: string, options: ToastOptions): void;
```

### Toast Options

| Option      | Type                  | Default   | Description                |
| ----------- | --------------------- | --------- | -------------------------- |
| `toastId`   | `string`              | Random ID | Custom ID for the toast    |
| `duration`  | `number`              | `3000`    | Display duration in ms     |
| `onClose`   | `() => void`          | -         | Callback when toast closes |
| `onOpen`    | `() => void`          | -         | Callback when toast opens  |
| `className` | `string`              | -         | Additional CSS class       |
| `style`     | `React.CSSProperties` | -         | Inline styles              |

## 🎨 Customization

### Styling with CSS Variables

Customize the look using these CSS variables:

```css
:root {
  /* Base styles */
  --toast-bg: rgba(30, 41, 59, 0.95);
  --toast-text: #ffffff;
  --toast-border: rgba(255, 255, 255, 0.1);
  --toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  /* Layout */
  --toast-padding: 12px 16px;
  --toast-spacing: 16px;
  --toast-border-radius: 8px;

  /* Typography */
  --toast-font-size: 14px;
  --toast-line-height: 1.5;

  /* Icons */
  --toast-icon-size: 20px;

  /* Animations */
  --toast-animation-duration: 300ms;
}
```

### Custom Animations

You can customize the enter/exit animations by providing your own CSS classes:

```jsx
<ToastContainer
  className="custom-toast-container"
  toastClassName="custom-toast"
  bodyClassName="custom-toast-body"
  position="top-right"
  autoClose={5000}
  hideProgressBar
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
```

## 🚀 Advanced Usage

### Programmatic Control

```jsx
import { useToastStore } from "toastonstaroid";

function MyComponent() {
  const { toasts, removeToast } = useToastStore();

  const showTemporaryToast = () => {
    const toastId = toast.info("This will be removed in 2 seconds");

    setTimeout(() => {
      removeToast(toastId);
    }, 2000);
  };

  return (
    <div>
      <button onClick={showTemporaryToast}>Show Temporary Toast</button>

      <div>{toasts.length} active toasts</div>
    </div>
  );
}
```

### Custom Toast Component

```jsx
import { useToastStore } from "toastonstaroid";

function CustomToast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg flex items-center ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : toast.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          } text-white`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 📱 Responsive Design

Toasts are fully responsive and adapt to different screen sizes:

- **Mobile**: Full width with 16px margins
- **Tablet**: 400px width
- **Desktop**: 320px width
- **Large Screens**: 360px width

## ⚠️ Troubleshooting

### Common Issues

1. **Toasts not showing up?**

   - Ensure `<ToastContainer />` is rendered in your app
   - Check for z-index conflicts
   - Verify no `overflow: hidden` is hiding toasts

2. **Animations not working?**

   - Make sure GSAP is installed
   - Check browser console for errors
   - Verify you're not calling toast functions during SSR

3. **TypeScript errors?**
   - Ensure you have `@types/react` installed
   - Check your TypeScript version (requires 4.1+)

## 🤝 Contributing

We welcome contributions from the community! Before you start, please take a moment to read our [Contribution Guidelines](CONTRIBUTING.md) which includes detailed information on:

- 🛠️ Setting up your development environment
- 📝 Code style and conventions
- 🧪 Testing your changes
- 💡 Proposing new features
- 🐛 Reporting bugs

### Quick Start

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For more details, please see our [Contribution Guidelines](CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for smooth animations
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Zustand](https://github.com/pmndrs/zustand) for simple state management
- [react-hot-toast](https://react-hot-toast.com/) for inspiration

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/senapati484">Sayan Senapati</a>
  <br/>
  <a href="https://github.com/senapati484/toastonstaroid">GitHub</a> •
  <a href="https://www.npmjs.com/package/toastonstaroid">NPM</a> •
  <a href="https://sayan4.vercel.app">Portfolio</a>
</div>
## License

MIT

```

```
