import { useState } from "react";
import { BookOpen } from "lucide-react";
import { TrainerCourse } from "../types";
import { ViewToggle } from "./ViewToggle";
import { CourseGridItem, CourseListItem } from "./CourseItems";

interface AssignedCoursesProps {
  courses: TrainerCourse[];
}

export function AssignedCourses({ courses }: AssignedCoursesProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 shadow-border rounded-card bg-bg-primary">
        <div className="size-16 bg-bg-secondary rounded-full flex items-center justify-center">
          <BookOpen className="size-8 text-text-secondary opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-text-primary tracking-tight">
            No Courses Assigned
          </h3>
          <p className="text-sm text-text-secondary max-w-[280px] mx-auto">
            You don't have any courses assigned to your profile yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">
          Assigned Courses
          <span className="ml-2 px-2 py-0.5 bg-bg-secondary text-text-secondary text-xs rounded-full shadow-border">
            {courses.length}
          </span>
        </h2>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseGridItem key={course.courseId} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {courses.map((course) => (
            <CourseListItem key={course.courseId} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
