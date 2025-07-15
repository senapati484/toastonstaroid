import { create } from "zustand";
import { nanoid } from "nanoid";

const createToastStore = (config = {}) =>
  create((set, get) => ({
    toasts: [],
    pausedToasts: new Set(),
    config: {
      maxToasts: 3,
      ...config,
    },

    addToast: (toast) => {
      const id = toast.id || nanoid();
      const newToast = {
        id,
        createdAt: Date.now(),
        isPaused: false,
        progress: 0,
        ...toast,
      };

      set((state) => {
        const toasts = [...state.toasts];
        if (toasts.length >= state.config.maxToasts) {
          toasts.shift();
        }
        return { toasts: [...toasts, newToast] };
      });

      return id;
    },

    updateToast: (id, updates) => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, ...updates } : toast
        ),
      }));
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
        pausedToasts: new Set(
          [...state.pausedToasts].filter((toastId) => toastId !== id)
        ),
      }));
    },

    clearAll: () => {
      set({ toasts: [], pausedToasts: new Set() });
    },

    pauseToast: (id) => {
      set((state) => {
        const pausedToasts = new Set(state.pausedToasts);
        pausedToasts.add(id);
        return {
          pausedToasts,
          toasts: state.toasts.map((toast) =>
            toast.id === id ? { ...toast, isPaused: true } : toast
          ),
        };
      });
    },

    resumeToast: (id) => {
      set((state) => {
        const pausedToasts = new Set(state.pausedToasts);
        pausedToasts.delete(id);
        return {
          pausedToasts,
          toasts: state.toasts.map((toast) =>
            toast.id === id ? { ...toast, isPaused: false } : toast
          ),
        };
      });
    },

    updateProgress: (id, progress) => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, progress } : toast
        ),
      }));
    },

    getToast: (id) => {
      return get().toasts.find((toast) => toast.id === id);
    },

    setConfig: (newConfig) => {
      set((state) => ({
        config: {
          ...state.config,
          ...newConfig,
        },
      }));
    },
  }));

export const useToastStore = createToastStore();
