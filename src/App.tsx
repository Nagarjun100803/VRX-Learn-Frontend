import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useTheme } from "@/hooks/useTheme";
import { AdminLayout } from "@/layouts/AdminLayout";
import { TrainerLayout } from "@/layouts/TrainerLayout";
import { TraineeLayout } from "@/layouts/TraineeLayout";
import { ToastProvider } from "@/components/ui/Toast";
import { ScrollToTop } from "@/components/ScrollToTop";

function AppContent() {
  const { role } = useAuth();
  useTheme();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {role === "admin" && (
          <Route path="/admin/*" element={<AdminLayout />} />
        )}
        {role === "trainer" && (
          <Route path="/trainer/*" element={<TrainerLayout />} />
        )}
        {role === "trainee" && (
          <Route path="/trainee/*" element={<TraineeLayout />} />
        )}
        
        {/* Redirect to appropriate home based on role */}
        <Route 
          path="*" 
          element={<Navigate to={role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/trainee"} replace />} 
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

