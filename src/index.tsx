import React, { useEffect, useRef, useState } from 'react';
import { Toast as ToastType, useToastStore } from './store';
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
  FaTimes
} from 'react-icons/fa';

const Icons = {
  success: <FaCheckCircle className="w-5 h-5" />,
  error: <FaExclamationCircle className="w-5 h-5" />,
  warning: <FaExclamationTriangle className="w-5 h-5" />,
  info: <FaInfoCircle className="w-5 h-5" />,
  fire: <FaFire className="w-5 h-5" />,
  rain: <FaCloudRain className="w-5 h-5" />,
  smoke: <FaSmog className="w-5 h-5" />,
  cyberpunk: <FaRobot className="w-5 h-5" />,
};

const variantMap = {
  success: successToast,
  error: errorToast,
  warning: warningToast,
  info: infoToast,
  fire: fireToast,
  rain: rainToast,
  smoke: smokeToast,
  cyberpunk: cyberpunkToast,
};

interface ToastProps {
  toast: ToastType;
  position: ToastPosition;
}

const Toast: React.FC<ToastProps> = ({ toast, position }) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const toastRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const variant = variantMap[toast.type];
  const Icon = Icons[toast.type];

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

  const containerStyle: React.CSSProperties = {
    ...variant.containerStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease-out',
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
          color: 'white',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,
          flex: 1,
          minWidth: 0,
        }}>
          {toast.message}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeToast(toast.id);
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.6)',
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
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
          e.currentTarget.style.background = 'transparent';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid rgba(255, 255, 255, 0.3)';
        }}
        aria-label="Close toast"
        type="button"
      >
        <FaTimes style={{ width: '16px', height: '16px' }} />
      </button>
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

export const toast = {
  success(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'success', message, duration });
  },
  error(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'error', message, duration });
  },
  warning(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'warning', message, duration });
  },
  info(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'info', message, duration });
  },
  fire(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'fire', message, duration });
  },
  rain(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'rain', message, duration });
  },
  smoke(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'smoke', message, duration });
  },
  cyberpunk(message: string, duration: number = 5000) {
    useToastStore.getState().addToast({ type: 'cyberpunk', message, duration });
  },
};
