import { RoleSwitcher } from "@/components/RoleSwitcher";
import { ProfileDropdown } from "@/features/admin/components/ProfileDropdown";

export function TraineeLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <nav className="sticky top-0 z-30 w-full bg-bg-primary/80 backdrop-blur-md shadow-border">
        <div className="container-vercel h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-text-primary rounded-button flex items-center justify-center">
              <span className="text-[10px] font-bold text-bg-primary">VX</span>
            </div>
            <span className="font-semibold tracking-tight-md">VRX Learn</span>
          </div>
          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <ProfileDropdown />
          </div>
        </div>
      </nav>
      
      <main className="container-vercel py-12">
        <header className="space-y-1">
          <h1 className="text-section font-semibold tracking-tight-lg">
            Trainee Dashboard
          </h1>
          <p className="text-text-secondary text-body">
            Welcome to your learning portal. Start your courses today.
          </p>
        </header>
      </main>
    </div>
  );
}
