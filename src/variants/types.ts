import { CSSProperties } from 'react';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'fire' | 'rain' | 'smoke' | 'cyberpunk';

type CSSCustomProperties = {
  '--toast-bg'?: string;
  '--toast-border'?: string;
  '--toast-shadow'?: string;
};

export interface PseudoStyles {
  '&:hover'?: CSSProperties & CSSCustomProperties;
  '&::before'?: CSSProperties & CSSCustomProperties;
  '&::after'?: CSSProperties & CSSCustomProperties;
}

export interface ToastStyles extends CSSProperties, CSSCustomProperties, PseudoStyles {}

export interface ToastConfig {
  animation: (element: HTMLElement, position: string) => gsap.core.Timeline;
  containerStyles: ToastStyles;
  additionalStyles?: string;
}

export interface ToastOptions {
    duration?: number;
    position?: ToastPosition;
}
