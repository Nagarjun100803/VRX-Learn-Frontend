import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { TrainerCourse } from "../types";
import { DefaultThumbnail } from "./DefaultThumbnail";

interface CourseItemProps {
  course: TrainerCourse;
}

export function CourseGridItem({ course }: CourseItemProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/trainer/courses/${course.courseId}`)}
      className="group bg-bg-primary shadow-border hover:shadow-card rounded-card overflow-hidden transition-all flex flex-col h-full cursor-pointer"
    >
      <DefaultThumbnail courseName={course.courseName} className="aspect-video w-full border-b border-border-subtle" />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <h3 className="text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-accent-blue transition-colors">
          {course.courseName}
        </h3>
        
        <div className="flex items-center gap-2 text-text-secondary">
          <Users className="size-3.5" />
          <span className="text-xs font-medium">
            {course.totalTrainees.toLocaleString()} Learners
          </span>
        </div>
      </div>
    </div>
  );
}

export function CourseListItem({ course }: CourseItemProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/trainer/courses/${course.courseId}`)}
      className="group flex items-center justify-between p-4 bg-bg-primary hover:bg-bg-secondary/50 rounded-card transition-colors shadow-border mb-3 last:mb-0 cursor-pointer"
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="size-10 rounded-button bg-bg-secondary border border-border-subtle flex items-center justify-center shrink-0">
          <div className="size-2 bg-accent-blue rounded-full animate-pulse" />
        </div>
        <h3 className="text-sm font-semibold text-text-primary truncate pr-4">
          {course.courseName}
        </h3>
      </div>

      <div className="flex items-center gap-2 text-text-secondary shrink-0 pl-4 border-l border-border-subtle">
        <Users className="size-3.5" />
        <span className="text-xs font-medium">
          {course.totalTrainees.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
