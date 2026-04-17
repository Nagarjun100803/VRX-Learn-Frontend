import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { MOCK_COURSE_CONTENT } from "../content-types";
import { MOCK_MODULES, MOCK_LESSONS } from "@/mocks/course-content";
import { ModuleLessonsView } from "../components/ModuleLessonsView";
import { ModulesManagementView } from "../components/ModulesManagementView";

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
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { role: userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const isMobile = useIsMobile();

  const content = MOCK_COURSE_CONTENT[courseId || ""] || null;

  // Derive view and selected items from URL
  const view = useMemo<SidebarView>(() => {
    if (location.pathname.includes("/modules")) return "modules";
    if (location.pathname.includes("/assignments")) return "assignments";
    return "root";
  }, [location.pathname]);

  const { moduleId } = useParams();
  const selectedModuleId = moduleId || null;
  const selectedAssignmentId = null; // Can be enhanced if assignment sub-routes are added

  // Helper for navigating within course context
  const navigateTo = (path: string) => {
    const root = isAdmin ? "/admin" : "/trainer";
    navigate(`${root}/courses/${courseId}${path}`);
  };

  // Filter lessons for the selected module
  const filteredLessons = useMemo(() => {
    if (!selectedModuleId) return [];
    return MOCK_LESSONS.filter(l => l.module_id === selectedModuleId);
  }, [selectedModuleId]);

  const selectedModule = useMemo(() => {
    if (!selectedModuleId) return null;
    return MOCK_MODULES.find(m => m.id === selectedModuleId) || null;
  }, [selectedModuleId]);

  const handleSelectModule = (id: string) => {
    navigateTo(`/modules/${id}`);
  };

  const handleSelectAssignment = (id: string) => {
    // Currently no sub-routes for assignments, but we keep the logic structure
    navigateTo(`/assignments`);
  };

  const handleBackToOverview = () => {
    if (isMobile && (selectedModuleId || selectedAssignmentId)) {
      navigateTo("/content");
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
        <Button variant="ghost" className="mt-4" onClick={handleBackToOverview}>
          <ArrowLeft className="size-4 mr-2" />
          Back to Course Overview
        </Button>
      </div>
    );
  }

  // Mobile Lessons View
  if (isMobile && selectedModuleId && selectedModule) {
    return (
      <ModuleLessonsView 
        module={selectedModule} 
        lessons={filteredLessons} 
        isAdmin={isAdmin} 
      />
    );
  }

  if (isMobile) {
    return (
      <MobileCourseContentNavigation 
        content={content} 
        onBack={handleBackToOverview} 
        isAdmin={isAdmin}
        view={view}
        navigateTo={navigateTo}
        onSelectModule={handleSelectModule}
        onSelectAssignment={handleSelectAssignment}
      />
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] bg-bg-primary overflow-hidden selection:bg-accent-blue/10 font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-border-subtle bg-bg-primary flex flex-col shrink-0 shadow-border">
        {/* Sidebar Header: Back Button */}
        <div className="p-4 border-b border-border-subtle shadow-border flex items-center">
           <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-text-secondary hover:text-text-primary h-8 px-2"
            onClick={handleBackToOverview}
          >
            <ArrowLeft className="size-3.5 mr-2" />
            <span className="text-xs font-medium">Back to Overview</span>
          </Button>
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
                    onClick={() => navigateTo("/content")}
                    className="size-6 flex items-center justify-center rounded-button hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <ArrowLeft className="size-3.5" />
                  </button>
                  <span className="text-xs font-bold text-text-primary">Modules</span>
                </div>

                <div className="space-y-0.5">
                  {content.modules.map((module) => (
                    <SidebarItem
                      key={module.id}
                      id={module.id}
                      title={module.title}
                      isActive={selectedModuleId === module.id}
                      onClick={() => handleSelectModule(module.id)}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  ))}
                  {content.modules.length === 0 && (
                    <div className="py-8 px-4 text-center">
                      <p className="text-[10px] text-text-secondary font-medium">No modules yet</p>
                    </div>
                  )}
                </div>

                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    className="mt-auto w-full justify-start h-9 px-2 text-accent-blue hover:text-accent-blue hover:bg-accent-blue/5"
                    onClick={() => {}}
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
                    onClick={() => navigateTo("/content")}
                    className="size-6 flex items-center justify-center rounded-button hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <ArrowLeft className="size-3.5" />
                  </button>
                  <span className="text-xs font-bold text-text-primary">Assignments</span>
                </div>

                <div className="space-y-0.5">
                  {content.assignments.map((assignment) => (
                    <SidebarItem
                      key={assignment.id}
                      id={assignment.id}
                      title={assignment.title}
                      isActive={selectedAssignmentId === assignment.id}
                      onClick={() => handleSelectAssignment(assignment.id)}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  ))}
                  {content.assignments.length === 0 && (
                    <div className="py-8 px-4 text-center">
                      <p className="text-[10px] text-text-secondary font-medium">No assignments yet</p>
                    </div>
                  )}
                </div>

                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    className="mt-auto w-full justify-start h-9 px-2 text-accent-blue hover:text-accent-blue hover:bg-accent-blue/5"
                    onClick={() => {}}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-bg-primary relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedModuleId && !selectedAssignmentId ? (
            view === "modules" ? (
              <ModulesManagementView 
                key="modules-mgmt"
                courseId={content.course.id}
                modules={content.modules}
                isAdmin={isAdmin}
                onSelectModule={handleSelectModule}
              />
            ) : view === "assignments" ? (
              <motion.div
                key="assignments-mgmt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col p-8"
              >
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-border-subtle shadow-border">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">Assignments</h1>
                    <p className="text-sm text-text-secondary">Manage course assignments</p>
                  </div>
                  <Button className="h-9 px-4 bg-text-primary text-bg-primary hover:bg-text-primary/90 font-bold text-xs rounded-button">
                    <Plus className="size-4 mr-2" />
                    New Assignment
                  </Button>
                </div>
                <div className="flex-1 rounded-card border-2 border-dashed border-border-subtle flex flex-col items-center justify-center opacity-40">
                  <ClipboardList className="size-10 mb-4" />
                  <p className="text-sm font-medium">Assignments Management (Coming Soon)</p>
                </div>
              </motion.div>
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
          ) : selectedModuleId && selectedModule ? (
              <ModuleLessonsView 
                key={selectedModuleId}
                module={selectedModule}
                lessons={filteredLessons}
                isAdmin={isAdmin}
              />
          ) : (
            <motion.div
              key={selectedAssignmentId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-border-subtle shadow-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                    Assignment
                    <span className="text-border-subtle">•</span>
                    {selectedAssignmentId}
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                    {content.assignments.find(a => a.id === selectedAssignmentId)?.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-9 shadow-border text-text-secondary">
                    <MoreVertical className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Detail Placeholder for Assignments */}
              <div className="flex-1 rounded-card border-2 border-dashed border-border-subtle flex flex-col items-center justify-center opacity-40">
                <ClipboardList className="size-10 mb-4" />
                <p className="text-sm font-medium">Assignment Editor (Coming Soon)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MobileCourseContentNavigation({ 
  content, 
  onBack, 
  isAdmin,
  view,
  navigateTo,
  onSelectModule,
  onSelectAssignment
}: { 
  content: any; 
  onBack: () => void;
  isAdmin: boolean;
  view: SidebarView;
  navigateTo: (path: string) => void;
  onSelectModule: (id: string) => void;
  onSelectAssignment: (id: string) => void;
}) {
  const navigate = useNavigate();
  const basePath = isAdmin ? `/admin/courses/${content.course.id}` : `/trainer/courses/${content.course.id}`;

  if (view === "modules") {
    return (
      <ModulesManagementView 
        courseId={content.course.id}
        modules={content.modules}
        isAdmin={isAdmin}
        onSelectModule={onSelectModule}
        onBack={() => navigateTo("/content")}
      />
    );
  }

  if (view === "assignments") {
    return (
      <main className="min-h-screen bg-bg-primary p-4 space-y-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-text-secondary hover:text-text-primary h-8 px-0"
          onClick={() => navigateTo("/content")}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Course Content
        </Button>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Assignments</h2>
          <div className="space-y-3">
            {content.assignments.map((assignment: any) => (
              <MobileNavCard 
                key={assignment.id}
                title={assignment.title}
                subtitle={`Assignment ${assignment.id}`}
                icon={<ClipboardList className="size-5" />}
                onClick={() => onSelectAssignment(assignment.id)}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary p-4 space-y-6">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-text-secondary hover:text-text-primary h-8 px-0"
        onClick={onBack}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to Overview
      </Button>

      <section className="bg-bg-primary p-4 rounded-card shadow-border space-y-2">
        <div className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">
          {content.course.id}
        </div>
        <h1 className="text-xl font-bold text-text-primary tracking-tight leading-tight">
          {content.course.title}
        </h1>
        <div className="text-sm text-text-secondary">
          Trainer: <span className="font-medium text-text-primary">{content.course.trainerName}</span>
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
