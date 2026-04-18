import React, { useState, useEffect, useRef } from "react";
import { X, ClipboardList, Calendar, Target, RotateCcw, Upload, File, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { Assignment, LessonMimeType } from "@/types";
import { db } from "@/db";
import { MarkdownEditor } from "@/components/MarkdownEditor";

interface AssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  mode: "create" | "edit";
  assignment?: Assignment | null;
  onSuccess: () => void;
}

export function AssignmentDialog({ 
  isOpen, 
  onClose, 
  courseId, 
  mode, 
  assignment, 
  onSuccess 
}: AssignmentDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = mode === "edit";
  
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    dueDate: "",
    maxScore: "100",
    numberOfAttempts: "1",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize and reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      if (isEdit && assignment) {
        setFormData({
          title: assignment.title,
          instructions: assignment.instructions || "",
          dueDate: assignment.dueDate || "",
          maxScore: assignment.maxScore.toString(),
          numberOfAttempts: assignment.numberOfAttempts.toString(),
        });
      } else {
        setFormData({
          title: "",
          instructions: "",
          dueDate: "",
          maxScore: "100",
          numberOfAttempts: "1",
        });
      }
      setSelectedFile(null);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, assignment, isEdit]);

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes: LessonMimeType[] = ["application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const newErrors: Record<string, string> = { ...errors };
    delete newErrors.file;

    if (!validTypes.includes(file.type as LessonMimeType)) {
      newErrors.file = "Invalid file type. Only PDF is allowed.";
    } else if (file.size > maxSize) {
      newErrors.file = "File size exceeds 5MB limit.";
    }

    setErrors(newErrors);
    setSelectedFile(file);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 64) {
      newErrors.title = "Title must be less than 64 characters";
    }

    if (!isEdit && !formData.instructions.trim() && !selectedFile) {
      newErrors.global = "Either instructions or a resource file must be provided";
    }

    // Max Score validation
    const score = parseInt(formData.maxScore);
    const allowedScores = [5, 10, 25, 50, 100];

    if (!formData.maxScore) {
      newErrors.maxScore = "Max score is required";
    } else if (!allowedScores.includes(score)) {
      newErrors.maxScore = "Allowed values: 5, 10, 25, 50, 100";
    }

    // Attempts validation
    const attempts = parseInt(formData.numberOfAttempts);

    if (!formData.numberOfAttempts) {
      newErrors.numberOfAttempts = "Attempts is required";
    } else if (attempts < 1 || attempts > 3) {
      newErrors.numberOfAttempts = "Attempts must be between 1 and 3";
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
      if (!isEdit) {
        // Create Mode - Simple API simulation
        await new Promise(res => setTimeout(res, 1000));

        db.createAssignment(courseId, {
          title: formData.title,
          instructions: formData.instructions,
          dueDate: formData.dueDate,
          maxScore: parseInt(formData.maxScore),
          numberOfAttempts: parseInt(formData.numberOfAttempts),
          attachment: selectedFile ? {
            mediaId: `MEDIA-${Date.now()}`,
            mimeType: selectedFile.type as LessonMimeType,
            filename: selectedFile.name
          } : null
        });

        toast({
          type: "success",
          title: "Assignment created successfully",
          description: `Assignment "${formData.title}" has been added to the course.`,
        });
        onSuccess();
        onClose();
      } else if (assignment) {
        // Edit Mode - Simple API simulation
        await new Promise((resolve) => setTimeout(resolve, 800));
        db.updateAssignment(assignment.id, {
          title: formData.title,
          instructions: formData.instructions,
          dueDate: formData.dueDate,
        });
        toast({
          type: "success",
          title: "Assignment updated successfully",
          description: `Assignment "${formData.title}" has been updated.`,
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast({
        type: "error",
        title: "Something went wrong",
        description: "Failed to save assignment. Please try again.",
      });
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
            className="relative w-full max-w-[500px] bg-bg-primary shadow-card shadow-border rounded-card flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle shadow-border">
              <h2 className="text-base font-semibold text-text-primary">
                {isEdit ? "Edit Assignment" : "Create Assignment"}
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
              {errors.global && (
                <div className="flex items-center gap-2 text-xs text-accent-red bg-accent-red/5 p-3 rounded-button border border-accent-red/10 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="size-3.5" />
                  {errors.global}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Title <span className="text-accent-red">*</span>
                </label>
                <div className="relative">
                  <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    autoFocus
                    placeholder="e.g. FastAPI Performance Optimization"
                    className={`pl-9 h-10 ${errors.title ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.title && (
                  <p className="text-[10px] font-medium text-accent-red ml-1">{errors.title}</p>
                )}
              </div>

              {/* Instructions */}
              <MarkdownEditor
                label="Instructions"
                placeholder="Give your students clear instructions..."
                value={formData.instructions}
                onChange={(val) => setFormData({ ...formData, instructions: val })}
                error={errors.instructions}
              />

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary ml-0.5">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                  <Input
                    type="datetime-local"
                    className="pl-9 h-10"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {!isEdit && (
                <>
                  {/* Max Score */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-primary ml-0.5">
                      Max Score <span className="text-accent-red">*</span>
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        placeholder="Enter max score (5, 10, 25, 50, 100)"
                        className={`pl-9 h-10 ${errors.maxScore ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                        value={formData.maxScore}
                        onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.maxScore && (
                      <p className="text-[10px] font-medium text-accent-red ml-1">{errors.maxScore}</p>
                    )}
                  </div>

                  {/* Number of Attempts */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-primary ml-0.5">
                      Attempts <span className="text-accent-red">*</span>
                    </label>
                    <div className="relative">
                      <RotateCcw className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
                      <Input
                        type="number"
                        min={1}
                        max={3}
                        placeholder="Enter attempts (1–3)"
                        className={`pl-9 h-10 ${errors.numberOfAttempts ? "border-accent-red focus:ring-accent-red/20" : ""}`}
                        value={formData.numberOfAttempts}
                        onChange={(e) => setFormData({ ...formData, numberOfAttempts: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.numberOfAttempts && (
                      <p className="text-[10px] font-medium text-accent-red ml-1">{errors.numberOfAttempts}</p>
                    )}
                  </div>
                </>
              )}

              {/* Attachment (Create only) */}
              {!isEdit && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary ml-0.5">
                    Resource Attachment (PDF)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <div 
                    onClick={() => !isSubmitting && fileInputRef.current?.click()}
                    className={`
                      relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-card transition-all
                      ${isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                      ${selectedFile ? "border-accent-blue bg-accent-blue/5" : "border-border-subtle hover:border-text-secondary"}
                      ${errors.file ? "border-accent-red bg-accent-red/5" : ""}
                    `}
                  >
                    {!selectedFile ? (
                      <>
                        <Upload className="size-6 text-text-secondary mb-2" />
                        <p className="text-xs font-medium text-text-primary">Click to upload resource PDF</p>
                        <p className="text-[10px] text-text-secondary mt-1">Optional • Max size: 5MB</p>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 w-full">
                        <div className="size-10 bg-bg-primary shadow-border rounded-button flex items-center justify-center text-accent-blue shrink-0">
                          <File className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-text-primary truncate">{selectedFile.name}</p>
                          <p className="text-[10px] text-text-secondary truncate uppercase">
                            {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • PDF
                          </p>
                        </div>
                        {!isSubmitting && (
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="size-6 flex items-center justify-center rounded-full hover:bg-bg-secondary text-text-secondary transition-colors"
                          >
                            <X className="size-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.file && (
                    <p className="text-[10px] font-medium text-accent-red ml-1 mt-1">{errors.file}</p>
                  )}
                </div>
              )}
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
