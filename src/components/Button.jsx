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
    primary: "bg-bay-700 text-white hover:bg-bay-800 active:bg-bay-900 active:scale-[0.98] shadow-md hover:shadow-lg disabled:bg-stone-100 disabled:text-stone-600 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2",
    secondary: "bg-transparent text-bay-700 border border-bay-700 hover:bg-bay-50 active:scale-[0.98] shadow-sm disabled:bg-stone-100 disabled:text-stone-600 disabled:border-transparent focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2",
    cta: "bg-turmeric-500 text-ink hover:bg-turmeric-600 active:scale-[0.98] shadow-md focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2",
    danger: "bg-transparent text-lantern-700 border border-lantern-600 hover:bg-lantern-100 active:scale-[0.98] disabled:bg-stone-100 disabled:text-stone-600 disabled:border-transparent focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2",
    ghost: "bg-transparent text-ink hover:bg-stone-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2"
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
