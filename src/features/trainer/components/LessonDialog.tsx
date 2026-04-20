import React, { useState, useEffect, useRef } from "react";
import { X, Layout, AlignLeft, Upload, File, Film, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { Lesson, LessonMimeType } from "@/types";
import { db } from "@/db";

interface LessonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  lesson?: Lesson | null;
  onSuccess: () => void;
}

export function LessonDialog({ isOpen, onClose, moduleId, lesson, onSuccess }: LessonDialogProps) {
  const { toast } = useToast();
  const isEdit = !!lesson;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form when lesson changes or opens
  useEffect(() => {
    if (isOpen) {
      if (lesson) {
        setFormData({
          title: lesson.title,
          description: lesson.description || "",
        });
      } else {
        setFormData({
          title: "",
          description: "",
        });
      }
      setSelectedFile(null);
      setErrors({});
    }
  }, [isOpen, lesson]);

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

    const validTypes: LessonMimeType[] = ["application/pdf", "video/mp4"];
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB

    const newErrors: Record<string, string> = { ...errors };
    delete newErrors.file;

    if (!validTypes.includes(file.type as LessonMimeType)) {
      newErrors.file = "Invalid file type. Only PDF and MP4 are allowed.";
    } else if (file.size > maxSize) {
      newErrors.file = "File size exceeds 2GB limit.";
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

    if (!isEdit && !selectedFile) {
      newErrors.file = "File is required";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEdit && lesson) {
        db.updateLesson(lesson.id, {
          title: formData.title,
          description: formData.description,
        });
        toast({
          type: "success",
          title: "Lesson updated successfully",
          description: `Lesson "${formData.title}" has been saved.`,
        });
      } else if (selectedFile) {
        // Extract payload as requested
        const payload = {
          filename: selectedFile.name,
          contentType: selectedFile.type as LessonMimeType,
          fileSize: selectedFile.size
        };

        db.createLesson(moduleId, {
          title: formData.title,
          description: formData.description,
          media_id: `MEDIA-${Date.now()}`, // Simulated media_id
          mime_type: payload.contentType,
          url: payload.contentType === "application/pdf" 
            ? "https://www.w3schools.com/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            : "https://www.w3schools.com/html/mov_bbb.mp4"
        });

        toast({
          type: "success",
          title: "Lesson created successfully",
          description: `Lesson "${formData.title}" has been added to the module.`,
        });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        type: "error",
        title: "Something went wrong",
        description: "Failed to save lesson. Please try again.",
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
                {isEdit ? "Edit Lesson" : "Create Lesson"}
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
                    placeholder="e.g. Setting up your Workspace"
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
                    placeholder="Briefly describe what this lesson covers..."
                    className="w-full min-h-[100px] pl-9 pr-3 py-2 bg-bg-primary shadow-border border-none rounded-button text-sm outline-none focus:ring-focus transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              {/* File Upload (Create only) */}
              {!isEdit && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary ml-0.5">
                    Resource File <span className="text-accent-red">*</span>
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.mp4"
                    onChange={handleFileChange}
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-card cursor-pointer transition-all
                      ${selectedFile ? "border-accent-blue bg-accent-blue/5" : "border-border-subtle hover:border-text-secondary"}
                      ${errors.file ? "border-accent-red bg-accent-red/5" : ""}
                    `}
                  >
                    {!selectedFile ? (
                      <>
                        <Upload className="size-6 text-text-secondary mb-2" />
                        <p className="text-xs font-medium text-text-primary">Click to upload PDF or MP4</p>
                        <p className="text-[10px] text-text-secondary mt-1">Max size: 2GB</p>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 w-full">
                        <div className="size-10 bg-bg-primary shadow-border rounded-button flex items-center justify-center text-accent-blue shrink-0">
                          {selectedFile.type.includes("video") ? <Film className="size-5" /> : <File className="size-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-text-primary truncate">{selectedFile.name}</p>
                          <p className="text-[10px] text-text-secondary truncate uppercase">
                            {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • {selectedFile.type.split("/")[1]}
                          </p>
                        </div>
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
