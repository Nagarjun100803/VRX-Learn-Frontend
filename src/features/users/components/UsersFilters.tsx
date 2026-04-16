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
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 min-w-[140px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all"
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
          className="h-9 min-w-[120px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all"
        >
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  );
}
