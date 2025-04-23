# toastonstaroid

A simple React toast notification package.

## Installation

```
npm install toastonstaroid
```

## Usage

1. **Add `ToastContainer` to your root component (e.g., Home route):**

```jsx
import { ToastContainer } from 'toastonstaroid';

function App() {
  return (
    <>
      <ToastContainer />
      {/* your routes/components */}
    </>
  );
}
```

2. **Show a toast message from anywhere:**

```jsx
import { toast } from 'toastonstaroid';

toast('Hello, this is a toast!');
```

You can call `toast()` multiple times from anywhere in your app.

## Customization

### Toast options
You can pass options like `duration` and `variant`:

```js
// Duration in ms
toast('Short toast', { duration: 1500 });

// Variants: success, error, warning, info
toast('Success!', { variant: 'success' });
toast('Oops, error!', { variant: 'error' });
toast('Be careful!', { variant: 'warning' });
toast('FYI: Info', { variant: 'info' });
```

Each variant has its own color and icon.

### Full Customization
You have full control over the toast container and toast appearance!

#### Container position
You can control the location of the toast container using the `position` prop:

```jsx
<ToastContainer position="bottom-center" />
<ToastContainer position="top-center" />
<ToastContainer position="top-right" />
<ToastContainer position="bottom-left" />
<ToastContainer position="top-left" />
```

Default is `bottom-right`.

#### Container style
```jsx
<ToastContainer containerStyle={{ top: 40, right: 40, borderRadius: 12, width: 400 }} />
```

#### Toast style and props
```jsx
<ToastContainer toastProps={{ style: { fontSize: 20, borderRadius: 16 }, icon: '🔥' }} />
```

#### Custom render function
```jsx
<ToastContainer renderToast={(toast, idx) => (
  <div key={idx} style={{ background: 'black', color: 'lime', padding: 24, border: '2px dashed lime' }}>
    <b>{toast.message}</b>
  </div>
)} />
```

#### Advanced: Override variant components
You can import and use your own variant components, or fork the provided ones (`ToastSuccess`, `ToastError`, etc.) for even more control.


---

MIT License
