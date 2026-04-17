import { Card } from "@/components/ui/card";
import { Enrollment } from "../types";
import { EnrollmentRow } from "./EnrollmentRow";
import { EnrollmentCard } from "./EnrollmentCard";
import { EmptyState } from "./EmptyState";

interface EnrollmentListProps {
  enrollments: Enrollment[];
  onClearFilters: () => void;
  onEdit?: (enrollment: Enrollment) => void;
}

export function EnrollmentList({ enrollments, onClearFilters, onEdit }: EnrollmentListProps) {
  if (enrollments.length === 0) {
    return (
      <Card className="w-full">
        <EmptyState onClearFilters={onClearFilters} />
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      {/* Table Header (Desktop) */}
      <div className="hidden md:grid grid-cols-[1.2fr_1.2fr_100px_1.5fr_120px_120px_120px_80px] items-center p-4 border-b border-border-subtle bg-bg-secondary/50">
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Name</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Email</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Role</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Course Title</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Enrolled</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Expires</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Status</div>
        <div className="text-right text-[10px] uppercase tracking-widest font-bold text-text-secondary">Actions</div>
      </div>

      <div className="divide-y divide-border-subtle">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id}>
            <EnrollmentRow enrollment={enrollment} onEdit={onEdit} />
            <EnrollmentCard enrollment={enrollment} onEdit={onEdit} />
          </div>
        ))}
      </div>
    </Card>
  );
}
