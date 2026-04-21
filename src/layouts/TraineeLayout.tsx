import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TraineeDashboard from "@/features/trainee/pages/TraineeDashboard";
import { CourseOverviewPage } from "@/features/trainer/pages/CourseOverviewPage";
import { CourseContentPage } from "@/features/trainer/pages/CourseContentPage";
import { TopNav } from "@/features/admin/components/TopNav";
import { MobileSidebar } from "./MobileSidebar";

export function TraineeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNav onMenuClick={() => setIsSidebarOpen(true)} />

      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        role="trainee" 
      />
      
      <Routes>
        <Route index element={<TraineeDashboard />} />
        <Route path="courses/:courseId" element={<CourseOverviewPage />} />
        <Route path="courses/:courseId/content/*" element={<CourseContentPage />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </div>
  );
}
