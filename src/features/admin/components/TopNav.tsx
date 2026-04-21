import { Menu } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";

export interface TopNavItem {
  label: string;
  active?: boolean;
}

interface TopNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  navItems?: TopNavItem[];
  onMenuClick?: () => void;
}

export function TopNav({ 
  activeTab, 
  onTabChange, 
  navItems = [], 
  onMenuClick 
}: TopNavProps) {
  return (
    <nav className="sticky top-0 z-30 w-full bg-bg-primary/80 backdrop-blur-md shadow-border">
      <div className="container-vercel h-14 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={onMenuClick}
              className="md:hidden p-1 -ml-1 hover:bg-bg-secondary rounded-button transition-colors"
              aria-label="Open menu"
            >
              <Menu className="size-5 text-text-primary" />
            </button>
            <div className="flex items-center gap-2">
              <div className="size-6 bg-text-primary rounded-button flex items-center justify-center">
                <span className="text-[10px] font-bold text-bg-primary">VX</span>
              </div>
              <span className="font-semibold tracking-tight-md">VRX Learn</span>
            </div>
          </div>

          {navItems.length > 0 && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onTabChange?.(item.label)}
                  className={`px-3 py-1.5 text-sm transition-all rounded-button ${
                    activeTab === item.label
                      ? "text-text-primary font-medium bg-bg-secondary"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
