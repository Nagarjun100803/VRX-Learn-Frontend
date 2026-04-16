import { useState } from "react";
import { User, Palette, Sun, Moon, Monitor, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="h-9 px-3 text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="size-4 mr-2" />
        <span className="font-medium">Profile</span>
      </Button>

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
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-56 z-50 bg-bg-primary shadow-card rounded-card overflow-hidden"
            >
              <div className="p-1.5 space-y-1">
                <button className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary rounded-button transition-colors">
                  <User className="size-4 mr-3" />
                  Profile
                </button>
                
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-text-secondary">
                      <Palette className="size-4 mr-3" />
                      Theme
                    </div>
                    <div className="flex items-center bg-bg-secondary rounded-button p-0.5 shadow-border">
                      <button className="p-1 rounded-button hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-all">
                        <Sun className="size-3.5" />
                      </button>
                      <button className="p-1 rounded-button hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-all">
                        <Moon className="size-3.5" />
                      </button>
                      <button className="p-1 rounded-button bg-bg-primary text-text-primary shadow-sm">
                        <Monitor className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border-subtle mx-1.5 my-1" />

                <button className="w-full flex items-center px-3 py-2 text-sm text-accent-red hover:bg-accent-red/5 rounded-button transition-colors">
                  <LogOut className="size-4 mr-3" />
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
