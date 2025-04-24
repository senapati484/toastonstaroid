# Toastonstaroid 🍞

A beautiful, lightweight toast notification system for React applications.

## Features ✨

- 🚀 Easy to use
- 🎨 Beautiful, modern design
- 🎯 Multiple variants (success, error, warning, info)
- ⚡️ Smooth animations
- 📱 Responsive
- 🎛 Customizable
- 🪶 Lightweight
- ⚛️ Compatible with React 16.8+ through React 19

## Installation 📦

```bash
npm install toastonstaroid
# or
yarn add toastonstaroid
```

If you're using React 19, you might need to use the `--legacy-peer-deps` flag:

```bash
npm install toastonstaroid --legacy-peer-deps
# or
yarn add toastonstaroid --ignore-peer-deps
```

## Basic Usage 🚀

```jsx
import { ToastContainer, toast } from "toastonstaroid";

function App() {
  return (
    <div>
      {/* Add ToastContainer to your app */}
      <ToastContainer />

      {/* Your app content */}
    </div>
  );
}

// Show different types of toasts
function MyComponent() {
  const showToasts = () => {
    // Success toast
    toast.success("Successfully saved!");

    // Error toast
    toast.error("Something went wrong");

    // Warning toast
    toast.warning("Please check your input");

    // Info toast
    toast.info("New updates available");

    // Default toast
    toast("Hello world!");
  };

  return <button onClick={showToasts}>Show Toasts</button>;
}
```

## Advanced Usage 🔧

```jsx
// Toast with description and action
toast.success("Changes saved!", {
  description: "Your profile has been updated successfully",
  duration: 5000,
  action: {
    label: "Undo",
    onClick: () => {
      console.log("Undo clicked");
    },
  },
});

// Custom styling
toast.info("Custom styled toast", {
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
});

// Positioning
function App() {
  return (
    <ToastContainer
      position="top-right" // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
    />
  );
}
```

## ✨ Unique Animated Toasts

Toastonstaroid comes with a set of unique, eye-catching animated toasts powered by Anime.js!

### 🔥 Fire Toast

The most eye-catching toast variant with animated flames and burning text effect:

```jsx
// Fire toast with animated flames
toast.fire("🔥 This message is on fire!", {
  description: "Watch out, it's getting hot in here!",
  action: {
    label: "Cool Down",
    onClick: () => console.log("Cooling down..."),
  },
});
```

Features of the Fire Toast:

- Animated flames using particle effects
- Glowing text with burning animation
- Dark theme with orange accents
- Smooth entrance animation
- Progress bar with fire effect
- Interactive hover states with heat effect

### ✨ Magic Toast

```jsx
// Magic toast with ripple effect and gradient background
toast.magic("✨ Something magical happened!", {
  description: "Your wishes have been granted",
  action: {
    label: "Cast Again",
    onClick: () => console.log("Magic!"),
  },
});
```

### Available Animations

- `ripple`: Smooth scale and fade entrance
- `bounce`: Bouncy entrance from top
- `spin`: 3D rotation entrance
- `glitch`: Glitch effect entrance
- `fire`: Animated flames effect (Fire toast only)
- Default: Simple fade in

### Animation Options

You can customize any toast with these animations:

```jsx
toast.success("Custom Animation!", {
  animation: "ripple", // Choose any animation
  duration: 7000, // Duration in ms
  style: {
    background: "linear-gradient(135deg, #00b09b, #96c93d)",
    backdropFilter: "blur(8px)", // Glass effect
  },
});
```

### Features of Animated Toasts

- 🎨 Beautiful gradient backgrounds
- ⚡️ Smooth animations powered by Anime.js
- 🌟 Progress bar indicator
- 🎭 Multiple animation styles
- 💫 Glass morphism effects
- 🎯 Interactive hover states
- 🎪 Emoji indicators
- 🌈 Custom styling support

## API Reference 📚

### ToastContainer Props

| Prop           | Type   | Default        | Description                     |
| -------------- | ------ | -------------- | ------------------------------- |
| position       | string | 'bottom-right' | Position of the toast container |
| containerStyle | object | {}             | Custom styles for the container |

### Toast Function

```typescript
toast(message: string, options?: ToastOptions)

// Variants
toast.success(message: string, options?: ToastOptions)
toast.error(message: string, options?: ToastOptions)
toast.warning(message: string, options?: ToastOptions)
toast.info(message: string, options?: ToastOptions)
```

### ToastOptions

| Option      | Type   | Default   | Description                                                      |
| ----------- | ------ | --------- | ---------------------------------------------------------------- |
| description | string | -         | Additional description text                                      |
| duration    | number | 5000      | Duration in milliseconds                                         |
| variant     | string | 'default' | Toast variant ('success', 'error', 'warning', 'info', 'default') |
| action      | object | -         | Action button configuration                                      |
| style       | object | -         | Custom styles for the toast                                      |

### Action Object

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| label    | string   | Text for the action button   |
| onClick  | function | Click handler for the action |

## License 📄

MIT © [Sayan Senapati]
