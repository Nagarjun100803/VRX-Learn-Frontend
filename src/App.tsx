import { useState } from "react";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import UsersPage from "@/features/users/pages/UsersPage";
import CoursesPage from "@/features/courses/pages/CoursesPage";
import EnrollmentsPage from "@/features/enrollments/pages/EnrollmentsPage";
import { TopNav } from "@/features/admin/components/TopNav";
import { ToastProvider } from "@/components/ui/Toast";

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg-primary">
        <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === "Dashboard" && <AdminDashboard />}
        {activeTab === "Users" && <UsersPage />}
        {activeTab === "Courses" && <CoursesPage />}
        {activeTab === "Enrollments" && <EnrollmentsPage />}
      </div>
    </ToastProvider>
  );
}

