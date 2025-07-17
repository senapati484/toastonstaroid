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
    <a href="-getting-started">Quick Start</a> •
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
- react (>=16.8.0)
- react-icons (>=4.0.0)

## 🚀 Quick Start

1. First, wrap your app with the `ToastContainer` component:

```jsx
import { ToastContainer } from 'toastonstaroid';

function App() {
  return (
    <div className="app">
      <YourApp />
      <ToastContainer position="top-right" />
    </div>
  );
}
```

2. Use the `toast` function to show notifications:

```jsx
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
    
    // Custom duration (in milliseconds)
    toast.success('Saved!', 5000);
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## 🎨 Toast Variants

### Success Toast

```jsx
toast.success('Operation completed successfully!');
```

### Error Toast

```jsx
toast.error('Failed to save changes');
```

### Warning Toast

```jsx
toast.warning('This action cannot be undone');
```

### Info Toast

```jsx
toast.info('New message received');
```

### Custom Duration

```jsx
// Show for 5 seconds
toast.success('Profile updated!', 5000);

// Show until manually closed
toast.info('Processing...', 0);
```

## 🚀 Basic Usage

1. **Wrap your app** with the `ToastContainer`:

```jsx
import { ToastContainer } from 'toastonstaroid';

function App() {
  return (
    <div className="app">
      <header>Your App</header>
      <main>{/* Your app content */}</main>
      <ToastContainer position="top-right" />
    </div>
  );
}
```

2. **Show toasts** from anywhere in your app:

```jsx
import { toast } from 'toastonstaroid';

function MyComponent() {
  const showToasts = () => {
    // Success toast
    toast.success('Profile updated successfully!');
    
    // Error toast
    toast.error('Failed to save changes. Please try again.');
    
    // Warning toast
    toast.warning('Your session will expire soon!');
    
    // Info toast
    toast.info('New features are available!');
  };

  return (
    <button 
      onClick={showToasts}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Show Toast Notifications
    </button>
  );
}
```

## 🎨 Customization

### Toast Positions

Position your toasts in any corner of the screen:

```jsx
// Top-right (default)
<ToastContainer position="top-right" />

// Top-left
<ToastContainer position="top-left" />

// Bottom-right
<ToastContainer position="bottom-right" />

// Bottom-left
<ToastContainer position="bottom-left" />
```

### Custom Duration

Control how long toasts are displayed (in milliseconds):

```jsx
// Show for 5 seconds
toast.success('Saved successfully!', 5000);

// Stay until manually dismissed
toast.info('Important message!', 0);
```

### Styling

Customize the appearance using the `className` and `style` props:

```jsx
<ToastContainer 
  className="custom-toast-container"
  style={{ 
    zIndex: 9999,
    '--toast-spacing': '16px', // Custom CSS variable
  }}
/>

## 📚 API Reference

### ToastContainer

The `ToastContainer` component handles the display of all toasts in your application.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Position of the toast container |
| className | `string` | `''` | Additional CSS class for the container |
| style | `React.CSSProperties` | `{}` | Inline styles for the container |

### toast

The `toast` object provides methods to show different types of toasts.

#### Methods

- `toast.success(message: string, duration?: number | Options)`
- `toast.error(message: string, duration?: number | Options)`
- `toast.warning(message: string, duration?: number | Options)`
- `toast.info(message: string, duration?: number | Options)`

#### Options

When passing an options object as the second parameter, you can use these properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| duration | `number` | `3000` | Duration in milliseconds (0 = never auto-dismiss) |
| position | `ToastPosition` | Container's position | Override container position for this toast |
| onClose | `() => void` | - | Callback when toast is closed |

## 🎨 Customization

### Custom Styling

You can customize the appearance of toasts by overriding the CSS variables:

```css
:root {
  --toast-bg: rgba(30, 41, 59, 0.95);
  --toast-text: #ffffff;
  --toast-border: rgba(255, 255, 255, 0.1);
  --toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --toast-padding: 12px 16px;
  --toast-border-radius: 8px;
  --toast-icon-size: 20px;
}

## 🚀 Advanced Usage

### Programmatically Remove Toasts

```jsx
import { useToastStore } from 'toastonstaroid';

function MyComponent() {
  const removeToast = useToastStore(state => state.removeToast);
  
  const showTemporaryToast = () => {
    const toastId = toast.info('This will be removed in 2 seconds');
    
    setTimeout(() => {
      removeToast(toastId);
    }, 2000);
  };
  
  return <button onClick={showTemporaryToast}>Show Temporary Toast</button>;
}

### Custom Toast Component

You can create a custom toast component by using the `useToastStore` hook:

```jsx
import { useToastStore } from 'toastonstaroid';

function CustomToast() {
  const { toasts, removeToast } = useToastStore();
  
  return (
    <div className="custom-toast-container">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className={`custom-toast custom-toast--${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="custom-toast__icon">
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'warning' && '⚠'}
            {toast.type === 'info' && 'i'}
          </div>
          <div className="custom-toast__message">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}

## 📱 Responsive Design

Toasts are responsive by default. On mobile devices:
- Width adjusts to screen size (with 16px margins)
- Font size is slightly reduced
- Touch targets are optimized for mobile

## ⚠️ Troubleshooting

### Toasts not showing up?
- Make sure you've added the `<ToastContainer />` to your app
- Check that there are no z-index conflicts with other elements
- Verify that the toast container isn't being hidden by overflow settings

### Animations not working?
- Ensure GSAP is properly installed
- Check the browser console for any errors
- Make sure you're not calling `toast` functions during server-side rendering

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for amazing animations
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Zustand](https://github.com/pmndrs/zustand) for simple state management

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
