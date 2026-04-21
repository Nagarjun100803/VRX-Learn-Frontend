import { Card } from "@/components/ui/card";

interface TableSkeletonProps {
  rows?: number;
  gridClass: string;
}

function TableSkeleton({ rows = 10, gridClass }: TableSkeletonProps) {
  return (
    <Card className="w-full overflow-hidden">
      {/* Skeleton Rows */}
      <div className="divide-y divide-border-subtle">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`grid ${gridClass} items-center p-4 h-[73px] md:h-auto`}
          >
            {/* Desktop skeleton cells */}
            <div className="hidden md:contents">
              {gridClass.split(" ").pop()?.match(/\d+/) ? (
                // If it's a simple grid-cols-N
                Array.from({ length: parseInt(gridClass.match(/\d+/)?.[0] || "1") }).map((_, j) => (
                  <div key={j} className="h-4 bg-bg-secondary rounded animate-pulse w-3/4" />
                ))
              ) : (
                // Handle complex grid layouts by estimating based on column count
                // A better way is to just hardcode per skeleton type
                null
              )}
            </div>

            {/* Mobile skeleton (simplified) */}
            <div className="md:hidden space-y-2">
              <div className="h-4 w-3/4 bg-bg-secondary rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-bg-secondary rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function UsersTableSkeleton({ rows = 10 }: { rows?: number }) {
  const gridClass = "grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_80px]";
  return (
    <Card className="w-full overflow-hidden">
      <div className="divide-y divide-border-subtle">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={`hidden md:grid ${gridClass} items-center p-4 gap-4 transition-all duration-300`}>
            <div className="h-4 w-32 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-40 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-20 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-8 bg-bg-secondary rounded animate-pulse ml-auto" />
          </div>
        ))}
        {/* Mobile Skeleton */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={`mob-${i}`} className="md:hidden p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-bg-secondary rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-bg-secondary rounded animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-bg-secondary rounded animate-pulse" />
            </div>
            <div className="flex justify-between gap-4">
               <div className="h-3 w-20 bg-bg-secondary rounded animate-pulse" />
               <div className="h-3 w-20 bg-bg-secondary rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CoursesTableSkeleton({ rows = 10 }: { rows?: number }) {
  const gridClass = "grid-cols-[1fr_250px_140px_100px_120px_100px]";
  return (
    <Card className="w-full overflow-hidden">
      <div className="divide-y divide-border-subtle">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={`hidden md:grid ${gridClass} items-center p-4 gap-4`}>
            <div className="h-4 w-48 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-[200px] bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-32 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-12 bg-bg-secondary rounded animate-pulse ml-auto pr-8" />
            <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-8 bg-bg-secondary rounded animate-pulse ml-auto" />
          </div>
        ))}
        {/* Mobile Skeleton */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={`mob-${i}`} className="md:hidden p-4 space-y-3">
             <div className="h-5 w-3/4 bg-bg-secondary rounded animate-pulse" />
             <div className="h-3 w-full bg-bg-secondary rounded animate-pulse" />
             <div className="flex justify-between items-center pt-2">
                <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
                <div className="h-4 w-16 bg-bg-secondary rounded animate-pulse" />
             </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EnrollmentsTableSkeleton({ rows = 10 }: { rows?: number }) {
  const gridClass = "grid-cols-[1.2fr_1.2fr_100px_1.5fr_120px_120px_120px_80px]";
  return (
    <Card className="w-full overflow-hidden">
      <div className="divide-y divide-border-subtle">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={`hidden md:grid ${gridClass} items-center p-4 gap-4`}>
            <div className="h-4 w-28 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-36 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-16 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-44 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-24 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-20 bg-bg-secondary rounded animate-pulse" />
            <div className="h-4 w-8 bg-bg-secondary rounded animate-pulse ml-auto" />
          </div>
        ))}
        {/* Mobile Skeleton */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={`mob-${i}`} className="md:hidden p-4 space-y-4">
             <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-bg-secondary rounded animate-pulse" />
                  <div className="h-3 w-40 bg-bg-secondary rounded animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-bg-secondary rounded animate-pulse" />
             </div>
             <div className="h-4 w-3/4 bg-bg-secondary rounded animate-pulse" />
             <div className="flex justify-between text-xs pt-1">
                <div className="h-3 w-20 bg-bg-secondary rounded animate-pulse" />
                <div className="h-3 w-20 bg-bg-secondary rounded animate-pulse" />
             </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
