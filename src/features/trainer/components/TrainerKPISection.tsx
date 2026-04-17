import { BookOpen, Users, Award, BarChart3 } from "lucide-react";
import { TrainerKPIs } from "../types";

interface KPIProps {
  kpis: TrainerKPIs;
}

export function TrainerKPISection({ kpis }: KPIProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Assigned Courses */}
      <KPICard
        title="Assigned Courses"
        value={kpis.assignedCourses}
        icon={<BookOpen className="size-4" />}
      />

      {/* 2. Total Learners */}
      <KPICard
        title="Total Learners"
        value={kpis.totalLearners}
        icon={<Users className="size-4" />}
      />

      {/* 3. Certifications Issued (Coming Soon) */}
      <KPICard
        title="Certifications Issued"
        value={0}
        icon={<Award className="size-4" />}
        comingSoon
      />

      {/* 4. Average Completion (Coming Soon) */}
      <KPICard
        title="Average Completion"
        value="0%"
        icon={<BarChart3 className="size-4" />}
        comingSoon
      />
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

function KPICard({ title, value, icon, comingSoon }: KPICardProps) {
  return (
    <div 
      className={`p-4 bg-bg-primary shadow-border rounded-card flex flex-col justify-between min-h-[120px] transition-all ${
        comingSoon ? "opacity-60 cursor-not-allowed select-none" : "hover:shadow-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {title}
        </span>
        <div className="text-text-secondary">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-text-primary tracking-tight">
          {comingSoon ? "--" : value.toLocaleString()}
        </span>
        {comingSoon && (
          <span className="text-[10px] font-bold px-2 py-0.5 bg-bg-secondary text-text-secondary rounded-full border border-border-subtle">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}
