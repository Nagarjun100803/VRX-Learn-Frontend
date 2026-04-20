import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Enrollment } from "../types";

interface EnrollmentCardProps {
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

export function EnrollmentCard({ enrollment, onEdit }: EnrollmentCardProps) {
  return (
    <div className="md:hidden p-4 space-y-4 hover:bg-bg-secondary transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="font-semibold text-text-primary truncate">{enrollment.name}</div>
          <div className="text-text-secondary text-xs truncate">{enrollment.email}</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-8 text-text-secondary"
            onClick={() => onEdit?.(enrollment)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-text-secondary hover:text-accent-red">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className={`capitalize font-medium text-[10px] px-2 py-0 h-5 ${roleStyles[enrollment.role]}`}>
          {enrollment.role}
        </Badge>
        <Badge variant="secondary" className={`font-medium text-[10px] px-2 py-0 h-5 ${statusStyles[enrollment.status]}`}>
          {statusLabels[enrollment.status]}
        </Badge>
      </div>

      <div className="space-y-1">
        <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Course</div>
        <div className="text-sm font-medium text-text-primary line-clamp-2 leading-snug">
          {enrollment.courseName}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Enrolled</div>
          <div className="text-xs text-text-primary">{formatDate(enrollment.enrollmentDate)}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Expires</div>
          <div className="text-xs text-text-primary">{formatDate(enrollment.expireAt)}</div>
        </div>
      </div>
    </div>
  );
}
