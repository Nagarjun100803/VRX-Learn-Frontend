import React, { useState, useEffect } from "react";
import { X, User, Mail, Shield, Lock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserDialog({ isOpen, onClose }: CreateUserDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "trainee",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    
    if (!validate()) {
      toast({
        type: "warning",
        title: "Check your inputs",
        description: "Please fix the errors in the form.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        type: "success",
        title: "User created successfully",
        description: `${formData.username} has been added to the system.`,
      });
      
      onClose();
      
      // Reset form
      setFormData({
        username: "",
        email: "",
        role: "trainee",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setGlobalError("Something went wrong. Please try again.");
      toast({
        type: "error",
        title: "Failed to create user",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-text-primary/10 backdrop-blur-[2px]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[450px] bg-bg-primary shadow-card shadow-border rounded-card overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle shadow-border">
              <h2 className="text-base font-semibold text-text-primary">Create New User</h2>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {globalError && (
                <div className="flex items-center gap-2 text-xs text-accent-red bg-accent-red/5 p-3 rounded-button border border-accent-red/10">
                  <AlertCircle className="size-3.5" />
                  {globalError}
                </div>
              )}

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Username <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    autoFocus
                    placeholder="Enter username"
                    className={`pl-9 h-10 ${errors.username ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                {errors.username && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Email <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    type="email"
                    placeholder="Enter email"
                    className={`pl-9 h-10 ${errors.email ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.email}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Role <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <select
                    className="w-full h-10 pl-9 pr-3 bg-bg-primary shadow-border rounded-button text-sm outline-none focus:ring-focus transition-all appearance-none"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="admin">Admin</option>
                    <option value="trainer">Trainer</option>
                    <option value="trainee">Trainee</option>
                  </select>
                </div>
                <p className="text-[10px] text-text-secondary ml-1">
                  Default role is trainee.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Password <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    className={`pl-9 h-10 ${errors.password ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                {errors.password && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Confirm Password <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    className={`pl-9 h-10 ${errors.confirmPassword ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.confirmPassword}</p>
                )}
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 sm:p-5 bg-bg-secondary/50 border-t border-border-subtle">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="h-9 px-4 shadow-border"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="h-9 px-6 bg-text-primary text-bg-primary hover:bg-text-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create User"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
