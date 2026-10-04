import React, { useState, useEffect } from 'react';
import { Info, CheckCircle, Warning, XCircle, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const alertStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-500',
    textColor: 'text-green-800',
    icon: CheckCircle
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    textColor: 'text-red-800',
    icon: XCircle
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    textColor: 'text-amber-800',
    icon: Warning
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-800',
    icon: Info
  }
};

export default function Alert({ 
  variant = 'info', 
  title, 
  children, 
  className = '',
  duration = 5000 // default 5 seconds
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Restart timer if children (message content) changes
  useEffect(() => {
    setIsVisible(true);
    
    let timer;
    if (duration > 0) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
    
    return () => clearTimeout(timer);
  }, [children, duration]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const style = alertStyles[variant] || alertStyles.info;
  const Icon = style.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`flex p-4 rounded-xl border ${style.bg} ${style.border} ${className}`}
          role="alert"
        >
          <div className={`flex-shrink-0 mr-3 mt-0.5 ${style.iconColor}`}>
            <Icon size={20} weight="fill" />
          </div>
          
          <div className="flex-1">
            {title && (
              <h3 className={`text-sm font-semibold mb-1 ${style.textColor}`}>
                {title}
              </h3>
            )}
            <div className={`text-sm ${style.textColor}`}>
              {children}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className={`flex-shrink-0 ml-3 mt-0.5 p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 transition-all ${style.textColor}`}
            aria-label="Đóng"
          >
            <X size={16} weight="bold" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
