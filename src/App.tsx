import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useTheme } from "@/hooks/useTheme";
import { AdminLayout } from "@/layouts/AdminLayout";
import { TrainerLayout } from "@/layouts/TrainerLayout";
import { TraineeLayout } from "@/layouts/TraineeLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ToastProvider } from "@/components/ui/Toast";
import { ScrollToTop } from "@/components/ScrollToTop";

function AppContent() {
  const { user, isLoading } = useAuth();
  useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="size-8 rounded-full border-2 border-border-subtle border-t-text-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/*" element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        } />

        <Route path="/trainer/*" element={
          <ProtectedRoute roles={["trainer"]}>
            <TrainerLayout />
          </ProtectedRoute>
        } />

        <Route path="/trainee/*" element={
          <ProtectedRoute roles={["trainee"]}>
            <TraineeLayout />
          </ProtectedRoute>
        } />
        
        {/* Default route redirects to login or dashboard based on user state */}
        <Route 
          path="/" 
          element={
            user 
              ? <Navigate to={user.role === "admin" ? "/admin" : user.role === "trainer" ? "/trainer" : "/trainee"} replace />
              : <Navigate to="/login" replace />
          } 
        />

        {/* Catch-all route */}
        <Route 
          path="*" 
          element={
            user 
              ? <Navigate to={user.role === "admin" ? "/admin" : user.role === "trainer" ? "/trainer" : "/trainee"} replace />
              : <Navigate to="/login" replace />
          } 
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

