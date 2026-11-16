import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

const TOAST_TYPES = {
  success: { bg: 'bg-green-600', icon: 'âœ“' },
  error: { bg: 'bg-red-600', icon: 'âœ•' },
  warning: { bg: 'bg-yellow-600', icon: 'âš ' },
  info: { bg: 'bg-blue-600', icon: 'â„¹' },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onDismiss }) => {
  const config = TOAST_TYPES[toast.type] || TOAST_TYPES.info;

  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration);
    return () => clearTimeout(timer);
  }, [onDismiss, toast.duration]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={'px-4 py-3 rounded-lg shadow-xl text-white flex items-center gap-3 min-w-[280px] cursor-pointer ' + config.bg}
      onClick={onDismiss}
    >
      <span className="text-lg font-bold">{config.icon}</span>
      <span className="text-sm font-medium">{toast.message}</span>
    </motion.div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
