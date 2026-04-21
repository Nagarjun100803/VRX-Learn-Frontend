import { useState, useEffect } from "react";
import { KPISection } from "../components/KPISection";
import { QuickActions } from "../components/QuickActions";
import { TopCourses } from "../components/TopCourses";
import { AdminDashboardSkeleton } from "../components/AdminDashboardSkeleton";
import { api } from "@/lib/api-client";

export default function AdminDashboard() {
  const [kpis, setKpis] = useState<{ totalUsers: number; totalCourses: number; totalEnrollments: number } | null>(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [kpisRes, coursesRes] = await Promise.all([
          api.get("dashboard/admin/kpis"),
          api.get("dashboard/admin/top-enrolled-courses?n=8")
        ]);

        setKpis(kpisRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error("Failed to load admin dashboard", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary font-sans selection:bg-accent-blue/10">
      {isLoading ? (
        <AdminDashboardSkeleton />
      ) : (
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
            <KPISection data={kpis} />
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
            <TopCourses courses={courses} />
          </section>
        </main>
      )}

      {/* Footer */}

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
