import { KPISection } from "../components/KPISection";
import { QuickActions } from "../components/QuickActions";
import { TopCourses } from "../components/TopCourses";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-bg-primary font-sans selection:bg-accent-blue/10">
      <main className="container-vercel py-12 space-y-12">
        {/* Header Section */}
        <header className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-section font-semibold tracking-tight-lg">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary text-body">
              Manage your LMS operations with precision.
            </p>
          </div>
        </header>

        {/* KPI Section */}
        <section className="space-y-6">
          <KPISection />
        </section>

        {/* Quick Actions Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary">
            Quick Actions
          </h2>
          <QuickActions />
        </section>

        {/* Top Courses Section */}
        <section className="space-y-6">
          <TopCourses />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-12">
        <div className="container-vercel flex flex-col md:flex-row items-center justify-between gap-4 text-caption text-text-secondary">
          <p>© 2026 VRX Learn. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-text-primary transition-colors">Documentation</button>
            <button className="hover:text-text-primary transition-colors">Support</button>
            <button className="hover:text-text-primary transition-colors">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
