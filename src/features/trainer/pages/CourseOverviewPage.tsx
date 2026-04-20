import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Layers, FileText, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/db";
import { DefaultThumbnail } from "../components/DefaultThumbnail";

export function CourseOverviewPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;
  
  const isAdmin = userRole === "admin" || userRole === "trainer";
  const isTrainer = userRole === "trainer";
  const isTrainee = userRole === "trainee";

  const course = courseId ? db.getCourse(courseId) : null;
  const modules = courseId ? db.getModulesByCourse(courseId) : [];
  const assignments = courseId ? db.getAssignmentsByCourse(courseId) : [];
  
  const totalLessons = modules.reduce((acc, m) => acc + db.getLessonsByModule(m.id).length, 0);

  const rootPath = userRole === "admin" ? "/admin" : userRole === "trainer" ? "/trainer" : "/trainee";
  const basePath = `${rootPath}/courses/${courseId}`;
  const dashboardPath = userRole === "admin" ? "/admin/courses" : rootPath;

  if (!course) {
    return (
      <div className="container-vercel py-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-text-primary">Course not found</h2>
        <Button 
          variant="ghost" 
          className="mt-4" 
          onClick={() => navigate(dashboardPath)}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <main className="container-vercel py-12 space-y-12 pb-20 min-h-screen">
      {/* Back Link */}
      <button 
        onClick={() => navigate(dashboardPath)}
        className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group"
      >
        <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <DefaultThumbnail 
          courseName={course.title} 
          className="w-full md:w-64 aspect-video md:aspect-[4/3] rounded-card shadow-border shrink-0" 
        />
        <div className="space-y-4 flex-1 min-w-0">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight line-clamp-2">
              {course.title}
            </h1>
            <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
              {course.shortDescription || "No description provided."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-6 bg-accent-blue/10 text-accent-blue rounded-full flex items-center justify-center text-[10px] font-bold">
              {course.trainerName.charAt(0)}
            </div>
            <span className="text-sm text-text-secondary">
              Trainer: <span className="text-text-primary font-medium">{course.trainerName}</span>
            </span>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIItem label="Modules" value={modules.length} icon={<Layers className="size-4" />} />
        <KPIItem label="Lessons" value={totalLessons} icon={<BookOpen className="size-4" />} />
        <KPIItem label="Assignments" value={assignments.length} icon={<FileText className="size-4" />} />
        <KPIItem label="Trainees" value={450 /* Mock value for now */} icon={<Users className="size-4" />} />
      </section>

      {/* Navigation Cards */}
      <section className={`grid grid-cols-1 ${isTrainee ? "" : "md:grid-cols-2"} gap-6`}>
        <NavCard 
          title="Course Content"
          description={isTrainee ? "Browse modules, lessons, and assignments." : "Manage modules, lessons, and assignments."}
          stats={[
            { label: "Modules", value: modules.length },
            { label: "Lessons", value: totalLessons },
            { label: "Assignments", value: assignments.length }
          ]}
          onClick={() => navigate(`${basePath}/content`)}
        />
        {!isTrainee && (
          <NavCard 
            title="Trainee Roster"
            description="View and manage enrolled trainees."
            stats={[
              { label: "Total Trainees", value: 450 /* Mock value */ }
            ]}
            onClick={() => navigate(`${basePath}/trainees`)}
          />
        )}
      </section>
    </main>
  );
}

function KPIItem({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="p-4 bg-bg-primary shadow-border rounded-card flex items-center gap-4">
      <div className="size-10 bg-bg-secondary rounded-button flex items-center justify-center text-text-secondary">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">{label}</div>
        <div className="text-lg font-bold text-text-primary">{value.toLocaleString()}</div>
      </div>
    </div>
  );
}

function NavCard({ 
  title, 
  description, 
  stats, 
  onClick 
}: { 
  title: string; 
  description: string; 
  stats: { label: string; value: number }[];
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col p-6 bg-bg-primary shadow-border hover:shadow-card hover:-translate-y-0.5 transition-all rounded-card text-left group"
    >
      <div className="flex justify-between items-start w-full mb-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-accent-blue transition-colors">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
        <ChevronRight className="size-5 text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
      </div>
      
      <div className="mt-auto flex gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <div className="text-xs font-bold text-text-primary">{stat.value.toLocaleString()}</div>
            <div className="text-[10px] uppercase text-text-secondary tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </button>
  );
}
