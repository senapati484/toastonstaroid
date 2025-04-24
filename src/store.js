import { create } from "zustand";

export const useToastStore = create((set) => ({
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
