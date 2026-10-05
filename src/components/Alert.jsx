import React, { useState, useEffect } from 'react';
import { Info, CheckCircle, Warning, XCircle, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const alertStyles = {
  success: {
    bg: 'bg-moss-100',
    border: 'border-moss-500/20',
    iconColor: 'text-moss-700',
    textColor: 'text-moss-700',
    icon: CheckCircle
  },
  error: {
    bg: 'bg-lantern-100',
    border: 'border-lantern-600/20',
    iconColor: 'text-lantern-700',
    textColor: 'text-lantern-700',
    icon: XCircle
  },
  warning: {
    bg: 'bg-turmeric-100',
    border: 'border-turmeric-500/20',
    iconColor: 'text-turmeric-700',
    textColor: 'text-turmeric-700',
    icon: Warning
  },
  info: {
    bg: 'bg-bay-100',
    border: 'border-bay-500/20',
    iconColor: 'text-bay-800',
    textColor: 'text-bay-800',
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
