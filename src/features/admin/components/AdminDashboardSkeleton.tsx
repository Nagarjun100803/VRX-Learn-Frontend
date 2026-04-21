import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function KpiSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 bg-bg-secondary rounded animate-pulse mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TopCoursesSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-border-subtle pb-4">
        <div className="h-6 w-32 bg-bg-secondary rounded animate-pulse" />
        <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border-subtle">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="space-y-2">
                <div className="h-4 w-48 sm:w-64 bg-bg-secondary rounded animate-pulse" />
                <div className="h-3 w-32 bg-bg-secondary rounded animate-pulse" />
              </div>
              <div className="text-right space-y-1">
                <div className="h-4 w-12 bg-bg-secondary rounded animate-pulse ml-auto" />
                <div className="h-3 w-16 bg-bg-secondary rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <main className="container-vercel py-12 space-y-12">
      {/* Header Section */}
      <header className="space-y-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-bg-secondary rounded animate-pulse" />
          <div className="h-4 w-64 bg-bg-secondary rounded animate-pulse" />
        </div>
      </header>

      {/* KPI Section */}
      <section className="space-y-6">
        <KpiSkeleton />
      </section>

      {/* Quick Actions Section (Static, but maybe slightly pulse titles) */}
      <section className="space-y-4">
        <div className="h-4 w-32 bg-bg-secondary rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-bg-primary rounded-card shadow-border animate-pulse" />
          ))}
        </div>
      </section>

      {/* Top Courses Section */}
      <section className="space-y-6">
        <TopCoursesSkeleton />
      </section>
    </main>
  );
}
