import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const topCourses = [
  {
    id: "1",
    courseName: "React Fundamentals",
    trainerName: "John Doe",
    totalTrainees: 120,
  },
  {
    id: "2",
    courseName: "FastAPI Mastery",
    trainerName: "Jane Smith",
    totalTrainees: 98,
  },
  {
    id: "3",
    courseName: "System Design",
    trainerName: "Alex",
    totalTrainees: 87,
  },
  {
    id: "4",
    courseName: "Database Internals",
    trainerName: "Mike",
    totalTrainees: 76,
  },
  {
    id: "5",
    courseName: "DevOps Basics",
    trainerName: "Sara",
    totalTrainees: 65,
  },
];

export function TopCourses() {
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-border-subtle pb-4">
        <CardTitle>Top Courses</CardTitle>
        <CardDescription>by enrollments</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border-subtle">
          {topCourses.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between p-4 hover:bg-bg-secondary transition-colors group"
            >
              <div className="space-y-0.5">
                <div className="font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                  {course.courseName}
                </div>
                <div className="text-xs text-text-secondary">
                  Trainer: {course.trainerName}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {course.totalTrainees}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                  Trainees
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
