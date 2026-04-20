import { ProfileDropdown } from "./ProfileDropdown";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Users", active: false },
  { label: "Courses", active: false },
  { label: "Enrollments", active: false },
];

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-30 w-full bg-bg-primary/80 backdrop-blur-md shadow-border">
      <div className="container-vercel h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-text-primary rounded-button flex items-center justify-center">
              <span className="text-[10px] font-bold text-bg-primary">VX</span>
            </div>
            <span className="font-semibold tracking-tight-md">VRX Learn</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onTabChange(item.label)}
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
        </div>

        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
