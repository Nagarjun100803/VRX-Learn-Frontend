import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import UsersPage from "@/features/users/pages/UsersPage";
import CoursesPage from "@/features/courses/pages/CoursesPage";
import EnrollmentsPage from "@/features/enrollments/pages/EnrollmentsPage";
import { CourseOverviewPage } from "@/features/trainer/pages/CourseOverviewPage";
import { CourseContentPage } from "@/features/trainer/pages/CourseContentPage";
import { TraineeRosterPage } from "@/features/trainer/pages/TraineeRosterPage";
import { TopNav } from "@/features/admin/components/TopNav";

const navItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Users", path: "/admin/users" },
  { label: "Courses", path: "/admin/courses" },
  { label: "Enrollments", path: "/admin/enrollments" },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const active = navItems.find(item => item.path === location.pathname);
    return active ? active.label : "Dashboard";
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNav 
        activeTab={getActiveTab()} 
        onTabChange={(tab) => {
          const item = navItems.find(i => i.label === tab);
          if (item) navigate(item.path);
        }} 
      />
      
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseId" element={<CourseOverviewPage />} />
        <Route path="courses/:courseId/trainees" element={<TraineeRosterPage />} />
        <Route path="courses/:courseId/content" element={<CourseContentPage />} />
        <Route path="courses/:courseId/modules" element={<CourseContentPage />} />
        <Route path="courses/:courseId/modules/:moduleId" element={<CourseContentPage />} />
        <Route path="courses/:courseId/assignments" element={<CourseContentPage />} />
        <Route path="enrollments" element={<EnrollmentsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
}
