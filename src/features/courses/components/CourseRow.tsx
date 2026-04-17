import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "../types";

interface CourseRowProps {
  course: Course;
  onEdit?: (course: Course) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function CourseRow({ course, onEdit }: CourseRowProps) {
  const navigate = useNavigate();
  const description = course.shortDescription ?? "No short description provided.";

  const handleNavigate = () => {
    navigate(`/admin/courses/${course.id}`);
  };

  return (
    <div className="hidden md:grid grid-cols-[1fr_250px_140px_100px_120px_100px] items-center p-4 hover:bg-bg-secondary transition-colors group min-h-[72px]">
      <div 
        onClick={handleNavigate}
        className="font-semibold text-text-primary line-clamp-2 break-words pr-4 min-w-0 cursor-pointer hover:text-accent-blue transition-colors"
      >
        {course.title}
      </div>
      
      <div className="relative group/tooltip w-[250px]">
        <div className="text-text-secondary text-sm truncate pr-4">
          {description}
        </div>
        {/* Minimal Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block z-50">
          <div className="bg-text-primary text-bg-primary text-xs rounded-button p-2 shadow-card max-w-[300px] leading-relaxed">
            {description}
          </div>
        </div>
      </div>

      <div className="text-text-secondary text-sm truncate pr-4 w-[140px]">{course.trainerName}</div>
      
      <div className="text-right pr-8 w-[100px]">
        <span className="text-sm font-medium text-text-primary">
          {course.noOfTrainees}
        </span>
      </div>

      <div className="text-text-secondary text-xs w-[120px]">{formatDate(course.createdAt)}</div>

      <div className="flex items-center justify-end gap-1 w-[100px]">
        <Button 
          variant="ghost" 
          size="icon" 
          className="size-8 text-text-secondary hover:text-text-primary"
          onClick={handleNavigate}
        >
          <Eye className="size-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="size-8 text-text-secondary hover:text-text-primary"
          onClick={() => onEdit?.(course)}
        >
          <Pencil className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-text-secondary hover:text-accent-red">
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
