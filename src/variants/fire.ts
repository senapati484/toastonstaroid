import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

const createFireEffect = (element: HTMLElement) => {
  const fireContainer = document.createElement('div');
  fireContainer.style.position = 'absolute';
  fireContainer.style.bottom = '0';
  fireContainer.style.left = '0';
  fireContainer.style.width = '100%';
  fireContainer.style.height = '4px';
  fireContainer.style.overflow = 'hidden';
  fireContainer.style.borderRadius = '0 0 8px 8px';
  
  for (let i = 0; i < 5; i++) {
    const flame = document.createElement('div');
    flame.style.position = 'absolute';
    flame.style.bottom = '0';
    flame.style.width = `${10 + Math.random() * 10}px`;
    flame.style.height = '10px';
    flame.style.background = `linear-gradient(to top, #ff7800, #ff4800, #ff1e00)`;
    flame.style.borderRadius = '50% 50% 0 0';
    flame.style.left = `${10 + i * 20}%`;
    flame.style.filter = 'blur(1px)';
    
    gsap.to(flame, {
      scaleY: 1.5,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 0.5
    });
    
    fireContainer.appendChild(flame);
  }
  
  element.appendChild(fireContainer);
  return fireContainer;
};

export const fireToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;
    
    // Initial state
    gsap.set(element, { opacity: 0, y: fromY, x: fromX });
    
    // Create timeline for the animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // Add fire effect after animation completes
        createFireEffect(element);
      }
    });
    
    // Add the animation to the timeline
    tl.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });
    
    // Flicker effect
    tl.to(element, {
      keyframes: [
        { opacity: 0.9, duration: 0.05 },
        { opacity: 1, duration: 0.05 },
        { opacity: 0.95, duration: 0.05 },
      ],
      repeat: -1,
      yoyo: true,
      ease: 'none',
    }, 0);
    
    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(120, 53, 15, 0.2)',
    '--toast-border': '1px solid rgba(255, 120, 0, 0.2)',
    '--toast-shadow': '0 8px 32px 0 rgba(255, 72, 0, 0.2)',
    color: '#ffedd5',
    borderLeft: '3px solid #ff7700',
    padding: '12px 16px',
    '&::before': {
      background: 'linear-gradient(90deg, #ff4800, #ff7700)',
    },
    '&:hover': {
      boxShadow: '0 8px 32px 0 rgba(255, 72, 0, 0.3)',
      transform: 'translateY(-2px)',
    },
  },
};
