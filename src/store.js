import { create } from "zustand";

// Create a store instance with fallbacks for safety
const createStore = () => {
  try {
    return create((set) => ({
      toasts: [],
      addToast: (toast) =>
        set((state) => ({
          toasts: [
            {
              id: Date.now(),
              duration: 5000,
              variant: "default",
              ...toast,
            },
            ...state.toasts,
          ].slice(0, 10), // Limit maximum number of toasts
        })),
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    }));
  } catch (error) {
    console.error("Error creating toast store:", error);

    // Fallback store implementation
    let toasts = [];
    return {
      getState: () => ({
        toasts,
        addToast: (toast) => {
          const newToast = {
            id: Date.now(),
            duration: 5000,
            variant: "default",
            ...toast,
          };
          toasts = [newToast, ...toasts].slice(0, 10);
          return newToast;
        },
        removeToast: (id) => {
          toasts = toasts.filter((toast) => toast.id !== id);
        },
      }),
      subscribe: () => () => {}, // Noop unsubscribe
    };
  }
};

export const useToastStore = createStore();
