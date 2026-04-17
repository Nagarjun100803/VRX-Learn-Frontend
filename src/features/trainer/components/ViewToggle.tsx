import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-bg-secondary p-1 rounded-button shadow-border">
      <button
        onClick={() => onChange("grid")}
        className={`p-1.5 rounded-button transition-all ${
          view === "grid"
            ? "bg-bg-primary text-text-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-label="Grid View"
      >
        <LayoutGrid className="size-4" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-1.5 rounded-button transition-all ${
          view === "list"
            ? "bg-bg-primary text-text-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-label="List View"
      >
        <List className="size-4" />
      </button>
    </div>
  );
}
