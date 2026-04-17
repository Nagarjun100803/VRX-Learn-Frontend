import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserRole } from "../types";

interface UsersFiltersProps {
  search: string;
  role: string;
  sortBy: string;
  status: string;
  onSearchChange: (val: string) => void;
  onRoleChange: (val: string) => void;
  onSortChange: (val: string) => void;
  onStatusChange: (val: string) => void;
}

export function UsersFilters({
  search,
  role,
  sortBy,
  status,
  onSearchChange,
  onRoleChange,
  onSortChange,
  onStatusChange,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 bg-bg-primary shadow-border rounded-card md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="h-9 min-w-[140px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all cursor-pointer appearance-none pr-8"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
          <option value="trainee">Trainee</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 min-w-[140px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all cursor-pointer appearance-none pr-8"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name-asc">Name (A - Z)</option>
          <option value="name-desc">Name (Z - A)</option>
          <option value="last-active">Last Active</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-9 min-w-[120px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all cursor-pointer appearance-none pr-8"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
        >
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  );
}
