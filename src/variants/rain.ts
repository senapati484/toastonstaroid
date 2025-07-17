import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

const createRainEffect = (element: HTMLElement) => {
  const rainContainer = document.createElement('div');
  rainContainer.style.position = 'absolute';
  rainContainer.style.top = '0';
  rainContainer.style.left = '0';
  rainContainer.style.width = '100%';
  rainContainer.style.height = '100%';
  rainContainer.style.overflow = 'hidden';
  rainContainer.style.borderRadius = '8px';
  rainContainer.style.pointerEvents = 'none';
  rainContainer.style.zIndex = '0';
  rainContainer.style.clipPath = 'inset(0 0 0 0)';
  
  // Create multiple rain drops
  for (let i = 0; i < 15; i++) {
    const drop = document.createElement('div');
    drop.style.position = 'absolute';
    drop.style.width = '1px';
    drop.style.height = '15px';
    drop.style.background = 'rgba(147, 197, 253, 0.7)';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = '-20px';
    
    // Animate rain drops
    gsap.to(drop, {
      y: '150%',
      duration: 0.8 + Math.random() * 0.5,
      repeat: -1,
      delay: Math.random() * 2,
      ease: 'linear',
    });
    
    rainContainer.appendChild(drop);
  }
  
  element.style.position = 'relative';
  element.style.overflow = 'visible';
  
  // Ensure close button is clickable
  const closeButton = element.querySelector('button[aria-label="Close toast"]');
  if (closeButton) {
    const button = closeButton as HTMLElement;
    button.style.position = 'relative';
    button.style.zIndex = '1000';
    button.style.pointerEvents = 'auto';
    
    // Make sure the button's parent container doesn't block events
    const buttonContainer = button.parentElement;
    if (buttonContainer) {
      buttonContainer.style.position = 'relative';
      buttonContainer.style.zIndex = '1000';
      buttonContainer.style.pointerEvents = 'auto';
    }
  }
  
  // Insert rain effect at the beginning to ensure it's behind content
  if (element.firstChild) {
    element.insertBefore(rainContainer, element.firstChild);
  } else {
    element.appendChild(rainContainer);
  }
  
  return rainContainer;
};

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

export const rainToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;

    // Initial state
    gsap.set(element, { opacity: 0, y: fromY, x: fromX });

    // Create timeline for the animation sequence
    const tl = gsap.timeline({
      onStart: () => {
        // Add rain effect when animation starts
        createRainEffect(element);
      }
    });

    // Add the animation to the timeline
    tl.add(animateIn(element, fromX, fromY));

    // Add a subtle ripple animation
    tl.to(element, {
      duration: 2,
      '--toast-shadow': '0 0 15px rgba(59, 130, 246, 0.3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    }, '+=0.2');

    // Add a subtle scale pulse
    tl.to(element, {
      scale: 1.01,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    }, '+=0.5');

    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(30, 58, 138, 0.15)',
    '--toast-border': '1px solid rgba(96, 165, 250, 0.2)',
    '--toast-shadow': '0 8px 32px 0 rgba(59, 130, 246, 0.1)',
    color: '#e0f2fe',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '380px',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(
      to bottom,
      rgba(30, 58, 138, 0.15) 0%,
      rgba(30, 58, 138, 0.1) 2px,
      rgba(30, 58, 138, 0.1) 100%
    ),
    linear-gradient(
      to right,
      rgba(59, 130, 246, 0.8) 0%,
      rgba(37, 99, 235, 0.8) 100%
    ) 0 0 / 100% 2px no-repeat`,
    '&:hover': {
      transform: 'translateY(-2px)',
      '--toast-shadow': '0 12px 40px 0 rgba(59, 130, 246, 0.15)'
    } as const
  },
};
