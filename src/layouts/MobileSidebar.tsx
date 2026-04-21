import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  X 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: "admin" | "trainer" | "trainee";
}

const NAV_ITEMS: Record<string, NavItem[]> = {
  admin: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Courses", path: "/admin/courses", icon: BookOpen },
    { label: "Enrollments", path: "/admin/enrollments", icon: ClipboardList },
  ],
  trainer: [
    { label: "Dashboard", path: "/trainer", icon: LayoutDashboard },
  ],
  trainee: [
    { label: "Dashboard", path: "/trainee", icon: LayoutDashboard },
  ],
};

export function MobileSidebar({ isOpen, onClose, role }: MobileSidebarProps) {
  const location = useLocation();

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const items = NAV_ITEMS[role] || [];

  const sidebar = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-[260px] bg-bg-primary border-r border-border-subtle h-full flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <div className="size-6 bg-text-primary rounded-button flex items-center justify-center">
                  <span className="text-[10px] font-bold text-bg-primary">VX</span>
                </div>
                <span className="font-semibold tracking-tight-md">VRX Learn</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-bg-secondary rounded-button transition-colors"
                aria-label="Close menu"
              >
                <X className="size-5 text-text-secondary" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-2 rounded-button text-sm font-medium transition-all ${
                      isActive
                        ? "bg-bg-secondary text-text-primary"
                        : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer / Role Info */}
            <div className="p-4 border-t border-border-subtle">
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                Role: {role}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(sidebar, document.body);
}
