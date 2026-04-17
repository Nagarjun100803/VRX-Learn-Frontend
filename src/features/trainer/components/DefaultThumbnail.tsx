interface DefaultThumbnailProps {
  courseName: string;
  className?: string;
}

export function DefaultThumbnail({ courseName, className = "" }: DefaultThumbnailProps) {
  return (
    <div className={`bg-gradient-to-br from-bg-secondary to-border-subtle flex items-center justify-center p-6 text-center relative overflow-hidden ${className}`}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 size-full bg-text-primary rounded-full blur-3xl animate-pulse" />
      </div>
      
      <span className="text-sm font-semibold text-text-primary line-clamp-2 leading-relaxed tracking-tight z-10">
        {courseName}
      </span>
    </div>
  );
}
