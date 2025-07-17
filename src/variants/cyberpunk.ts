import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

const createCyberpunkEffect = (element: HTMLElement) => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';
  container.style.pointerEvents = 'none';
  container.style.borderRadius = '8px';
  container.style.zIndex = '-1';
  
  // Create scanlines
    const scanlines = document.createElement('div');
  scanlines.style.position = 'absolute';
  scanlines.style.top = '0';
  scanlines.style.left = '0';
  scanlines.style.width = '100%';
  scanlines.style.height = '200%';
  scanlines.style.background = 'repeating-linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 0px, rgba(0, 255, 255, 0.05) 1px, transparent 1px, transparent 3px)';
  
  // Animate scanlines
  gsap.to(scanlines, {
    y: '-100%',
    duration: 4,
    repeat: -1,
    ease: 'none',
  });
  
  // Create grid overlay
  const grid = document.createElement('div');
  grid.style.position = 'absolute';
  grid.style.top = '0';
  grid.style.left = '0';
  grid.style.width = '100%';
  grid.style.height = '100%';
  grid.style.backgroundImage = 
    'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), ' +
    'linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)';
  grid.style.backgroundSize = '20px 20px';
  grid.style.opacity = '0.5';
  
  // Create corner brackets
  const createCorner = (position: string) => {
    const corner = document.createElement('div');
    corner.style.position = 'absolute';
    corner.style.width = '10px';
    corner.style.height = '10px';
    corner.style.borderColor = '#00ffff';
    corner.style.borderStyle = 'solid';
    corner.style.borderWidth = '0';
    
    switch(position) {
      case 'top-left':
        corner.style.top = '0';
        corner.style.left = '0';
        corner.style.borderTopWidth = '2px';
        corner.style.borderLeftWidth = '2px';
        corner.style.borderTopLeftRadius = '4px';
        break;
      case 'top-right':
        corner.style.top = '0';
        corner.style.right = '0';
        corner.style.borderTopWidth = '2px';
        corner.style.borderRightWidth = '2px';
        corner.style.borderTopRightRadius = '4px';
        break;
      case 'bottom-left':
        corner.style.bottom = '0';
        corner.style.left = '0';
        corner.style.borderBottomWidth = '2px';
        corner.style.borderLeftWidth = '2px';
        corner.style.borderBottomLeftRadius = '4px';
        break;
      case 'bottom-right':
        corner.style.bottom = '0';
        corner.style.right = '0';
        corner.style.borderBottomWidth = '2px';
        corner.style.borderRightWidth = '2px';
        corner.style.borderBottomRightRadius = '4px';
        break;
    }
    
    return corner;
  };
  
  container.appendChild(scanlines);
  container.appendChild(grid);
  container.appendChild(createCorner('top-left'));
  container.appendChild(createCorner('top-right'));
  container.appendChild(createCorner('bottom-left'));
  container.appendChild(createCorner('bottom-right'));
  
  element.style.position = 'relative';
  element.appendChild(container);
  return container;
};

export const cyberpunkToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;
    
    // Initial state
    gsap.set(element, { 
      opacity: 0, 
      y: fromY, 
      x: fromX,
      filter: 'hue-rotate(0deg)'
    });
    
    // Create timeline for the animation sequence
    const tl = gsap.timeline({
      onStart: () => {
        // Add cyberpunk effect when animation starts
        createCyberpunkEffect(element);
      }
    });
    
    // Add the animation to the timeline
    tl.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
    
    // Add glitch effect
    tl.to(element, {
      keyframes: [
        { x: '-=2', y: '+=2', duration: 0.02 },
        { x: '+=4', y: '-=4', duration: 0.02 },
        { x: '-=2', y: '+=2', duration: 0.02 },
      ],
      repeat: -1,
      repeatDelay: 3,
      yoyo: true,
      ease: 'none',
    }, 0);
    
    // Color shift effect
    tl.to(element, {
      filter: 'hue-rotate(360deg)',
      duration: 20,
      repeat: -1,
      ease: 'none',
    }, 0);
    
    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(6, 2, 23, 0.7)',
    '--toast-border': '1px solid rgba(0, 255, 255, 0.3)',
    '--toast-shadow': '0 0 15px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.1)',
    color: '#00ffff',
    textShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
    padding: '12px 16px',
    '&::before': {
      background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
    },
    '&:hover': {
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
    },
  },
};
