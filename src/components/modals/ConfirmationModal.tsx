import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}) => {
  if (!isOpen) return null;

  const colors = {
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
    info: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
  };

  const iconColors = {
    danger: 'text-red-400 bg-red-400/10',
    warning: 'text-amber-400 bg-amber-400/10',
    info: 'text-indigo-400 bg-indigo-400/10'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-card rounded-2xl md:rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl ${iconColors[type]}`}>
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">{message}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all text-sm md:text-base"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`w-full sm:flex-1 py-2.5 md:py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-[0.98] text-sm md:text-base ${colors[type]}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
