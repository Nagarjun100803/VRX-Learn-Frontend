import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CoursesFiltersProps {
  search: string;
  sortBy: string;
  onSearchChange: (val: string) => void;
  onSortChange: (val: string) => void;
}

export function CoursesFilters({
  search,
  sortBy,
  onSearchChange,
  onSortChange,
}: CoursesFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-4 p-4 bg-bg-primary shadow-border rounded-card">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        <Input
          placeholder="Search by course or trainer"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 min-w-[180px] bg-bg-primary shadow-border rounded-button px-3 text-sm outline-none focus:ring-focus transition-all"
        >
          <option value="name-asc">Course Name (A–Z)</option>
          <option value="name-desc">Course Name (Z–A)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="trainees-asc">No. of Trainees (Asc)</option>
          <option value="trainees-desc">No. of Trainees (Desc)</option>
        </select>
      </div>
    </div>
  );
}
