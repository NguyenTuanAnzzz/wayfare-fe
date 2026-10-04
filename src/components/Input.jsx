import React from 'react';
import { Info } from '@phosphor-icons/react';

export default function Input({
  label,
  id,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-ink/80" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all shadow-sm ${
          error 
            ? 'border-red-500 bg-red-50/50 focus:ring-red-500/20' 
            : 'border-ink/10 focus:border-primary focus:ring-primary/20'
        }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1 flex items-center gap-1" aria-live="polite">
          <Info size={16} /> {error}
        </p>
      )}
    </div>
  );
}
