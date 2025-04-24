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

## Installation 📦

```bash
npm install toastonstaroid
# or
yarn add toastonstaroid
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
