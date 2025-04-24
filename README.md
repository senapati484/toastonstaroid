# ToastOnStaroid 🚀

A modern, customizable toast notification system for React applications with beautiful animations and multiple variants.

## Features ✨

- 🚀 Easy to use with simple API
- 🎨 Multiple variants: Default, Glass, and more
- 🎯 Customizable styles
- 🔥 Hover effects
- 📦 Lightweight
- 💫 Glass morphism effects
- 🎨 Gradient backgrounds
- ⚡️ Smooth transitions
- 📱 Responsive design
- 🎭 Beautiful animations
- 🎯 Customizable styles
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

## Quick Start

1. First, wrap your app with the `ToastContainer`:

```jsx
import { ToastContainer } from "toastonstaroid";

function App() {
  return (
    <>
      <YourApp />
      <ToastContainer position="bottom-right" />
    </>
  );
}
```

2. Then use the toast methods anywhere in your app:

```jsx
import { useToastStore } from "toastonstaroid";

function YourComponent() {
  const { success, error, warning, info } = useToastStore();

  const handleClick = () => {
    success("Operation completed successfully!");
    // or
    error("Something went wrong!");
    // or
    warning("Please be careful!");
    // or
    info("Here's some information!");
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

## Toast Variants

### Default Toast

The default toast variant features a modern design with gradient backgrounds and smooth animations.

```jsx
success("Success message", {
  description: "Additional information",
  duration: 5000,
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
});
```

Features:

- Gradient backgrounds
- Smooth hover animations
- Rotating close button
- Responsive design
- Customizable styles

### Glass Toast

A modern glass morphism variant with blur effects and semi-transparent backgrounds.

```jsx
success("Success message", {
  variant: "glass",
  description: "Additional information",
  duration: 5000,
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
});
```

Features:

- Glass morphism effect with backdrop blur
- Semi-transparent backgrounds
- Subtle borders
- Smooth entrance animations
- Interactive hover states

## API Reference 📚

### ToastContainer Props

| Prop           | Type   | Default        | Description                                                                                                                     |
| -------------- | ------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| position       | string | "bottom-right" | Position of the toast container. Options: "top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center" |
| containerStyle | object | {}             | Custom styles for the container                                                                                                 |

### Toast Methods

```jsx
const { success, error, warning, info } = useToastStore();

// Basic usage
success("Success message");
error("Error message");
warning("Warning message");
info("Info message");

// With options
success("Success message", {
  duration: 5000, // Duration in milliseconds
  description: "Additional information",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
  variant: "glass", // Optional: "default" or "glass"
  style: {
    // Custom styles
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
});
```

### Toast Options

| Option      | Type   | Default   | Description                          |
| ----------- | ------ | --------- | ------------------------------------ |
| duration    | number | 5000      | Duration in milliseconds             |
| description | string | -         | Additional description text          |
| action      | object | -         | Action button configuration          |
| variant     | string | "default" | Toast variant ("default" or "glass") |
| style       | object | -         | Custom styles for the toast          |

### Action Object

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| label    | string   | Text for the action button   |
| onClick  | function | Click handler for the action |

## Styling

### Default Variant Styles

```jsx
const styles = {
  success: {
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  error: {
    background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  warning: {
    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  info: {
    background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  default: {
    background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
};
```

### Glass Variant Styles

```jsx
const styles = {
  success: {
    background: "rgba(16, 185, 129, 0.1)",
    color: "#10B981",
    border: "1px solid rgba(16, 185, 129, 0.2)",
  },
  error: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#EF4444",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  warning: {
    background: "rgba(245, 158, 11, 0.1)",
    color: "#F59E0B",
    border: "1px solid rgba(245, 158, 11, 0.2)",
  },
  info: {
    background: "rgba(59, 130, 246, 0.1)",
    color: "#3B82F6",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },
  default: {
    background: "rgba(31, 41, 55, 0.1)",
    color: "#1F2937",
    border: "1px solid rgba(31, 41, 55, 0.2)",
  },
};
```

## Best Practices

1. **Message Length**

   - Keep messages concise and clear
   - Use description for additional details
   - Avoid long messages that might wrap

2. **Duration**

   - Success messages: 3-5 seconds
   - Error messages: 5-7 seconds
   - Warning messages: 4-6 seconds
   - Info messages: 3-5 seconds

3. **Positioning**

   - Use bottom positions for less intrusive notifications
   - Use top positions for critical alerts
   - Consider mobile responsiveness

4. **Actions**

   - Use clear, actionable labels
   - Keep actions simple and direct
   - Use actions sparingly

5. **Variants**
   - Use default variant for most cases
   - Use glass variant for a modern, translucent look
   - Match variant to your app's design system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT © [Sayan Senapati]
