import React, { useState, useEffect } from "react";
import { X, BookOpen, FileText, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { UserSearchSelect } from "./UserSearchSelect";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { api } from "@/lib/api-client";

interface CourseFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    shortDescription?: string | null;
    longDescription?: string | null;
    trainerId: string;
    trainerName: string;
  };
  onSuccess?: () => void;
}

export function CreateCourseDialog({ isOpen, onClose, mode, initialData, onSuccess }: CourseFormDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    trainerId: "",
    trainerName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialData when opening in edit mode
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setFormData({
          title: initialData.title || "",
          shortDescription: initialData.shortDescription || "",
          longDescription: initialData.longDescription || "",
          trainerId: initialData.trainerId || "",
          trainerName: initialData.trainerName || "",
        });
      } else {
        // Reset for create mode
        setFormData({
          title: "",
          shortDescription: "",
          longDescription: "",
          trainerId: "",
          trainerName: "",
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
    if (!formData.title) newErrors.title = "Course title is required";
    if (!formData.trainerId) newErrors.trainerId = "Please select a trainer";
    if (formData.shortDescription.length > 160) {
      newErrors.shortDescription = "Short description must be under 160 characters";
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
      const payload = {
        title: formData.title,
        shortDescription: formData.shortDescription || null,
        longDescription: formData.longDescription || null,
        thumbnail: null,
        trainerId: formData.trainerId
      };

      if (mode === "create") {
        await api.post("courses", { ...payload, details: { type: "live" } });
      } else {
        await api.patch(`courses/update-basic-info/${initialData?.id}`, payload);
      }

      toast({
        type: "success",
        title: mode === "create" ? "Course created successfully" : "Course updated successfully",
        description: `${formData.title} has been ${mode === "create" ? "added to" : "updated in"} the catalog.`,
      });
      
      onSuccess?.();
      onClose();
    } catch (error: any) {
      const apiError = error.response?.data;
      
      let friendlyMessage = "Something went wrong. Please try again.";
      
      if (apiError && apiError.type) {
        if (apiError.type === "CourseAlreadyExistsError") {
          setErrors(prev => ({ ...prev, title: "This course title already exists. Try a different name." }));
        } else if (apiError.type === "UserNotFoundError") {
          setErrors(prev => ({ ...prev, trainerId: "Selected trainer no longer exists." }));
        } else if (apiError.type === "InvalidRoleError") {
          setErrors(prev => ({ ...prev, trainerId: "Selected user is not a trainer." }));
        } else {
          setGlobalError(friendlyMessage);
        }
      } else {
        setGlobalError(friendlyMessage);
      }

      toast({
        type: "error",
        title: "Failed to create course",
        description: friendlyMessage,
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
            className="relative w-full max-w-[600px] bg-bg-primary shadow-card shadow-border rounded-card overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle shadow-border">
              <h2 className="text-base font-semibold text-text-primary">
                {mode === "create" ? "Create New Course" : "Update Course"}
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

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Course Title <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    autoFocus
                    placeholder="e.g. Advanced FastAPI Mastery"
                    className={`pl-9 h-10 ${errors.title ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                {errors.title && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.title}</p>
                )}
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Short Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 size-4 text-text-secondary" />
                  <textarea
                    placeholder="Brief overview of the course (max 160 chars)"
                    className={`
                      w-full min-h-[80px] pl-9 pr-3 py-2.5 bg-bg-primary shadow-border rounded-button text-sm outline-none focus:ring-focus transition-all resize-none
                      ${errors.shortDescription ? "border-accent-red focus:ring-accent-red/20" : ""}
                    `}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  />
                </div>
                <div className="flex justify-between px-1">
                  {errors.shortDescription ? (
                    <p className="text-[10px] font-medium text-accent-red">{errors.shortDescription}</p>
                  ) : <div />}
                  <p className={`text-[10px] ${formData.shortDescription.length > 160 ? "text-accent-red font-bold" : "text-text-secondary"}`}>
                    {formData.shortDescription.length}/160
                  </p>
                </div>
              </div>

              {/* Trainer Selection */}
              <UserSearchSelect
                selectedId={formData.trainerId}
                onSelect={(id, name) => setFormData({ ...formData, trainerId: id, trainerName: name })}
                error={errors.trainerId}
              />

              {/* Long Description (Markdown) */}
              <MarkdownEditor
                label="Long Description"
                placeholder="Detailed course content, modules, and learning paths using Markdown..."
                value={formData.longDescription}
                onChange={(val) => setFormData({ ...formData, longDescription: val })}
              />
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
                {isSubmitting ? (mode === "create" ? "Creating..." : "Updating...") : (mode === "create" ? "Create Course" : "Update Course")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
