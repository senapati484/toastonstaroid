//base.ts

import { gsap } from 'gsap';
import { CSSProperties } from 'react';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

type PseudoStyles = {
  '&::before'?: CSSProperties;
  '&:hover'?: CSSProperties;
};

type ContainerStyles = CSSProperties & {
  '--toast-bg'?: string;
  '--toast-border'?: string;
  '--toast-shadow'?: string;
} & PseudoStyles;

export interface ToastConfig {
  animation: (element: HTMLElement, position: string) => gsap.core.Timeline;
  containerStyles: ContainerStyles;
}

export const glassEffect: ContainerStyles = {
  backdropFilter: 'blur(12px) saturate(180%)',
  WebkitBackdropFilter: 'blur(12px) saturate(180%)',
  backgroundColor: 'var(--toast-bg, rgba(30, 41, 59, 0.8))',
  border: '1px solid var(--toast-border, rgba(255, 255, 255, 0.1))',
  borderRadius: '8px',
  boxShadow: 'var(--toast-shadow, 0 4px 12px rgba(0, 0, 0, 0.15))',
  transition: 'all 0.2s ease-out',
  width: '320px',
  minHeight: '56px',
  maxWidth: 'calc(100vw - 32px)',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'visible',
  margin: '4px 0',
  cursor: 'default',
  userSelect: 'none',
  pointerEvents: 'auto',
  zIndex: 1000,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
  }
};

export const getPositionStyles = (position: ToastPosition): CSSProperties => {
  const baseStyles: CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    pointerEvents: 'none',
    padding: '16px',
    maxWidth: '100vw',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const positionStyles: Record<ToastPosition, CSSProperties> = {
    'top-left': {
      top: 'env(safe-area-inset-top, 0)',
      left: 'env(safe-area-inset-left, 0)',
      alignItems: 'flex-start',
    },
    'top-center': {
      top: 'env(safe-area-inset-top, 0)',
      left: '50%',
      transform: 'translateX(-50%)',
      alignItems: 'center',
    },
    'top-right': {
      top: 'env(safe-area-inset-top, 0)',
      right: 'env(safe-area-inset-right, 0)',
      alignItems: 'flex-end',
    },
    'bottom-left': {
      bottom: 'env(safe-area-inset-bottom, 0)',
      left: 'env(safe-area-inset-left, 0)',
      alignItems: 'flex-start',
    },
    'bottom-center': {
      bottom: 'env(safe-area-inset-bottom, 0)',
      left: '50%',
      transform: 'translateX(-50%)',
      alignItems: 'center',
    },
    'bottom-right': {
      bottom: 'env(safe-area-inset-bottom, 0)',
      right: 'env(safe-area-inset-right, 0)',
      alignItems: 'flex-end',
    },
  };

  return {
    ...baseStyles,
    ...positionStyles[position],
  };
};
