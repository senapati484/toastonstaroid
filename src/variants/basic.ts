import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig } from './types';

const animateIn = (element: HTMLElement, fromX: number, fromY: number) => {
  gsap.fromTo(element,
    {
      x: fromX,
      y: fromY,
      opacity: 0,
      scale: 0.9,
      transformOrigin: 'center',
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    }
  );

  return gsap.timeline();
};

export const basicToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;

    // Ensure close button is clickable
    const closeButton = element.querySelector('button[aria-label="Close toast"]') as HTMLElement;
    if (closeButton) {
      closeButton.style.pointerEvents = 'auto';
      closeButton.style.zIndex = '1001';
      closeButton.style.position = 'relative';
    }

    // Initial state
    gsap.set(element, { 
      opacity: 0, 
      y: fromY, 
      x: fromX,
      pointerEvents: 'auto',
      zIndex: 1000,
    });

    // Create timeline for the animation sequence
    const tl = gsap.timeline({ paused: true });
    
    // Main animation
    tl.add(animateIn(element, fromX, fromY));

    // Hover effect
    element.addEventListener('mouseenter', () => {
      gsap.to(element, { 
        y: '-=2', 
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, { 
        y: 0, 
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': '#ffffff',
    '--toast-border': 'rgba(0, 0, 0, 0.1)',
    '--toast-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
    color: '#000000',
    '&:hover': {
      '--toast-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    '&::before': {
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    },
  } as const,
  additionalStyles: `
    .toast-button {
      color: #000000;
      transition: all 0.2s ease;
    }
    .toast-button:hover {
      color: #333333;
      background-color: rgba(0, 0, 0, 0.05);
    }
    .toast-button:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `,
};
