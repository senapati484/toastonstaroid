import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig } from './types';
import { random } from 'gsap/gsap-core';

const createDragonBallEffect = (element: HTMLElement) => {
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
  container.style.opacity = '0.7';
  container.style.background = 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)';
  container.style.overflow = 'visible';
  container.style.clipPath = 'inset(0 0 0 0)';

  // Create multiple aura layers for more dynamic effect
  const createAuraLayer = (size: string, color: string, blur: string, delay: number) => {
    const aura = document.createElement('div');
    aura.style.position = 'absolute';
    aura.style.top = '50%';
    aura.style.left = '50%';
    aura.style.width = size;
    aura.style.height = size;
    aura.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    aura.style.transform = 'translate(-50%, -50%)';
    aura.style.borderRadius = '50%';
    aura.style.filter = `blur(${blur})`;
    aura.style.opacity = '0';
    
    // Animate the aura
    gsap.to(aura, {
      scale: 1.5,
      opacity: 0.4,
      duration: 2 + Math.random(),
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    return aura;
  };
  
  // Add multiple aura layers
  container.appendChild(createAuraLayer('200%', 'rgba(255,215,0,0.3)', '15px', 0));
  container.appendChild(createAuraLayer('180%', 'rgba(255,165,0,0.2)', '12px', 0.2));
  container.appendChild(createAuraLayer('220%', 'rgba(255,100,0,0.15)', '20px', 0.4));
  
  // Add floating particles
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 4;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)';
    particle.style.borderRadius = '50%';
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.filter = 'blur(1px)';
    particle.style.opacity = '0.7';
    
    // Animate particles
    gsap.to(particle, {
      x: `+=${(Math.random() - 0.5) * 40}`,
      y: `+=${(Math.random() - 0.5) * 40}`,
      scale: 0.5,
      duration: duration,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    container.appendChild(particle);
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
  
  element.appendChild(container);
  return container;
};

export const dragonballToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    const fromX = position.includes('right') ? 40 : -40;
    const fromY = position.includes('top') ? -40 : 40;
    
    // Initial state
    gsap.set(element, { 
      opacity: 0, 
      y: fromY, 
      x: fromX,
      scale: 0.8,
      transformOrigin: 'center center'
    });
    
    // Add dragonball effect
    createDragonBallEffect(element);
    
    // Create timeline for the animation sequence
    const tl = gsap.timeline();
    
    // Power up animation
    tl.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(element, {
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.inOut',
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)',
    });
    
    return tl;
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(10, 5, 0, 0.85)',
    '--toast-border': '2px solid #FFD700',
    '--toast-shadow': '0 0 30px rgba(255, 100, 0, 0.6)',
    color: '#FFD700',
    textShadow: '0 0 8px rgba(255, 215, 0, 0.9), 0 0 15px rgba(255, 100, 0, 0.7)',
    padding: '14px 22px',
    borderRadius: '12px',
    background: 'linear-gradient(145deg, rgba(30, 15, 0, 0.9) 0%, rgba(10, 5, 0, 0.95) 100%)',
    backdropFilter: 'blur(5px)',
    border: '2px solid rgba(255, 165, 0, 0.6)',
    boxShadow: '0 0 25px rgba(255, 100, 0, 0.4), inset 0 0 15px rgba(255, 165, 0, 0.2)',
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    fontFamily: '"Arial Black", sans-serif',
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'visible',
    '&:hover': {
      transform: 'scale(1.03) translateY(-2px)',
      boxShadow: '0 5px 35px rgba(255, 100, 0, 0.7), inset 0 0 20px rgba(255, 215, 0, 0.3)',
      '--toast-shadow': '0 0 40px rgba(255, 100, 0, 0.8)'
    }
  } as const,
};
