import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Enrollment } from "../types";

interface EnrollmentRowProps {
  enrollment: Enrollment;
  onEdit?: (enrollment: Enrollment) => void;
}

const roleStyles = {
  admin: "bg-bg-secondary text-text-primary shadow-border",
  trainer: "bg-accent-blue/10 text-accent-blue shadow-border",
  trainee: "bg-bg-secondary text-text-secondary shadow-border",
};

const statusStyles = {
  pending: "bg-bg-secondary text-text-secondary shadow-border",
  "in-progress": "bg-accent-blue/10 text-accent-blue shadow-border",
  suspended: "bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-border",
  dropped: "bg-accent-red/10 text-accent-red shadow-border",
  completed: "bg-green-500/10 text-green-600 dark:text-green-400 shadow-border",
};

const statusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  suspended: "Suspended",
  dropped: "Dropped",
  completed: "Completed",
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function EnrollmentRow({ enrollment, onEdit }: EnrollmentRowProps) {
  return (
    <div className="hidden md:grid grid-cols-[1.2fr_1.2fr_100px_1.5fr_120px_120px_120px_80px] items-center p-4 hover:bg-bg-secondary transition-colors group min-h-[72px]">
      <div className="font-semibold text-text-primary truncate pr-4">{enrollment.name}</div>
      <div className="text-text-secondary text-sm truncate pr-4">{enrollment.email}</div>
      <div>
        <Badge variant="secondary" className={`capitalize font-medium text-[10px] px-2 py-0 h-5 ${roleStyles[enrollment.role]}`}>
          {enrollment.role}
        </Badge>
      </div>
      
      <div className="relative group/tooltip min-w-0">
        <div className="text-text-primary text-sm font-medium truncate pr-4">
          {enrollment.courseName}
        </div>
        {/* Minimal Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block z-50">
          <div className="bg-text-primary text-bg-primary text-xs rounded-button p-2 shadow-card max-w-[300px] leading-relaxed">
            {enrollment.courseName}
          </div>
        </div>
      </div>

      <div className="text-text-secondary text-xs">{formatDate(enrollment.enrollmentDate)}</div>
      <div className="text-text-secondary text-xs">{formatDate(enrollment.expireAt)}</div>
      
      <div>
        <Badge variant="secondary" className={`font-medium text-[10px] px-2 py-0 h-5 ${statusStyles[enrollment.status]}`}>
          {statusLabels[enrollment.status]}
        </Badge>
      </div>

      <div className="flex items-center justify-end gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="size-8 text-text-secondary hover:text-text-primary"
          onClick={() => onEdit?.(enrollment)}
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
