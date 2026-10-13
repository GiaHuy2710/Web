import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className={cn(
          "w-full max-w-lg rounded-2xl bg-[#0c121e] border border-white/[0.1] shadow-2xl p-6 relative animate-in zoom-in-95 duration-150",
          className
        )}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
          {title && <h3 className="font-bold text-white text-base">{title}</h3>}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition ml-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
