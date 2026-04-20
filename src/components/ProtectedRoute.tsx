import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

export function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="size-8 rounded-full border-2 border-border-subtle border-t-text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location }} 
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    const home = user.role === "admin" ? "/admin" : user.role === "trainer" ? "/trainer" : "/trainee";
    return <Navigate to={home} replace />;
  }

  return <>{children}</>;
}
