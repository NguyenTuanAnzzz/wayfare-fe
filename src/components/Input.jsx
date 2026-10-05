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
        className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all shadow-sm ${
          error 
            ? 'border-lantern-600 focus:border-lantern-600 focus:ring-lantern-600/20 text-lantern-700' 
            : 'border-stone-400 focus:border-bay-600 focus:ring-bay-500/30'
        }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-lantern-700 mt-1 flex items-center gap-1" aria-live="polite">
          <Info size={16} /> {error}
        </p>
      )}
    </div>
  );
}
