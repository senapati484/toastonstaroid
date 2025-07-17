import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

const animateIn = (element: HTMLElement, fromX: number, fromY: number) => {
  return gsap.fromTo(element,
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
};

export const errorToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;

    // Initial state
    gsap.set(element, { opacity: 0, y: fromY, x: fromX });

    // Create timeline for the animation sequence
    const tl = gsap.timeline();

    // Add the animation to the timeline
    tl.add(animateIn(element, fromX, fromY));

    // Add shake effect
    tl.to(element, {
      keyframes: [
        { x: '-=5', duration: 0.05 },
        { x: '+=10', duration: 0.1 },
        { x: '-=10', duration: 0.1 },
        { x: '+=5', duration: 0.05 },
      ],
      repeat: 1,
      yoyo: true,
      ease: 'power1.inOut',
    }, '+=0.2');

    // Add a subtle glow
    tl.to(element, {
      duration: 2,
      '--toast-shadow': '0 0 15px rgba(239, 68, 68, 0.3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    }, '+=0.1');

    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(239, 68, 68, 0.15)',
    '--toast-border': 'rgba(255, 255, 255, 0.1)',
    '--toast-shadow': '0 8px 32px 0 rgba(239, 68, 68, 0.1)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '380px',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(
      to bottom,
      rgba(239, 68, 68, 0.15) 0%,
      rgba(239, 68, 68, 0.1) 2px,
      rgba(239, 68, 68, 0.1) 100%
    ),
    linear-gradient(
      to right,
      rgba(239, 68, 68, 0.8) 0%,
      rgba(220, 38, 38, 0.8) 100%
    ) 0 0 / 100% 2px no-repeat`,
    '&:hover': {
      transform: 'translateY(-2px)',
      '--toast-shadow': '0 12px 40px 0 rgba(239, 68, 68, 0.15)'
    } as const
  },
};
