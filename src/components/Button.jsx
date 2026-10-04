import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading = false,
  icon: Icon,
  ...props 
}) {
  const baseClasses = "font-medium text-sm px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 active:scale-[0.98] active:-translate-y-px shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white text-ink border border-ink/10 hover:bg-limestone/50 active:scale-[0.98] shadow-sm",
    danger: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
    ghost: "bg-transparent text-ink hover:bg-ink/5 active:scale-[0.98]"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
      ) : (
        <>
          {children}
          {Icon && <Icon size={18} />}
        </>
      )}
    </button>
  );
}
