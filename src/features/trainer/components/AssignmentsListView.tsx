import { useNavigate, useParams } from "react-router-dom";
import { Plus, Eye, Pencil, Trash2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Assignment } from "@/types";

export function AssignmentsListView({ 
  courseId, 
  isAdmin, 
  onSelectAssignment,
  onCreateAssignment,
  onEditAssignment,
  assignments: initialAssignments,
  onBack
}: { 
  courseId: string, 
  isAdmin: boolean,
  onSelectAssignment: (id: string) => void,
  onCreateAssignment: () => void,
  onEditAssignment: (assignment: Assignment) => void,
  assignments: Assignment[],
  onBack?: () => void
}) {
  const assignments = initialAssignments;

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto font-sans custom-scrollbar">
      {/* Desktop Header */}
      <div className="hidden md:block border-b border-border-subtle shadow-border bg-bg-primary sticky top-0 z-10 transition-all duration-300">
        <div className="p-8 max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Assignments</h1>
            <p className="text-sm text-text-secondary">Manage course assignments</p>
          </div>
          
          <Button 
            onClick={onCreateAssignment}
            className="h-9 px-4 bg-text-primary text-bg-primary hover:bg-text-primary/90 font-bold text-xs rounded-button transition-all active:scale-95"
          >
            <Plus className="size-4 mr-2" />
            New Assignment
          </Button>
        </div>
      </div>

      {/* Mobile Actions Header */}
      <div className="md:hidden p-4 space-y-4">
        {onBack && (
          <div 
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
            onClick={onBack}
          >
            <ArrowLeft className="size-4" />
            <span className="font-medium">Back to Course Content</span>
          </div>
        )}
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Assignments</h1>
        <Button 
          onClick={onCreateAssignment}
          className="w-full bg-text-primary text-bg-primary h-10 font-bold text-sm rounded-button active:scale-[0.98] transition-transform"
        >
          <Plus className="size-4 mr-2" />
          New Assignment
        </Button>
      </div>

      <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {assignments.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-muted mb-6 shadow-border">
              <AlertCircle className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              No assignments created yet
            </h3>
            <p className="text-sm text-text-secondary mt-2 max-w-[240px]">
              Start by creating your first assignment.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id}
                onClick={() => onSelectAssignment(assignment.id)}
                className="flex items-center group px-4 py-4 bg-bg-primary hover:bg-bg-secondary rounded-card transition-all cursor-pointer border border-transparent shadow-border"
              >
                <div className="flex-1 text-sm font-semibold text-text-primary tracking-tight truncate">
                  {assignment.title}
                </div>

                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onSelectAssignment(assignment.id); }}
                    className="size-8 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEditAssignment(assignment); }}
                    className="size-8 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button className="size-8 flex items-center justify-center rounded-button text-text-secondary hover:text-accent-red hover:bg-accent-red/5 transition-all">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
