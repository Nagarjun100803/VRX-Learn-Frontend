import { useState } from "react";
import { User, Sun, Moon, Monitor, LogOut, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/hooks/useTheme";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "system", name: "System", icon: Monitor },
  ] as const;

  return (
    <div className="relative">
      <button
        className="size-9 rounded-full flex items-center justify-center hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors focus:ring-focus outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Profile menu"
      >
        <div className="size-full rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center">
          <User className="size-4" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-48 z-50 bg-bg-primary shadow-card border border-border-subtle rounded-card overflow-hidden"
            >
              <div className="p-1.5 space-y-0.5">
                <div className="px-3 py-1.5 mb-1">
                  <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Account</p>
                </div>

                <button className="w-full flex items-center px-2.5 py-1.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary rounded-button transition-colors">
                  <User className="size-3.5 mr-2.5" />
                  Profile
                </button>
                
                <div className="h-px bg-border-subtle mx-1 my-1.5" />

                <div className="px-3 py-1.5">
                  <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Appearance</p>
                </div>

                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-button transition-colors ${
                      theme === t.id 
                        ? "text-text-primary bg-bg-secondary font-medium" 
                        : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center">
                      <t.icon className="size-3.5 mr-2.5" />
                      {t.name}
                    </div>
                    {theme === t.id && <Check className="size-3.5 text-accent-blue" />}
                  </button>
                ))}

                <div className="h-px bg-border-subtle mx-1 my-1.5" />

                <button className="w-full flex items-center px-2.5 py-1.5 text-sm text-accent-red hover:bg-accent-red/5 rounded-button transition-colors">
                  <LogOut className="size-3.5 mr-2.5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
