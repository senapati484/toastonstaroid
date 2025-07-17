import { gsap } from 'gsap';
import { glassEffect } from './base';
import { ToastConfig } from './types';

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

export const warningToast: ToastConfig = {
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

    // Add a subtle pulse animation
    tl.to(element, {
      duration: 2,
      '--toast-shadow': '0 0 15px rgba(251, 191, 36, 0.3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      pointerEvents: 'auto',
    }, '+=0.2');

    // Add a subtle glow
    tl.to(element, {
      duration: 2,
      '--toast-shadow': '0 0 15px rgba(245, 158, 11, 0.3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    }, '+=0.1');

    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(245, 158, 11, 0.15)',
    '--toast-border': 'rgba(255, 255, 255, 0.1)',
    '--toast-shadow': '0 8px 32px 0 rgba(245, 158, 11, 0.15)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '380px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  additionalStyles: `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, rgba(245, 158, 11, 0.8), rgba(251, 191, 36, 0.8));
    }
    &:hover {
      transform: translateY(-2px);
      --toast-shadow: 0 12px 40px 0 rgba(245, 158, 11, 0.15);
    }
  `,
};
