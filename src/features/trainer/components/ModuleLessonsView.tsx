import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  FileText, 
  PlayCircle,
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
import { Lesson, Module } from "@/types";
import { motion } from "motion/react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/db";
import { LessonDialog } from "./LessonDialog";

interface ModuleLessonsViewProps {
  module: Module;
  lessons: Lesson[];
  isAdmin: boolean;
  onViewLesson: (lessonId: string) => void;
}

function BackNavigation({ label }: { label: string }) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useAuth();
  
  const handleBack = () => {
    const root = user?.role === "admin" ? "/admin" : user?.role === "trainer" ? "/trainer" : "/trainee";
    navigate(`${root}/courses/${courseId}/content/modules`);
  };

  return (
    <div 
      className="flex items-center gap-2 mb-4 py-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
      onClick={handleBack}
    >
      <ArrowLeft className="size-4" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ModuleLessonsView({ module, lessons: initialLessons, isAdmin, onViewLesson }: ModuleLessonsViewProps) {
  console.log("ModuleLessonsView Render:", { 
    moduleTitle: module?.title, 
    initialLessonsCount: initialLessons?.length 
  });

  if (!module) {
    return (
      <div className="flex flex-1 h-full items-center justify-center text-text-secondary bg-bg-primary">
        Module not found
      </div>
    );
  }

  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const { toast } = useToast();
  const isReorderingRef = useRef(false);

  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const refreshLessons = () => {
    if (module.id) {
      setLessons(db.getLessonsByModule(module.id));
    }
  };

  useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);

  const handleOpenCreateLesson = () => {
    setEditingLesson(null);
    setIsLessonDialogOpen(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsLessonDialogOpen(true);
  };

  const handleViewLesson = (lesson: Lesson) => {
    onViewLesson(lesson.id);
  };

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

    const oldIndex = lessons.findIndex((item) => item.id === active.id);
    const newIndex = lessons.findIndex((item) => item.id === over.id);
    
    // Update local state immediately for responsiveness
    const newItems = arrayMove(lessons, oldIndex, newIndex);
    setLessons(newItems);

    // Compute fractional indexing payload
    const preceding = newItems[newIndex - 1] ?? null;
    const succeeding = newItems[newIndex + 1] ?? null;
    const targetLesson = newItems[newIndex];

    // Simulate API Call with the computed payload
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Finalize toast notification - strictly once
      toast({
        type: "success",
        title: "Lesson reordered successfully",
        description: `Lesson "${targetLesson.title}" reordered successfully`,
      });
    } catch (error) {
      console.error("Failed to reorder lessons:", error);
    } finally {
      isReorderingRef.current = false;
    }
  };

  const showDragHandle = lessons.length > 1;

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto custom-scrollbar">
      {/* Desktop Header & Actions */}
      <div className="hidden md:block border-b border-border-subtle shadow-border bg-bg-primary sticky top-0 z-10">
        <div className="p-8 max-w-5xl mx-auto flex items-start justify-between gap-6">
          <div className="space-y-1 flex-1">
            <BackNavigation label="Back to Modules" />
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              {module.title}
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              {module.description}
            </p>
          </div>
          
          {!isAdmin && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border-l border-border-subtle pl-3 invisible">
                <ActionButton icon={<Pencil className="size-4" />} tooltip="Edit Module" />
                <ActionButton icon={<Trash2 className="size-4" />} tooltip="Delete Module" className="hover:text-accent-red hover:bg-accent-red/5" />
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleOpenCreateLesson}
                className="h-9 px-4 bg-text-primary text-bg-primary hover:bg-text-primary/90 font-bold text-xs rounded-button"
              >
                <Plus className="size-4 mr-2" />
                New Lesson
              </Button>
              
              <div className="flex items-center gap-1 border-l border-border-subtle pl-3">
                <ActionButton icon={<Pencil className="size-4" />} tooltip="Edit Module" />
                <ActionButton icon={<Trash2 className="size-4" />} tooltip="Delete Module" className="hover:text-accent-red hover:bg-accent-red/5" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Actions Header */}
      <div className="md:hidden p-4 space-y-4">
        <BackNavigation label="Back to Modules" />
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            {module.title}
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed">
            {module.description}
          </p>
        </div>
        
        {isAdmin && (
          <Button 
            onClick={handleOpenCreateLesson}
            className="w-full bg-text-primary text-bg-primary h-10 font-bold text-sm rounded-button"
          >
            <Plus className="size-4 mr-2" />
            New Lesson
          </Button>
        )}
      </div>

      {/* Lessons List Container */}
      <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {lessons.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-muted mb-6 shadow-border">
              <AlertCircle className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              No lessons added yet
            </h3>
            <p className="text-sm text-text-secondary mt-2 max-w-[240px]">
              Start by adding your first lesson to this module.
            </p>
          </div>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={lessons.map(l => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3 md:space-y-1">
                {lessons.map((lesson) => (
                  <SortableLessonRow 
                    key={lesson.id} 
                    lesson={lesson} 
                    isAdmin={isAdmin}
                    showHandle={showDragHandle}
                    onEdit={() => handleOpenEditLesson(lesson)}
                    onView={() => handleViewLesson(lesson)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <LessonDialog 
        isOpen={isLessonDialogOpen}
        onClose={() => setIsLessonDialogOpen(false)}
        moduleId={module.id}
        lesson={editingLesson}
        onSuccess={refreshLessons}
      />
    </div>
  );
}

function SortableLessonRow({ 
  lesson, 
  isAdmin, 
  showHandle,
  onEdit,
  onView
}: { 
  lesson: Lesson; 
  isAdmin: boolean;
  showHandle: boolean;
  onEdit: () => void;
  onView: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isVideo = lesson.mime_type === "video/mp4";
  
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
        data-id={lesson.id}
        onClick={onView}
        className="hidden md:flex items-center group/row px-4 py-3 bg-bg-primary hover:bg-bg-secondary rounded-card transition-all cursor-pointer border border-transparent"
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

        <div className="mr-5 shrink-0 text-text-secondary group-hover/row:text-text-primary transition-colors">
          {isVideo ? <PlayCircle className="size-5" /> : <FileText className="size-5" />}
        </div>
        
        <div className="flex-1 min-w-0 mr-4">
          <div className="text-sm font-semibold text-text-primary tracking-tight truncate">
            {lesson.title}
          </div>
          <div className="text-xs text-text-secondary truncate mt-0.5">
            {lesson.description || "No description provided."}
          </div>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <ActionButton 
            icon={<Eye className="size-4" />} 
            tooltip="View" 
            onClick={(e) => { e.stopPropagation(); onView(); }}
          />
          {isAdmin && (
            <>
              <ActionButton 
                icon={<Pencil className="size-4" />} 
                tooltip="Edit" 
                onClick={(e) => { e.stopPropagation(); onEdit(); }} 
              />
              <ActionButton 
                icon={<Trash2 className="size-4" />} 
                tooltip="Delete" 
                className="hover:text-accent-red hover:bg-accent-red/5" 
                onClick={(e) => { e.stopPropagation(); }}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Card */}
      <div 
        onClick={onView}
        {...(!showHandle ? {} : listeners)}
        {...(!showHandle ? {} : attributes)}
        className={`
          md:hidden bg-bg-primary p-4 rounded-card shadow-border space-y-3 cursor-pointer active:bg-bg-secondary
          ${isDragging ? "shadow-2xl opacity-100" : ""}
        `}
      >
        <div className="flex items-start gap-4">
          <div className="size-10 bg-bg-secondary rounded-button flex items-center justify-center text-text-secondary shrink-0">
            {isVideo ? <PlayCircle className="size-5" /> : <FileText className="size-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-text-primary leading-tight">
              {lesson.title}
            </h3>
            <p className="text-xs text-text-secondary mt-1 line-clamp-2">
              {lesson.description || "No description provided."}
            </p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-subtle">
             <button 
               onClick={(e) => { e.stopPropagation(); onEdit(); }}
               className="text-xs font-bold text-text-secondary flex items-center gap-1.5 px-2 py-1 pointer-events-auto"
             >
               <Pencil className="size-3" /> Edit
             </button>
             <button 
               onClick={(e) => { e.stopPropagation(); }}
               className="text-xs font-bold text-accent-red flex items-center gap-1.5 px-2 py-1 pointer-events-auto"
             >
               <Trash2 className="size-3" /> Delete
             </button>
          </div>
        )}
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
