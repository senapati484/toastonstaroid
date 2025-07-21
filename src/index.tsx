import React, { useEffect, useRef, useState, ReactElement } from 'react';
import { useToastStore, Toast, ToastType } from './store';

type ToastVariant = {
  animation: (element: HTMLElement, position: string) => any;
  containerStyles: any;
};
import {
  ToastPosition,
  getPositionStyles,
  successToast,
  errorToast,
  warningToast,
  infoToast,
  fireToast,
  rainToast,
  smokeToast,
  cyberpunkToast,
  dragonballToast,
  waterflowToast,
  basicToast,
} from './variants';

// React Icons
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaFire,
  FaCloudRain,
  FaSmog,
  FaRobot,
  FaTimes,
  FaDragon,
  FaWater
} from 'react-icons/fa';

// Helper component to render icon with color
const IconWithColor = ({ type, color }: { type: ToastType, color?: string }) => {
  const iconMap = {
    success: <FaCheckCircle className="w-5 h-5" style={color ? { color } : undefined} />,
    error: <FaExclamationCircle className="w-5 h-5" style={color ? { color } : undefined} />,
    warning: <FaExclamationTriangle className="w-5 h-5" style={color ? { color } : undefined} />,
    info: <FaInfoCircle className="w-5 h-5" style={color ? { color } : undefined} />,
    fire: <FaFire className="w-5 h-5" style={color ? { color } : undefined} />,
    rain: <FaCloudRain className="w-5 h-5" style={color ? { color } : undefined} />,
    smoke: <FaSmog className="w-5 h-5" style={color ? { color } : undefined} />,
    cyberpunk: <FaRobot className="w-5 h-5" style={color ? { color } : undefined} />,
    dragonball: <FaDragon className="w-5 h-5" style={color ? { color } : undefined} />,
    waterflow: <FaWater className="w-5 h-5" style={color ? { color } : undefined} />,
    basic: <FaInfoCircle className="w-5 h-5" style={color ? { color } : undefined} />,
  };

  return iconMap[type] || null;
};

// Keep the original Icons object for backward compatibility
const Icons = {
  success: <FaCheckCircle className="w-5 h-5" />,
  error: <FaExclamationCircle className="w-5 h-5" />,
  warning: <FaExclamationTriangle className="w-5 h-5" />,
  info: <FaInfoCircle className="w-5 h-5" />,
  fire: <FaFire className="w-5 h-5" />,
  rain: <FaCloudRain className="w-5 h-5" />,
  smoke: <FaSmog className="w-5 h-5" />,
  cyberpunk: <FaRobot className="w-5 h-5" />,
  dragonball: <FaDragon className="w-5 h-5" />,
  waterflow: <FaWater className="w-5 h-5" />,
  basic: <FaInfoCircle className="w-5 h-5" />,
};

const variantMap: { [key in ToastType]: ToastVariant } = {
  success: successToast,
  error: errorToast,
  warning: warningToast,
  info: infoToast,
  fire: fireToast,
  rain: rainToast,
  smoke: smokeToast,
  cyberpunk: cyberpunkToast,
  dragonball: dragonballToast,
  waterflow: waterflowToast,
  basic: basicToast,
};

interface ToastProps {
  toast: Toast;
  position: ToastPosition;
}

const Toast: React.FC<ToastProps> = ({ toast, position }) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const toastRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const variant = variantMap[toast.type];
  const Icon = <IconWithColor type={toast.type} color={toast.iconColor} />;

  useEffect(() => {
    if (toastRef.current) {
      variant.animation(toastRef.current, position);
      
      // Auto-remove after delay if duration is set
      if (toast.duration) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [variant, position, toast.duration, toast.id, removeToast]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeToast(toast.id);
  };

  // Apply custom background style (blur or solid)
  const containerStyle: React.CSSProperties = {
    ...variant.containerStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease-out',
    ...(toast.backgroundStyle === 'solid' && {
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      backgroundColor: variant.containerStyles.backgroundColor || 'var(--toast-bg, rgba(30, 41, 59, 0.95))',
    }),
    ...(isHovered && {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    }),
  };

  return (
    <div
      ref={toastRef}
      style={{
        ...containerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'auto', // Ensure the toast can receive pointer events
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="toast"
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          flexShrink: 0,
        }}>
          {React.cloneElement(Icon, { 
            style: { 
              width: '20px',
              height: '20px',
              flexShrink: 0 
            }
          })}
        </div>
        <span style={{
          color: toast.type === 'basic' ? '#000000' : (toast.textColor || 'white'),
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,
          flex: 1,
          minWidth: 0,
        }}>
          {toast.message}
        </span>
      </div>
      <div style={{
        position: 'relative',
        zIndex: 1000,
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeToast(toast.id);
          }}
          className={toast.type === 'basic' ? 'toast-button' : ''}
          style={{
            background: 'transparent',
            border: 'none',
            color: toast.type === 'basic' ? '#000000' : 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: '4px',
            marginLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            outline: 'none',
            position: 'relative',
            zIndex: 1000,
            pointerEvents: 'auto',
            WebkitTapHighlightColor: 'transparent',
            ...(toast.type !== 'basic' ? {
              ':hover': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              ':active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              ':focus': {
                outline: '2px solid rgba(255, 255, 255, 0.3)',
              },
            } : {}),
          }}
          aria-label="Close toast"
          type="button"
        >
          <FaTimes style={{ width: '16px', height: '16px', position: 'relative', zIndex: 1000 }} />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  position?: ToastPosition;
  className?: string;
  style?: React.CSSProperties;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = "top-right",
  className,
  style,
}) => {
  const { toasts } = useToastStore();

  return (
    <div
      style={{
        ...getPositionStyles(position),
        ...style,
      }}
      className={className}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} position={position} />
      ))}
    </div>
  );
};

interface ToastOptions {
  duration?: number;
  textColor?: string;
  iconColor?: string;
  backgroundStyle?: 'blur' | 'solid';
}

export const toast = {
  basic: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'basic',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  success: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'success',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  error: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'error',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  warning: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'warning',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  info: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'info',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  fire: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'fire',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  rain: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'rain',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  smoke: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'smoke',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  cyberpunk: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'cyberpunk',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  dragonball: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'dragonball',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
  
  waterflow: (message: string, options: number | ToastOptions = {}) => {
    const duration = typeof options === 'number' ? options : options?.duration;
    const textColor = typeof options === 'object' ? options.textColor : undefined;
    const iconColor = typeof options === 'object' ? options.iconColor : undefined;
    const backgroundStyle = typeof options === 'object' ? options.backgroundStyle : undefined;
    
    useToastStore.getState().addToast({
      message,
      type: 'waterflow',
      duration,
      textColor,
      iconColor,
      backgroundStyle,
    });
  },
};
