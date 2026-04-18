import React, { useState, useEffect } from "react";
import { X, Layout, AlignLeft, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { Module } from "@/types";
import { db } from "@/db";

interface ModuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  module?: Module | null;
  onSuccess: () => void;
}

export function ModuleDialog({ isOpen, onClose, courseId, module, onSuccess }: ModuleDialogProps) {
  const { toast } = useToast();
  const isEdit = !!module;
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form when module changes or opens
  useEffect(() => {
    if (isOpen) {
      if (module) {
        setFormData({
          title: module.title,
          description: module.description,
        });
      } else {
        setFormData({
          title: "",
          description: "",
        });
      }
      setErrors({});
    }
  }, [isOpen, module]);

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
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 64) {
      newErrors.title = "Title must be less than 64 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (isEdit && module) {
        db.updateModule(module.id, {
          title: formData.title,
          description: formData.description,
        });
        toast({
          type: "success",
          title: "Module updated successfully",
          description: "Your changes have been saved.",
        });
      } else {
        db.createModule(courseId, {
          title: formData.title,
          description: formData.description,
        });
        toast({
          type: "success",
          title: "Module created successfully",
          description: "New module has been added to the course.",
        });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        type: "error",
        title: "Something went wrong",
        description: "Failed to save module. Please try again.",
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
              <h2 className="text-base font-semibold text-text-primary">
                {isEdit ? "Edit Module" : "Create Module"}
              </h2>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Title <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <Layout className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    autoFocus
                    placeholder="e.g. Introduction to FastAPI"
                    className={`pl-9 h-10 ${errors.title ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                {errors.title && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Description
                </label>
                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 size-4 text-text-secondary" />
                  <textarea
                    placeholder="Enter module description..."
                    className="w-full min-h-[100px] pl-9 pr-3 py-2 bg-bg-primary shadow-border border-none rounded-button text-sm outline-none focus:ring-focus transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
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
                {isSubmitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
