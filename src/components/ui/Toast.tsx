import React, { useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ToastContext, Toast, ToastType } from "@/hooks/useToast";

const icons = {
  success: <CheckCircle2 className="size-4 text-green-500" />,
  error: <AlertCircle className="size-4 text-accent-red" />,
  warning: <AlertTriangle className="size-4 text-yellow-500" />,
  info: <Info className="size-4 text-accent-blue" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((newToast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...newToast, id }]);
    
    // Auto-dismiss after 6 seconds
    setTimeout(() => dismiss(id), 6000);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

function Toaster() {
  const { toasts, dismiss } = (function() {
    const context = React.useContext(ToastContext);
    if (!context) return { toasts: [], dismiss: () => {} };
    return context;
  })();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-6 md:right-6 z-[150] flex flex-col gap-2 w-full max-w-[400px] pointer-events-none px-4 md:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto w-full bg-bg-primary shadow-card shadow-border rounded-card p-4 flex items-start gap-3 group relative overflow-hidden"
          >
            <div className="shrink-0 mt-0.5">{icons[t.type]}</div>
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="text-sm font-semibold text-text-primary leading-none">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-text-secondary hover:text-text-primary transition-colors p-1 -mr-1"
            >
              <X className="size-3.5" />
            </button>
            
            {/* Progress bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute bottom-0 left-0 h-0.5 bg-text-primary/5"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
