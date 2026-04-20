import { Routes, Route, Navigate } from "react-router-dom";
import { ProfileDropdown } from "@/features/admin/components/ProfileDropdown";
import TrainerDashboard from "@/features/trainer/pages/TrainerDashboard";
import { CourseOverviewPage } from "@/features/trainer/pages/CourseOverviewPage";
import { TraineeRosterPage } from "@/features/trainer/pages/TraineeRosterPage";
import { CourseContentPage } from "@/features/trainer/pages/CourseContentPage";

export function TrainerLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <nav className="sticky top-0 z-30 w-full bg-bg-primary/80 backdrop-blur-md shadow-border">
        <div className="container-vercel h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-text-primary rounded-button flex items-center justify-center">
              <span className="text-[10px] font-bold text-bg-primary">VX</span>
            </div>
            <span className="font-semibold tracking-tight-md">VRX Learn</span>
          </div>
          <div className="flex items-center gap-4">
            <ProfileDropdown />
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route index element={<TrainerDashboard />} />
        <Route path="courses/:courseId" element={<CourseOverviewPage />} />
        <Route path="courses/:courseId/trainees" element={<TraineeRosterPage />} />
        <Route path="courses/:courseId/content/*" element={<CourseContentPage />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </div>
  );
}
