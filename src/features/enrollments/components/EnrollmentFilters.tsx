import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EnrollmentFiltersProps {
  search: string;
  role: string;
  status: string;
  sortBy: string;
  onSearchChange: (val: string) => void;
  onRoleChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onSortChange: (val: string) => void;
}

export function EnrollmentFilters({
  search,
  role,
  status,
  sortBy,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onSortChange,
}: EnrollmentFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-4 p-4 bg-bg-primary shadow-border rounded-card">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="h-9 min-w-[140px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
          <option value="trainee">Trainee</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-9 min-w-[140px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="suspended">Suspended</option>
          <option value="dropped">Dropped</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 min-w-[180px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="course-asc">Course Name (A–Z)</option>
          <option value="course-desc">Course Name (Z–A)</option>
        </select>
      </div>
    </div>
  );
}
