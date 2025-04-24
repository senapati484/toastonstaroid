import React from "react";
import { ToastContainer, toast } from "toastonstaroid";

function App() {
  const showBasicToast = () => {
    toast("This is a basic toast message");
  };

  const showSuccessToast = () => {
    toast.success("Operation completed successfully");
  };

  const showErrorToast = () => {
    toast.error("An error occurred");
  };

  const showWarningToast = () => {
    toast.warning("Warning: This action cannot be undone");
  };

  const showInfoToast = () => {
    toast.info("The system will undergo maintenance tonight");
  };

  const showFireToast = () => {
    toast.fire("🔥 Hot content alert!", {
      description: "This message is on fire",
      action: {
        label: "Extinguish",
        onClick: () => console.log("Fire extinguished"),
      },
    });
  };

  const showSmokeToast = () => {
    toast.smoke("💨 Message fading away...", {
      description: "Like smoke in the wind",
      action: {
        label: "Clear",
        onClick: () => console.log("Smoke cleared"),
      },
    });
  };

  const showCyberpunkToast = () => {
    toast.cyberpunk("SYSTEM ALERT", {
      description: "Neural connection established",
      action: {
        label: "JACK IN",
        onClick: () => console.log("Connected to the system"),
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1>Toast Examples</h1>

      <h2>Basic Toasts</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={showBasicToast}>Basic</button>
        <button onClick={showSuccessToast}>Success</button>
        <button onClick={showErrorToast}>Error</button>
        <button onClick={showWarningToast}>Warning</button>
        <button onClick={showInfoToast}>Info</button>
      </div>

      <h2>Special Animated Variants</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={showFireToast}>Fire</button>
        <button onClick={showSmokeToast}>Smoke</button>
        <button onClick={showCyberpunkToast}>Cyberpunk</button>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
