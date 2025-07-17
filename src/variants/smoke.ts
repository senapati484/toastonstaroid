import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

const createSmokeEffect = (element: HTMLElement) => {
  const smokeContainer = document.createElement('div');
  smokeContainer.style.position = 'absolute';
  smokeContainer.style.bottom = '0';
  smokeContainer.style.left = '0';
  smokeContainer.style.width = '100%';
  smokeContainer.style.height = '100%';
  smokeContainer.style.overflow = 'hidden';
  smokeContainer.style.pointerEvents = 'none';
  smokeContainer.style.borderRadius = '8px';
  
  // Create smoke particles
  for (let i = 0; i < 8; i++) {
    const smoke = document.createElement('div');
    smoke.style.position = 'absolute';
    smoke.style.width = '20px';
    smoke.style.height = '20px';
    smoke.style.background = 'rgba(255, 255, 255, 0.6)';
    smoke.style.borderRadius = '50%';
    smoke.style.filter = 'blur(5px)';
    smoke.style.left = `${20 + Math.random() * 60}%`;
    smoke.style.bottom = '0';
    smoke.style.opacity = '0';
    
    // Animate smoke particles
    gsap.to(smoke, {
      y: -60,
      x: `+=${(Math.random() - 0.5) * 40}`,
      scale: 2 + Math.random() * 2,
      opacity: 0.3,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      delay: Math.random() * 3,
      ease: 'power1.out',
    });
    
    smokeContainer.appendChild(smoke);
  }
  
  element.style.position = 'relative';
  element.appendChild(smokeContainer);
  return smokeContainer;
};

export const smokeToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;
    
    // Initial state
    gsap.set(element, { opacity: 0, y: fromY, x: fromX });
    
    // Create timeline for the animation sequence
    const tl = gsap.timeline({
      onStart: () => {
        // Add smoke effect when animation starts
        createSmokeEffect(element);
      }
    });
    
    // Add the animation to the timeline
    tl.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });
    
    // Fade in/out effect
    tl.to(element, {
      opacity: 0.95,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }, 0);
    
    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(75, 85, 99, 0.15)',
    '--toast-border': '1px solid rgba(209, 213, 219, 0.2)',
    '--toast-shadow': '0 8px 32px 0 rgba(156, 163, 175, 0.1)',
    color: '#f3f4f6',
    borderLeft: '3px solid #9ca3af',
    padding: '12px 16px',
    '&::before': {
      background: 'linear-gradient(90deg, #4b5563, #9ca3af)',
    },
    '&:hover': {
      boxShadow: '0 8px 32px 0 rgba(156, 163, 175, 0.2)',
      transform: 'translateY(-2px)',
    },
  },
};
