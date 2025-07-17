import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig } from './types';

const createWaterFlowEffect = (element: HTMLElement) => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '0';
  container.style.borderRadius = '8px';
  container.style.clipPath = 'inset(0 0 0 0)';
  container.style.transform = 'translateZ(0)'; // Force hardware acceleration

  // Create water surface with wave effect
  const waterSurface = document.createElement('div');
  waterSurface.style.position = 'absolute';
  waterSurface.style.top = '0';
  waterSurface.style.left = '0';
  waterSurface.style.width = '100%';
  waterSurface.style.height = '100%';
  waterSurface.style.background = 'linear-gradient(0deg, rgba(64, 164, 223, 0.1), rgba(100, 200, 255, 0.2))';
  waterSurface.style.overflow = 'hidden';
  
  // Add wave layers with different speeds and directions
  const createWaveLayer = (speed: number, size: number, opacity: number, direction: number) => {
    const wave = document.createElement('div');
    wave.style.position = 'absolute';
    wave.style.bottom = '0';
    wave.style.left = '0';
    wave.style.width = '200%';
    wave.style.height = `${size}%`;
    wave.style.background = `linear-gradient(90deg, 
      rgba(100, 200, 255, ${opacity}) 0%, 
      rgba(64, 164, 223, ${opacity * 0.8}) 50%, 
      rgba(100, 200, 255, ${opacity}) 100%)`;
    wave.style.transform = 'translateX(0)';
    wave.style.animation = `waveMove ${speed}s linear infinite`;
    wave.style.animationDirection = direction > 0 ? 'normal' : 'reverse';
    
    const keyframes = `
      @keyframes waveMove {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    return wave;
  };
  
  // Add multiple wave layers
  const wave1 = createWaveLayer(20, 40, 0.4, 1);
  const wave2 = createWaveLayer(15, 30, 0.3, -1);
  const wave3 = createWaveLayer(25, 20, 0.2, 1);
  
  waterSurface.appendChild(wave1);
  waterSurface.appendChild(wave2);
  waterSurface.appendChild(wave3);

  // Create bubbles
  const createBubble = () => {
    const bubble = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 20;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    const drift = (Math.random() - 0.5) * 30;
    
    bubble.style.position = 'absolute';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.background = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
    bubble.style.borderRadius = '50%';
    bubble.style.left = `${startX}%`;
    bubble.style.bottom = '0';
    bubble.style.filter = 'blur(0.5px)';
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(0)';
    bubble.style.willChange = 'transform, opacity';
    
    // Animate bubble
    gsap.to(bubble, {
      y: `-${startY}%`,
      x: `${drift}px`,
      opacity: 0.8,
      duration: duration,
      delay: delay,
      ease: 'sine.in',
      onComplete: () => {
        bubble.remove();
        createBubble(); // Create a new bubble when this one finishes
      }
    });
    
    container.appendChild(bubble);
    return bubble;
  };
  
  // Create initial bubbles
  for (let i = 0; i < 8; i++) {
    setTimeout(createBubble, i * 500);
  }

  container.appendChild(waterSurface);
  element.appendChild(container);
  
  // Start bubble generation
  const bubbleInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      createBubble();
    }
  }, 800);
  
  // Ensure the close button is clickable
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

  return () => {
    clearInterval(bubbleInterval);
    container.remove();
  };
};

export const waterflowToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;
    
    // Set initial styles for the toast element
    element.style.willChange = 'transform, opacity';
    element.style.position = 'relative';
    element.style.overflow = 'visible';
    
    // Initial state
    gsap.set(element, { 
      opacity: 0, 
      y: fromY, 
      x: fromX,
      margin: '8px 0', // Add consistent margin
    });
    
    // Add water flow effect
    const cleanup = createWaterFlowEffect(element);
    
    // Create timeline for the animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure proper stacking context after animation
        element.style.zIndex = 'auto';
      }
    });
    
    // Smooth entry animation
    tl.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      onStart: () => {
        // Ensure proper stacking during animation
        element.style.zIndex = '999';
      }
    });
    
    // Remove the bobbing effect as it can cause layout shifts
    // and make toasts overlap with each other
    
    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(13, 71, 161, 0.3)',
    '--toast-border': '1px solid rgba(100, 200, 255, 0.4)',
    '--toast-shadow': '0 0 15px rgba(64, 164, 223, 0.3)',
    color: '#e1f5fe',
    textShadow: '0 0 8px rgba(100, 200, 255, 0.8)',
    padding: '12px 20px',
    margin: '8px 0', // Consistent margin with other toasts
    borderRadius: '8px',
    background: 'linear-gradient(135deg, rgba(13, 71, 161, 0.4) 0%, rgba(2, 119, 189, 0.4) 100%)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(100, 200, 255, 0.4)',
    boxShadow: '0 4px 15px rgba(64, 164, 223, 0.3)',
    overflow: 'visible', // Changed from hidden to prevent clipping
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '56px', // Match other toasts
    boxSizing: 'border-box',
    transition: 'all 0.3s ease, transform 0.2s ease-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(100, 200, 255, 0.4)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.6), transparent)',
      animation: 'shine 3s infinite'
    }
  } as const,
  
  // Add shine animation
  additionalStyles: `
    @keyframes shine {
      0% { transform: translateX(-100%) }
      20%, 100% { transform: translateX(100%) }
    }
  `,
};
