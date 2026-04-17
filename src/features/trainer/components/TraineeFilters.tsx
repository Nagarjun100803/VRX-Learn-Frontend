import { Search, ChevronDown } from "lucide-react";

interface TraineeFiltersProps {
  search: string;
  role: string | null;
  sortBy: string | null;
  onSearchChange: (val: string) => void;
  onRoleChange: (val: string | null) => void;
  onSortChange: (val: string | null) => void;
}

export function TraineeFilters({
  search,
  role,
  sortBy,
  onSearchChange,
  onRoleChange,
  onSortChange,
}: TraineeFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 bg-bg-primary shadow-border rounded-card md:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary group-focus-within:text-text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-9 pr-4 bg-bg-primary shadow-border hover:shadow-card focus:shadow-card outline-none rounded-button text-sm transition-all"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
        {/* Role */}
        <div className="relative">
          <select
            value={role || "null"}
            onChange={(e) => onRoleChange(e.target.value === "null" ? null : e.target.value)}
            className="h-9 min-w-[140px] pl-3 pr-10 bg-bg-primary shadow-border hover:shadow-card focus:shadow-card outline-none rounded-button text-sm transition-all appearance-none cursor-pointer"
          >
            <option value="null">All Users</option>
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
            <option value="trainee">Trainee</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary pointer-events-none" />
        </div>

        {/* Sort By */}
        <div className="relative">
          <select
            value={sortBy || "null"}
            onChange={(e) => onSortChange(e.target.value === "null" ? null : e.target.value)}
            className="h-9 min-w-[140px] pl-3 pr-10 bg-bg-primary shadow-border hover:shadow-card focus:shadow-card outline-none rounded-button text-sm transition-all appearance-none cursor-pointer"
          >
            <option value="null">None</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name (A - Z)</option>
            <option value="name-desc">Name (Z - A)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
