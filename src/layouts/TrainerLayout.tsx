import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TrainerDashboard from "@/features/trainer/pages/TrainerDashboard";
import { CourseOverviewPage } from "@/features/trainer/pages/CourseOverviewPage";
import { TraineeRosterPage } from "@/features/trainer/pages/TraineeRosterPage";
import { CourseContentPage } from "@/features/trainer/pages/CourseContentPage";
import { TopNav } from "@/features/admin/components/TopNav";
import { MobileSidebar } from "./MobileSidebar";

export function TrainerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNav onMenuClick={() => setIsSidebarOpen(true)} />

      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        role="trainer" 
      />
      
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
