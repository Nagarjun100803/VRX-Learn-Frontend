import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  Layout, 
  BookOpen, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  ClipboardList,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/db";
import { ModuleLessonsView } from "../components/ModuleLessonsView";
import { ModulesManagementView } from "../components/ModulesManagementView";
import { AssignmentsListView } from "../components/AssignmentsListView";
import { AssignmentDetailView } from "../components/AssignmentDetailView";
import { ModuleDialog } from "../components/ModuleDialog";
import { AssignmentDialog } from "../components/AssignmentDialog";
import { Module, Assignment } from "@/types";

// Custom hook for responsive layout
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

type SidebarView = "root" | "modules" | "assignments";

export function CourseContentPage() {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { role: userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const isMobile = useIsMobile();

  const content = courseId ? db.getCourse(courseId) : null;
  
  const [modules, setModules] = useState<Module[]>(courseId ? db.getModulesByCourse(courseId) : []);
  const [assignments, setAssignments] = useState<Assignment[]>(courseId ? db.getAssignmentsByCourse(courseId) : []);

  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  // Refresh modules when courseId changes or after edit
  const refreshModules = () => {
    if (courseId) {
      setModules(db.getModulesByCourse(courseId));
    }
  };

  const refreshAssignments = () => {
    if (courseId) {
      setAssignments(db.getAssignmentsByCourse(courseId));
    }
  };

  useEffect(() => {
    refreshModules();
    refreshAssignments();
  }, [courseId]);

  // Derive view and selected items from URL
  const view = useMemo<SidebarView>(() => {
    if (location.pathname.includes("/modules")) return "modules";
    if (location.pathname.includes("/assignments")) return "assignments";
    return "root";
  }, [location.pathname]);

  const moduleMatch = location.pathname.match(/\/modules\/([^/]+)/);
  const selectedModuleId = moduleMatch ? moduleMatch[1] : null;
  
  // Step 7: Fix Sidebar Active State / Step 8: Debug Checklist
  const selectedAssignmentId = assignmentId || null;
  
  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("AssignmentId from params:", assignmentId);
  }, [location.pathname, assignmentId]);

  // Helper for navigating within course context
  const navigateTo = (path: string) => {
    const root = isAdmin ? "/admin" : "/trainer";
    navigate(`${root}/courses/${courseId}/content${path}`);
  };

  // Safe data fetching based on derived IDs
  const filteredLessons = selectedModuleId ? db.getLessonsByModule(selectedModuleId) : [];
  const selectedModule = (selectedModuleId && courseId) ? db.getModule(courseId, selectedModuleId) : null;

  // Debug Safety
  useEffect(() => {
    if (selectedModuleId) {
       console.log("ModuleLessonsView Context:", {
         moduleId: selectedModuleId,
         module: selectedModule,
         lessons: filteredLessons
       });
    }
  }, [selectedModuleId, selectedModule, filteredLessons]);

  const handleSelectModule = (id: string) => {
    navigateTo(`/modules/${id}`);
  };

  const handleSelectAssignment = (id: string) => {
    navigateTo(`/assignments/${id}`);
  };

  const handleOpenCreateModule = () => {
    setEditingModule(null);
    setIsModuleDialogOpen(true);
  };

  const handleOpenEditModule = (module: Module) => {
    setEditingModule(module);
    setIsModuleDialogOpen(true);
  };

  const handleOpenCreateAssignment = () => {
    setEditingAssignment(null);
    setIsAssignmentDialogOpen(true);
  };

  const handleOpenEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsAssignmentDialogOpen(true);
  };

  const handleBackToOverview = () => {
    if (isMobile && (selectedModuleId || selectedAssignmentId)) {
      navigateTo("");
      return;
    }
    const basePath = isAdmin ? "/admin" : "/trainer";
    navigate(`${basePath}/courses/${courseId}`);
  };

  const handleMobileModulesClick = () => {
    navigateTo("/modules");
  };

  if (!content) {
    return (
      <div className="container-vercel py-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-text-primary">Course not found</h2>
        <Button variant="outline" size="sm" className="mt-4 border-border-subtle hover:bg-bg-secondary" onClick={handleBackToOverview}>
          <ArrowLeft className="size-4 mr-2" />
          Back to Course Overview
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex ${isMobile ? 'flex-col min-h-screen' : 'h-[calc(100vh-56px)]'} bg-bg-primary overflow-hidden selection:bg-accent-blue/10 font-sans`}>
      {/* Desktop Sidebar - Hidden on Mobile detail/list views that use full screen */}
      {!isMobile && (
        <aside className="w-[260px] border-r border-border-subtle bg-bg-primary flex flex-col shrink-0 shadow-border">
          {/* Sidebar Header: Back Button */}
          <div className="p-4 border-b border-border-subtle shadow-border flex items-center">
             <div 
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
              onClick={handleBackToOverview}
            >
              <ArrowLeft className="size-3.5" />
              <span className="text-xs font-medium">Back to Overview</span>
            </div>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-8 custom-scrollbar relative">
            <AnimatePresence mode="wait" initial={false}>
              {view === "root" ? (
                <motion.div
                  key="root"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="px-1 py-1">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-text-secondary mb-3">
                      Course Content
                    </h3>
                    <div className="space-y-0.5">
                      <button 
                        onClick={() => navigateTo("/modules")}
                        className="w-full flex items-center justify-between h-9 px-2 rounded-button text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-all group"
                      >
                        <span className="text-xs font-medium">Modules</span>
                        <ChevronRight className="size-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </button>
                      <button 
                        onClick={() => navigateTo("/assignments")}
                        className="w-full flex items-center justify-between h-9 px-2 rounded-button text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-all group"
                      >
                        <span className="text-xs font-medium">Assignments</span>
                        <ChevronRight className="size-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : view === "modules" ? (
                <motion.div
                  key="modules"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col h-full space-y-4"
                >
                  <div className="flex items-center gap-2 px-1 mb-1">
                    <button 
                      onClick={() => navigateTo("")}
                      className="size-6 flex items-center justify-center rounded-button hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ArrowLeft className="size-3.5" />
                    </button>
                    <span className="text-xs font-bold text-text-primary">Modules</span>
                  </div>

                  <div className="space-y-0.5">
                    {modules.map((module) => (
                      <SidebarItem
                        key={module.id}
                        id={module.id}
                        title={module.title}
                        isActive={selectedModuleId === module.id}
                        onClick={() => handleSelectModule(module.id)}
                        onEdit={() => handleOpenEditModule(module)}
                        onDelete={() => {}}
                      />
                    ))}
                    {modules.length === 0 && (
                      <div className="py-8 px-4 text-center">
                        <p className="text-[10px] text-text-secondary font-medium">No modules yet</p>
                      </div>
                    )}
                  </div>

                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="mt-auto w-full justify-start h-9 px-2 text-accent-blue hover:text-accent-blue hover:bg-accent-blue/5"
                      onClick={handleOpenCreateModule}
                    >
                      <Plus className="size-3.5 mr-2" />
                      <span className="text-xs font-bold">Add Module</span>
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="assignments"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col h-full space-y-4"
                >
                  <div className="flex items-center gap-2 px-1 mb-1">
                    <button 
                      onClick={() => navigateTo("")}
                      className="size-6 flex items-center justify-center rounded-button hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ArrowLeft className="size-3.5" />
                    </button>
                    <span className="text-xs font-bold text-text-primary">Assignments</span>
                  </div>

                  <div className="space-y-0.5">
                    {assignments.map((assignment) => (
                      <SidebarItem
                        key={assignment.id}
                        id={assignment.id}
                        title={assignment.title}
                        isActive={selectedAssignmentId === assignment.id}
                        onClick={() => handleSelectAssignment(assignment.id)}
                        onEdit={() => handleOpenEditAssignment(assignment)}
                        onDelete={() => {}}
                      />
                    ))}
                    {assignments.length === 0 && (
                      <div className="py-8 px-4 text-center">
                        <p className="text-[10px] text-text-secondary font-medium">No assignments yet</p>
                      </div>
                    )}
                  </div>

                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="mt-auto w-full justify-start h-9 px-2 text-accent-blue hover:text-accent-blue hover:bg-accent-blue/5"
                      onClick={handleOpenCreateAssignment}
                    >
                      <Plus className="size-3.5 mr-2" />
                      <span className="text-xs font-bold">Add Assignment</span>
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-bg-primary relative overflow-y-auto">
        <Routes>
          <Route path="/" element={
            isMobile ? (
              <MobileCourseContentNavigation 
                content={content} 
                courseId={courseId || ""}
                onBack={handleBackToOverview} 
                isAdmin={isAdmin}
                view="root"
                navigateTo={navigateTo}
                onSelectModule={handleSelectModule}
                onSelectAssignment={handleSelectAssignment}
                handleOpenCreateModule={handleOpenCreateModule}
                handleOpenEditModule={handleOpenEditModule}
                handleOpenCreateAssignment={handleOpenCreateAssignment}
                handleOpenEditAssignment={handleOpenEditAssignment}
                modules={modules}
                assignments={assignments}
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-secondary mb-6 shadow-border">
                  <BookOpen className="size-8" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary tracking-tight-md">
                  Select a category
                </h3>
                <p className="text-sm text-text-secondary max-w-xs mt-2 leading-relaxed">
                  Choose Modules or Assignments from the sidebar to manage your course content.
                </p>
              </motion.div>
            )
          } />
          <Route path="modules" element={
            isMobile ? (
              <MobileCourseContentNavigation 
                content={content} 
                courseId={courseId || ""}
                onBack={handleBackToOverview} 
                isAdmin={isAdmin}
                view="modules"
                navigateTo={navigateTo}
                onSelectModule={handleSelectModule}
                onSelectAssignment={handleSelectAssignment}
                handleOpenCreateModule={handleOpenCreateModule}
                handleOpenEditModule={handleOpenEditModule}
                handleOpenCreateAssignment={handleOpenCreateAssignment}
                handleOpenEditAssignment={handleOpenEditAssignment}
                modules={modules}
                assignments={assignments}
              />
            ) : (
              <ModulesManagementView 
                key="modules-mgmt"
                courseId={courseId || ""}
                modules={modules}
                isAdmin={isAdmin}
                onSelectModule={handleSelectModule}
                onCreateModule={handleOpenCreateModule}
                onEditModule={handleOpenEditModule}
              />
            )
          } />
          <Route path="modules/:moduleId" element={
            <ModuleLessonsRouteWrapper isAdmin={isAdmin} courseId={courseId || ""} />
          } />
          <Route path="assignments" element={
             isMobile ? (
               <MobileCourseContentNavigation 
                 content={content} 
                 courseId={courseId || ""}
                 onBack={handleBackToOverview} 
                 isAdmin={isAdmin}
                 view="assignments"
                 navigateTo={navigateTo}
                 onSelectModule={handleSelectModule}
                 onSelectAssignment={handleSelectAssignment}
                 handleOpenCreateModule={handleOpenCreateModule}
                 handleOpenEditModule={handleOpenEditModule}
                 handleOpenCreateAssignment={handleOpenCreateAssignment}
                 handleOpenEditAssignment={handleOpenEditAssignment}
                 modules={modules}
                 assignments={assignments}
               />
             ) : (
               <AssignmentsListView 
                 courseId={courseId || ""}
                 isAdmin={isAdmin}
                 onSelectAssignment={handleSelectAssignment}
                 onCreateAssignment={handleOpenCreateAssignment}
                 onEditAssignment={handleOpenEditAssignment}
                 assignments={assignments}
               />
             )
          } />
          <Route path="assignments/:assignmentId" element={
             <AssignmentDetailView courseId={courseId || ""} />
          } />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>

      {courseId && (
        <ModuleDialog 
          isOpen={isModuleDialogOpen}
          onClose={() => setIsModuleDialogOpen(false)}
          courseId={courseId}
          module={editingModule}
          onSuccess={refreshModules}
        />
      )}

      {courseId && (
        <AssignmentDialog 
          isOpen={isAssignmentDialogOpen}
          onClose={() => setIsAssignmentDialogOpen(false)}
          courseId={courseId}
          mode={editingAssignment ? "edit" : "create"}
          assignment={editingAssignment}
          onSuccess={refreshAssignments}
        />
      )}
    </div>
  );
}

function MobileCourseContentNavigation({ 
  content, 
  courseId,
  onBack, 
  isAdmin,
  view,
  navigateTo,
  onSelectModule,
  onSelectAssignment,
  handleOpenCreateModule,
  handleOpenEditModule,
  handleOpenCreateAssignment,
  handleOpenEditAssignment,
  modules,
  assignments
}: { 
  content: any; 
  courseId: string;
  onBack: () => void;
  isAdmin: boolean;
  view: SidebarView;
  navigateTo: (path: string) => void;
  onSelectModule: (id: string) => void;
  onSelectAssignment: (id: string) => void;
  handleOpenCreateModule: () => void;
  handleOpenEditModule: (module: Module) => void;
  handleOpenCreateAssignment: () => void;
  handleOpenEditAssignment: (assignment: Assignment) => void;
  modules: Module[];
  assignments: Assignment[];
}) {
  const navigate = useNavigate();
  const basePath = isAdmin ? `/admin/courses/${courseId}` : `/trainer/courses/${courseId}`;

  if (view === "modules") {
    return (
      <ModulesManagementView 
        courseId={courseId}
        modules={modules}
        isAdmin={isAdmin}
        onSelectModule={onSelectModule}
        onBack={() => navigateTo("")}
        onCreateModule={handleOpenCreateModule}
        onEditModule={handleOpenEditModule}
      />
    );
  }

  if (view === "assignments") {
    return (
      <AssignmentsListView 
        courseId={courseId}
        isAdmin={isAdmin}
        onSelectAssignment={onSelectAssignment}
        onCreateAssignment={handleOpenCreateAssignment}
        onEditAssignment={handleOpenEditAssignment}
        assignments={assignments}
        onBack={() => navigateTo("")}
      />
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary p-4 space-y-6">
      <div 
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="size-4" />
        <span className="font-medium">Back to Overview</span>
      </div>

      <section className="px-4 pt-2 pb-1 space-y-1">
        <h1 className="text-xl font-bold text-text-primary tracking-tight leading-tight">
          {content.title}
        </h1>
        <div className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">{content.trainerName}</span>
        </div>
      </section>

      <section className="space-y-3">
        <MobileNavCard 
          title="Modules"
          subtitle="View and manage course modules"
          icon={<Layers className="size-5" />}
          onClick={() => navigateTo("/modules")}
        />
        <MobileNavCard 
          title="Assignments"
          subtitle="View and manage assignments"
          icon={<ClipboardList className="size-5" />}
          onClick={() => navigateTo("/assignments")}
        />
      </section>
    </main>
  );
}

function MobileNavCard({ 
  title, 
  subtitle, 
  icon, 
  onClick 
}: { 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-bg-primary shadow-border rounded-card hover:bg-bg-secondary active:scale-[0.98] transition-all text-left"
    >
      <div className="flex items-center gap-4">
        <div className="size-10 bg-bg-secondary rounded-button flex items-center justify-center text-text-secondary">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <p className="text-[10px] text-text-secondary font-medium tracking-tight">
            {subtitle}
          </p>
        </div>
      </div>
      <ChevronRight className="size-4 text-text-secondary" />
    </button>
  );
}

// Reused components from desktop sidebar
interface SidebarItemProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Wrapper for ModuleLessonsView to capture nested moduleId param and fetch data
 */
function ModuleLessonsRouteWrapper({ isAdmin, courseId }: { isAdmin: boolean, courseId: string }) {
  const { moduleId } = useParams();
  const selectedModule = moduleId ? db.getModule(courseId, moduleId || "") : null;
  const lessons = moduleId ? db.getLessonsByModule(moduleId) : [];

  console.log("ModuleLessonsRouteWrapper:", { moduleId, selectedModule, lessonsCount: lessons.length });

  if (!selectedModule) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-sm text-text-secondary bg-bg-primary">
        Module not found
      </div>
    );
  }

  return (
    <ModuleLessonsView 
      key={selectedModule.id}
      module={selectedModule}
      lessons={lessons}
      isAdmin={isAdmin}
    />
  );
}

function SidebarItem({ id, title, isActive, onClick, onEdit, onDelete }: SidebarItemProps) {
  return (
    <div 
      data-id={id}
      onClick={onClick}
      className={`
        group flex items-center gap-2 h-9 px-2 rounded-button cursor-pointer transition-all relative
        ${isActive 
          ? "bg-bg-secondary text-text-primary shadow-border" 
          : "text-text-secondary hover:bg-bg-secondary/50 hover:text-text-primary"
        }
      `}
    >
      {isActive && (
        <motion.div 
          layoutId="sidebar-accent"
          className="absolute left-0 w-0.5 h-4 bg-accent-blue rounded-full" 
        />
      )}
      
      <span className="text-xs font-medium truncate flex-1 pl-1">
        {title}
      </span>

      <div className={`flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}>
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="size-6 flex items-center justify-center rounded-button hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors"
        >
          <Pencil className="size-3" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="size-6 flex items-center justify-center rounded-button hover:bg-bg-primary text-text-secondary hover:text-accent-red transition-colors"
        >
          <Trash2 className="size-3" />
        </button>
      </div>
    </div>
  );
}
