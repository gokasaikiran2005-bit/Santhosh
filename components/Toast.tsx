
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) {
    return null;
  }

  return (
    <div 
        className="fixed bottom-6 left-6 z-50 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg"
        role="status"
        aria-live="polite"
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
