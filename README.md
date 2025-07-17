# 🎉 Toastonstaroid

> A modern, beautiful toast notification library for React with smooth GSAP animations and elegant design.

[![npm version](https://img.shields.io/npm/v/toastonstaroid.svg?style=flat-square)](https://www.npmjs.com/package/toastonstaroid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/senapati484/toastonstaroid?style=social)](https://github.com/senapati484/toastonstaroid)

<div align="center">
  <img src="https://raw.githubusercontent.com/senapati484/toastonstaroid/main/assets/demo.gif" alt="Toast Notification Demo" width="600" />
  
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
- 🎭 **Variants**: Success, Error, Warning, and Info styles
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
npm install toastonstaroid react-icons
# or
yarn add toastonstaroid react-icons
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
import React from 'react';
import { ToastContainer } from 'toastonstaroid';

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
import React from 'react';
import { toast } from 'toastonstaroid';

function MyComponent() {
  const showToast = () => {
    // Success toast
    toast.success('Operation completed successfully!');
    
    // Error toast
    toast.error('Something went wrong!');
    
    // Warning toast
    toast.warning('This action cannot be undone');
    
    // Info toast
    toast.info('New update available');
    
    // With custom duration (5 seconds)
    toast.success('Changes saved!', 5000);
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
toast.success('Operation completed!');

// Error toast
toast.error('Failed to save changes');

// Warning toast
toast.warning('This action cannot be undone');

// Info toast
toast.info('New message received');
```

### Customizing Duration

```jsx
// Show for 5 seconds (default is 3000ms)
toast.success('Profile updated!', 5000);

// Show until manually closed
toast.info('Processing...', 0);
```

## 🎨 Toast Variants

### Success Toast

```jsx
toast.success("Operation completed successfully!");
```

### Error Toast

```jsx
toast.error("Failed to save changes");
```

### Warning Toast

```jsx
toast.warning("This action cannot be undone");
```

### Info Toast

```jsx
toast.info("New message received");
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `'top-right'` | Position of the toast container. Options: `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'` |
| `autoClose` | `number` | `3000` | Auto close timeout in milliseconds (`0` to disable) |
| `closeOnClick` | `boolean` | `true` | Close toast when clicked |
| `pauseOnHover` | `boolean` | `true` | Pause toast timer on hover |
| `className` | `string` | `''` | Additional CSS class for the container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for the container |

### Toast Methods

```typescript
// Show a toast
toast.success(message: string, options?: ToastOptions): string;
toast.error(message: string, options?: ToastOptions): string;
toast.warning(message: string, options?: ToastOptions): string;
toast.info(message: string, options?: ToastOptions): string;

// Remove a toast
toast.dismiss(toastId: string): void;

// Remove all toasts
toast.dismissAll(): void;

// Update a toast
toast.update(toastId: string, options: ToastOptions): void;
```

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `toastId` | `string` | Random ID | Custom ID for the toast |
| `duration` | `number` | `3000` | Display duration in ms |
| `onClose` | `() => void` | - | Callback when toast closes |
| `onOpen` | `() => void` | - | Callback when toast opens |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Inline styles |

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
import { useToastStore } from 'toastonstaroid';

function MyComponent() {
  const { toasts, removeToast } = useToastStore();
  
  const showTemporaryToast = () => {
    const toastId = toast.info('This will be removed in 2 seconds');
    
    setTimeout(() => {
      removeToast(toastId);
    }, 2000);
  };
  
  return (
    <div>
      <button onClick={showTemporaryToast}>
        Show Temporary Toast
      </button>
      
      <div>
        {toasts.length} active toasts
      </div>
    </div>
  );
}
```

### Custom Toast Component

```jsx
import { useToastStore } from 'toastonstaroid';

function CustomToast() {
  const { toasts, removeToast } = useToastStore();
  
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg flex items-center ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            toast.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
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

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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
````
