import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
      <div className="size-12 bg-bg-secondary rounded-full flex items-center justify-center shadow-border">
        <SearchX className="size-6 text-text-secondary" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-text-primary">No courses found</h3>
        <p className="text-sm text-text-secondary">
          Try adjusting your search or filters.
        </p>
      </div>
      <Button variant="outline" onClick={onClearFilters} className="h-9">
        Clear Filters
      </Button>
    </div>
  );
}
