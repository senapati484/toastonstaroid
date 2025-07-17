import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

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
      duration: 0.6,
      ease: 'elastic.out(1, 0.7)',
    }
  );

  // Return the animation to be used in timeline
  return gsap.timeline();
};

export const successToast: ToastConfig = {
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
    const tl = gsap.timeline();

    // Add the animation to the timeline
    tl.add(animateIn(element, fromX, fromY));

    // Add a subtle glow animation
    tl.to(element, {
      duration: 2,
      '--toast-shadow': '0 0 15px rgba(74, 222, 128, 0.3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      pointerEvents: 'auto',
    }, '+=0.2');

    // Add a subtle scale pulse
    tl.to(element, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    }, '+=0.5');

    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(16, 185, 129, 0.15)',
    '--toast-border': 'rgba(255, 255, 255, 0.1)',
    '--toast-shadow': '0 8px 32px 0 rgba(16, 185, 129, 0.1)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '380px',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(
      to bottom,
      rgba(16, 185, 129, 0.15) 0%,
      rgba(16, 185, 129, 0.1) 2px,
      rgba(16, 185, 129, 0.1) 100%
    ),
    linear-gradient(
      to right,
      rgba(16, 185, 129, 0.8) 0%,
      rgba(5, 150, 105, 0.8) 100%
    ) 0 0 / 100% 2px no-repeat`,
    '&:hover': {
      transform: 'translateY(-2px)',
      '--toast-shadow': '0 12px 40px 0 rgba(16, 185, 129, 0.15)'
    } as const
  },
};
