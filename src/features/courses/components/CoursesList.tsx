import { Card } from "@/components/ui/card";
import { Course } from "../types";
import { CourseRow } from "./CourseRow";
import { CourseCard } from "./CourseCard";
import { EmptyState } from "./EmptyState";

interface CoursesListProps {
  courses: Course[];
  onClearFilters: () => void;
  onEdit?: (course: Course) => void;
}

export function CoursesList({ courses, onClearFilters, onEdit }: CoursesListProps) {
  if (courses.length === 0) {
    return (
      <Card className="w-full">
        <EmptyState onClearFilters={onClearFilters} />
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      {/* Table Header (Desktop) */}
      <div className="hidden md:grid grid-cols-[1fr_250px_140px_100px_120px_100px] items-center p-4 border-b border-border-subtle bg-bg-secondary/50">
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Course Title</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary w-[250px]">Short Description</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary w-[140px]">Trainer / SME</div>
        <div className="text-right pr-8 text-[10px] uppercase tracking-widest font-bold text-text-secondary w-[100px]">Trainees</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary w-[120px]">Created At</div>
        <div className="text-right text-[10px] uppercase tracking-widest font-bold text-text-secondary w-[100px]">Actions</div>
      </div>

      <div className="divide-y divide-border-subtle">
        {courses.map((course) => (
          <div key={course.id}>
            <CourseRow course={course} onEdit={onEdit} />
            <CourseCard course={course} onEdit={onEdit} />
          </div>
        ))}
      </div>
    </Card>
  );
}
