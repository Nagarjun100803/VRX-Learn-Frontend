import { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye,
  AlertCircle,
  GripVertical,
  ArrowLeft
} from "lucide-react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Module } from "@/types";
import { motion } from "motion/react";
import { useToast } from "@/hooks/useToast";
import { db } from "@/db";

interface ModulesManagementViewProps {
  courseId: string;
  modules: Module[];
  isAdmin: boolean;
  onSelectModule: (id: string) => void;
  onBack?: () => void;
}

export function ModulesManagementView({ courseId, modules: initialModules, isAdmin, onSelectModule, onBack }: ModulesManagementViewProps) {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const { toast } = useToast();
  const isReorderingRef = useRef(false);

  useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    
    // Guard against multiple simultaneous reorders
    if (isReorderingRef.current) return;
    isReorderingRef.current = true;

    const oldIndex = modules.findIndex((item) => item.id === active.id);
    const newIndex = modules.findIndex((item) => item.id === over.id);
    
    // Update local state immediately for responsiveness
    const newItems = arrayMove(modules, oldIndex, newIndex);
    setModules(newItems);

    // Compute fractional indexing payload
    const targetModule = newItems[newIndex];
    const preceding = newItems[newIndex - 1] ?? null;
    const succeeding = newItems[newIndex + 1] ?? null;

    // Simulate API Call with the computed payload
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Finalize toast notification - strictly once
      toast({
        type: "success",
        title: "Module reordered successfully",
        description: `Module "${targetModule.title}" reordered successfully`,
      });
      
      // Log payload for future API integration
      console.log("Reorder Payload:", {
        targetId: targetModule.id,
        precedingId: preceding?.id ?? null,
        succeedingId: succeeding?.id ?? null
      });
    } catch (error) {
      console.error("Failed to reorder modules:", error);
    } finally {
      isReorderingRef.current = false;
    }
  };

  const showDragHandle = modules.length > 1;

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto custom-scrollbar">
      {/* Desktop Header & Actions */}
      <div className="hidden md:block border-b border-border-subtle shadow-border bg-bg-primary sticky top-0 z-10 transition-all duration-300">
        <div className="p-8 max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Modules</h1>
            <p className="text-sm text-text-secondary">Manage and organize course modules</p>
          </div>
          
          <Button className="h-9 px-4 bg-text-primary text-bg-primary hover:bg-text-primary/90 font-bold text-xs rounded-button transition-all active:scale-95">
            <Plus className="size-4 mr-2" />
            New Module
          </Button>
        </div>
      </div>

      {/* Mobile Actions Header */}
      <div className="md:hidden p-4 space-y-4">
        {onBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-text-secondary hover:text-text-primary h-8 px-0"
            onClick={onBack}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Course Content
          </Button>
        )}
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Modules</h1>
        <Button className="w-full bg-text-primary text-bg-primary h-10 font-bold text-sm rounded-button active:scale-[0.98] transition-transform">
          <Plus className="size-4 mr-2" />
          New Module
        </Button>
      </div>

      {/* Modules List Container */}
      <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {modules.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-muted mb-6 shadow-border">
              <AlertCircle className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              No modules created yet
            </h3>
            <p className="text-sm text-text-secondary mt-2 max-w-[240px]">
              Start by creating your first module
            </p>
          </div>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={modules.map(m => m.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3 md:space-y-1">
                {modules.map((module) => (
                  <SortableModuleRow 
                    key={module.id} 
                    module={module} 
                    isAdmin={isAdmin}
                    showHandle={showDragHandle}
                    onSelect={() => onSelectModule(module.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

function SortableModuleRow({ 
  module, 
  isAdmin, 
  showHandle,
  onSelect
}: { 
  module: Module; 
  isAdmin: boolean;
  showHandle: boolean;
  onSelect: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`
        relative group transition-all duration-200
        ${isDragging ? "z-50 ring-2 ring-accent-blue/30 shadow-card bg-bg-secondary scale-[1.01] opacity-90 rounded-card" : ""}
      `}
    >
      {/* Desktop Row */}
      <div 
        onClick={onSelect}
        className="hidden md:flex items-center group/row px-4 py-4 bg-bg-primary hover:bg-bg-secondary rounded-card transition-all cursor-pointer border border-transparent"
      >
        {showHandle && (
          <div 
            {...attributes} 
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="mr-3 text-text-secondary hover:text-text-primary transition-colors cursor-grab active:cursor-grabbing p-1 -ml-2"
          >
            <GripVertical className="size-4" />
          </div>
        )}
        
        <div className="flex-1 min-w-0 mr-4">
          <div className="text-sm font-semibold text-text-primary tracking-tight truncate">
            {module.title}
          </div>
          <div className="text-xs text-text-secondary truncate mt-1">
            {module.description || "No description provided."}
          </div>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <ActionButton 
            icon={<Eye className="size-4" />} 
            tooltip="View Lessons" 
            onClick={(e) => { e.stopPropagation(); onSelect(); }} 
          />
          <ActionButton 
            icon={<Pencil className="size-4" />} 
            tooltip="Edit" 
            onClick={(e) => e.stopPropagation()} 
          />
          <ActionButton 
            icon={<Trash2 className="size-4" />} 
            tooltip="Delete" 
            className="hover:text-accent-red hover:bg-accent-red/5" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      </div>

      {/* Mobile Card */}
      <div 
        {...(!showHandle ? {} : listeners)}
        {...(!showHandle ? {} : attributes)}
        onClick={onSelect}
        className={`
          md:hidden bg-bg-primary p-4 rounded-card shadow-border space-y-3
          ${isDragging ? "shadow-2xl opacity-100" : ""}
        `}
      >
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-text-primary leading-tight">
            {module.title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-2">
            {module.description || "No description provided."}
          </p>
        </div>
        
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-subtle">
           <button 
             onClick={(e) => { e.stopPropagation(); onSelect(); }}
             className="text-xs font-bold text-text-secondary flex items-center gap-1.5 px-2 py-1 pointer-events-auto"
           >
             <Eye className="size-3" /> View
           </button>
           <button 
             onClick={(e) => e.stopPropagation()}
             className="text-xs font-bold text-text-secondary flex items-center gap-1.5 px-2 py-1 pointer-events-auto"
           >
             <Pencil className="size-3" /> Edit
           </button>
           <button 
             onClick={(e) => e.stopPropagation()}
             className="text-xs font-bold text-accent-red flex items-center gap-1.5 px-2 py-1 pointer-events-auto"
           >
             <Trash2 className="size-3" /> Delete
           </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ 
  icon, 
  tooltip, 
  className,
  onClick
}: { 
  icon: React.ReactNode; 
  tooltip?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`
        size-8 flex items-center justify-center rounded-button text-text-secondary 
        hover:text-text-primary hover:bg-bg-secondary transition-all
        ${className}
      `}
      title={tooltip}
    >
      {icon}
    </button>
  );
}
