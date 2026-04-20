import { useState, useEffect } from "react";
import { Search, X, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Course } from "@/features/courses/types";
import { motion, AnimatePresence } from "motion/react";
import { api } from "@/lib/api-client";

interface CourseSearchSelectProps {
  onSelect: (courseId: string, courseName: string) => void;
  selectedId?: string;
  error?: string;
  disabled?: boolean;
}

export function CourseSearchSelect({ onSelect, selectedId, error, disabled }: CourseSearchSelectProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch courses when searching or opening
  useEffect(() => {
    if (!isOpen && !debouncedSearch) return;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          limit: 10,
          page: 1
        };

        if (debouncedSearch) {
          params.courseNameOrTrainerName = debouncedSearch;
        }

        const res = await api.get("list/admin/courses", { params });
        setCourses(res.data.data);
      } catch (error) {
        console.error("Failed to fetch courses in select:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearch, isOpen]);

  // Fetch selected course if only ID is provided
  useEffect(() => {
    if (selectedId && !selectedCourse) {
      const fetchSelected = async () => {
        try {
          const res = await api.get("list/admin/courses", { params: { limit: 1, courseNameOrTrainerName: selectedId } });
          if (res.data.data.length > 0) {
            setSelectedCourse(res.data.data[0]);
          }
        } catch (error) {
          console.error("Failed to fetch selected course:", error);
        }
      };
      fetchSelected();
    } else if (!selectedId) {
      setSelectedCourse(null);
    }
  }, [selectedId, selectedCourse]);

  return (
    <div className={`space-y-1.5 relative ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      <label className="text-sm font-medium text-text-primary ml-0.5">
        Course <span className="text-accent-red">*</span>
      </label>

      {selectedCourse ? (
        <div className="relative group">
          <div className="p-3 rounded-card bg-bg-secondary shadow-border flex items-center gap-3">
            <BookOpen className="size-4 text-accent-blue shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-text-primary truncate">
                {selectedCourse.title}
              </div>
              <div className="text-xs text-text-secondary truncate">
                {selectedCourse.trainerName}
              </div>
            </div>
          </div>
          {!disabled && (
            <button
              onClick={() => {
                onSelect("", "");
                setSelectedCourse(null);
              }}
              className="absolute -top-2 -right-2 size-6 bg-bg-primary shadow-card shadow-border rounded-full flex items-center justify-center text-text-secondary hover:text-accent-red transition-colors z-10"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
            <Input
              placeholder="Search course by title"
              className={`pl-9 h-10 ${error ? "border-accent-red focus:ring-accent-red/20" : ""}`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => !disabled && setIsOpen(true)}
              disabled={disabled}
            />
          </div>

          <AnimatePresence>
            {isOpen && !disabled && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-bg-primary shadow-card shadow-border rounded-card z-30 max-h-[240px] overflow-y-auto p-1 space-y-1"
                >
                  {isLoading ? (
                    <div className="p-4 text-center text-xs text-text-secondary animate-pulse">
                      Searching...
                    </div>
                  ) : courses.length > 0 ? (
                    courses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => {
                          onSelect(course.id, course.title);
                          setSelectedCourse(course);
                          setIsOpen(false);
                          setSearch("");
                        }}
                        className="p-3 rounded-card bg-bg-primary shadow-border hover:bg-bg-secondary/50 transition-all cursor-pointer flex items-center gap-3"
                      >
                        <BookOpen className="size-4 text-text-secondary shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-text-primary truncate">
                            {course.title}
                          </div>
                          <div className="text-xs text-text-secondary truncate">
                            {course.trainerName}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-text-secondary">
                      No courses found
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {error && (
        <p className="text-[10px] font-medium text-accent-red ml-1">{error}</p>
      )}
    </div>
  );
}
