import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "../types";

interface CourseCardProps {
  course: Course;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function CourseCard({ course }: CourseCardProps) {
  const description = course.shortDescription ?? "No short description provided.";

  return (
    <div className="md:hidden p-4 space-y-4 hover:bg-bg-secondary transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="font-semibold text-text-primary line-clamp-3 break-words">
            {course.title}
          </div>
          <div className="text-text-secondary text-xs line-clamp-2">
            {description}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="size-8 text-text-secondary">
            <Eye className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-text-secondary">
            <Pencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-text-secondary hover:text-accent-red">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Trainer</div>
          <div className="text-xs text-text-primary truncate">{course.trainerName}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Trainees</div>
          <div className="text-xs text-text-primary">{course.noOfTrainees}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Created At</div>
          <div className="text-xs text-text-primary">{formatDate(course.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
