import { useState } from "react";
import { BookOpen } from "lucide-react";
import { TraineeCourse } from "@/db";
import { ViewToggle } from "../../trainer/components/ViewToggle";
import { EnrolledCourseGridItem, EnrolledCourseListItem } from "./EnrolledCourseItems";

interface EnrolledCoursesProps {
  courses: TraineeCourse[];
}

export function EnrolledCourses({ courses }: EnrolledCoursesProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 shadow-border rounded-card bg-bg-primary">
        <div className="size-16 bg-bg-secondary rounded-full flex items-center justify-center">
          <BookOpen className="size-8 text-text-secondary opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-text-primary tracking-tight">
            No Courses Enrolled
          </h3>
          <p className="text-sm text-text-secondary max-w-[280px] mx-auto">
            You are not enrolled in any courses yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">
          Enrolled Courses
          <span className="ml-2 px-2 py-0.5 bg-bg-secondary text-text-secondary text-xs rounded-full shadow-border">
            {courses.length}
          </span>
        </h2>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <EnrolledCourseGridItem key={course.courseId} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {courses.map((course) => (
            <EnrolledCourseListItem key={course.courseId} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
