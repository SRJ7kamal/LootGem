import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-slate-900 border border-orange-500/40 text-slate-100 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="flex-1 truncate">{message}</span>
      <button
        onClick={onClose}
        className="text-xs text-slate-400 hover:text-white shrink-0 ml-1 font-bold"
      >
        ✕
      </button>
    </div>
  );
};
