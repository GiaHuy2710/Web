import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={cn(
            'w-full py-2 rounded-xl bg-[#0f1624] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition',
            icon ? 'pl-9 pr-3' : 'px-3',
            error ? 'border-rose-500/50 focus:border-rose-500' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[11px] text-rose-400 mt-1">{error}</p>
      )}
    </div>
  );
};
