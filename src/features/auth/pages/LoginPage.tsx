import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Prevent login page redirect loop if user is already logged in
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "trainer") return <Navigate to="/trainer" replace />;
    return <Navigate to="/trainee" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      }
      // Trainer/Trainee can be added later — ignore for now as requested
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[400px]"
      >
        <div className="bg-bg-primary rounded-card shadow-border p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Sign in</h1>
            <p className="text-sm text-text-secondary">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 text-xs font-medium text-accent-red bg-accent-red/5 rounded-button border border-accent-red/10"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label 
                htmlFor="email" 
                className="text-[11px] font-bold text-text-secondary uppercase tracking-widest px-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full h-10 px-3 bg-bg-primary border border-border-subtle rounded-button text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden focus:ring-1 focus:ring-text-primary transition-all shadow-input"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label 
                  htmlFor="password" 
                  className="text-[11px] font-bold text-text-secondary uppercase tracking-widest"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-10 px-3 bg-bg-primary border border-border-subtle rounded-button text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden focus:ring-1 focus:ring-text-primary transition-all shadow-input"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-10 bg-text-primary text-bg-primary hover:bg-text-primary/90 font-bold text-sm tracking-tight transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-[11px] text-text-secondary font-medium uppercase tracking-widest leading-relaxed">
              Protected by VRX Learn Security
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
