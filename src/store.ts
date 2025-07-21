import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'fire' | 'rain' | 'smoke' | 'cyberpunk' | 'dragonball' | 'waterflow' | 'basic';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  textColor?: string;
  iconColor?: string;
  backgroundStyle?: 'blur' | 'solid';
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, toast.duration || 3000);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
