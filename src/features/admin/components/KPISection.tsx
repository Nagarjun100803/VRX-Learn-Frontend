import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpiData = {
  totalUsers: 1240,
  totalCourses: 32,
  totalEnrollments: 5432,
};

export function KPISection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight-md">
            {kpiData.totalUsers.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Total Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight-md">
            {kpiData.totalCourses}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Total Enrollments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight-md">
            {kpiData.totalEnrollments.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card className="opacity-50 relative overflow-hidden">
        <CardHeader className="pb-2 blur-sm">
          <CardTitle className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Avg. Completions
          </CardTitle>
        </CardHeader>
        <CardContent className="blur-sm">
          <div className="text-2xl font-semibold tracking-tight-md">84%</div>
        </CardContent>
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/10">
          <span className="px-2 py-1 bg-bg-secondary shadow-border rounded-button text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            Coming Soon
          </span>
        </div>
      </Card>
    </div>
  );
}
