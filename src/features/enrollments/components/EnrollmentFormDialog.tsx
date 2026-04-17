import React, { useState, useEffect } from "react";
import { X, AlertCircle, Calendar, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { UserSearchSelect } from "@/features/courses/components/UserSearchSelect";
import { CourseSearchSelect } from "./CourseSearchSelect";
import { EnrollmentStatus } from "../types";

interface EnrollmentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    userId: string;
    name: string;
    email: string;
    role: "admin" | "trainer" | "trainee";
    courseId: string;
    courseName: string;
    status: EnrollmentStatus;
    expireAt?: string | null;
  };
}

export function EnrollmentFormDialog({ isOpen, onClose, mode, initialData }: EnrollmentFormDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    courseId: "",
    courseName: "",
    status: "in-progress" as EnrollmentStatus,
    expireAt: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialData when opening
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setFormData({
          userId: initialData.userId,
          userName: initialData.name,
          courseId: initialData.courseId,
          courseName: initialData.courseName,
          status: initialData.status,
          expireAt: initialData.expireAt ? initialData.expireAt.split("T")[0] : "",
        });
      } else {
        setFormData({
          userId: "",
          userName: "",
          courseId: "",
          courseName: "",
          status: "in-progress",
          expireAt: "",
        });
      }
      setErrors({});
      setGlobalError(null);
    }
  }, [isOpen, mode, initialData]);

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
    if (!formData.userId) newErrors.userId = "User is required";
    if (!formData.courseId) newErrors.courseId = "Course is required";
    if (!formData.status) newErrors.status = "Status is required";
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
        title: mode === "create" ? "Enrollment created successfully" : "Enrollment updated successfully",
        description: `${formData.userName} has been ${mode === "create" ? "enrolled in" : "updated for"} ${formData.courseName}.`,
      });
      
      onClose();
    } catch (error) {
      setGlobalError("Something went wrong. Please try again.");
      toast({
        type: "error",
        title: mode === "create" ? "Failed to create enrollment" : "Failed to update enrollment",
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
            className="relative w-full max-w-[500px] bg-bg-primary shadow-card shadow-border rounded-card overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle shadow-border">
              <h2 className="text-base font-semibold text-text-primary">
                {mode === "create" ? "Create Enrollment" : "Update Enrollment"}
              </h2>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {globalError && (
                <div className="flex items-center gap-2 text-xs text-accent-red bg-accent-red/5 p-3 rounded-button border border-accent-red/10">
                  <AlertCircle className="size-3.5" />
                  {globalError}
                </div>
              )}

              {/* User Selection */}
              <UserSearchSelect
                label="User"
                role="all"
                selectedId={formData.userId}
                onSelect={(id, name) => setFormData({ ...formData, userId: id, userName: name })}
                error={errors.userId}
                disabled={mode === "edit"}
              />

              {/* Course Selection */}
              <CourseSearchSelect
                selectedId={formData.courseId}
                onSelect={(id, name) => setFormData({ ...formData, courseId: id, courseName: name })}
                error={errors.courseId}
                disabled={mode === "edit"}
              />

              {/* Status & Expiry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary ml-0.5">
                    Status <span className="text-accent-red">*</span>
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary pointer-events-none" />
                    <select
                      className={`
                        w-full h-10 pl-9 pr-3 bg-bg-primary shadow-border rounded-button text-sm outline-none focus:ring-focus transition-all appearance-none
                        ${errors.status ? "border-accent-red focus:ring-accent-red/20" : ""}
                      `}
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as EnrollmentStatus })}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="suspended">Suspended</option>
                      <option value="dropped">Dropped</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  {errors.status && (
                    <p className="text-[10px] font-medium text-accent-red ml-1">{errors.status}</p>
                  )}
                </div>

                {/* Expiry Date */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary ml-0.5">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary pointer-events-none" />
                    <input
                      type="date"
                      className="w-full h-10 pl-9 pr-3 bg-bg-primary shadow-border rounded-button text-sm outline-none focus:ring-focus transition-all"
                      value={formData.expireAt}
                      onChange={(e) => setFormData({ ...formData, expireAt: e.target.value })}
                    />
                  </div>
                </div>
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
                {isSubmitting ? (mode === "create" ? "Creating..." : "Updating...") : (mode === "create" ? "Create" : "Update")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
