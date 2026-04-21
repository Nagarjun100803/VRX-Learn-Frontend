import { useState, useEffect, useCallback } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoursesFilters } from "../components/CoursesFilters";
import { CoursesList } from "../components/CoursesList";
import { Pagination } from "../components/Pagination";
import { CreateCourseDialog } from "../components/CreateCourseDialog";
import { Course } from "../types";
import { api } from "@/lib/api-client";
import { CoursesTableSkeleton } from "@/features/admin/components/TableSkeletons";

export default function CoursesPage() {
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(undefined);

  // Data State
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1); // ✅ ALWAYS 1-based
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search (STRICT 400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Logic
  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: any = {
        page: currentPage,
        limit,
      };

      // 🔥 PRIORITY: SEARCH OVERRIDES ALL FILTERS
      if (debouncedSearch) {
        params.courseNameOrTrainerName = debouncedSearch;
      } else {
        // Sorting mapping
        if (sortBy === "newest") params.sortByCreatedAt = "desc";
        if (sortBy === "oldest") params.sortByCreatedAt = "asc";
        if (sortBy === "name-asc") params.sortByCourseName = "asc";
        if (sortBy === "name-desc") params.sortByCourseName = "desc";
        if (sortBy === "trainees-asc") params.sortByNoOfTrainees = "asc";
        if (sortBy === "trainees-desc") params.sortByNoOfTrainees = "desc";
      }

      const res = await api.get("list/admin/courses", { params });

      setCourses(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);

      // ❌ DO NOT DO THIS:
      // setCurrentPage(res.data.page);

    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, sortBy, currentPage, limit]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleCreateCourse = () => {
    setDialogMode("create");
    setSelectedCourse(undefined);
    setIsDialogOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setDialogMode("edit");
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary font-sans selection:bg-accent-blue/10">
      <main className="container-vercel py-12 space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <header className="space-y-1">
            <h1 className="text-section font-semibold tracking-tight-lg">
              Courses Management
            </h1>
            <p className="text-text-secondary text-body">
              Create, manage, and monitor your learning content.
            </p>
          </header>
          
          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              variant="ghost" 
              className="h-9 px-3 sm:px-4 shadow-border" 
              aria-label="Export CSV"
            >
              <Download className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button 
              className="h-9 px-3 sm:px-4 bg-text-primary text-bg-primary hover:bg-text-primary/90" 
              aria-label="New Course"
              onClick={handleCreateCourse}
            >
              <Plus className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">New Course</span>
            </Button>
          </div>
        </div>

        <section className="space-y-6">
          <CoursesFilters
            search={search}
            sortBy={sortBy}
            onSearchChange={handleSearchChange}
            onSortChange={(val) => { setSortBy(val); setCurrentPage(1); }}
          />

          <div className="space-y-0 relative">
            {isLoading ? (
              <CoursesTableSkeleton rows={limit} />
            ) : (
              <CoursesList 
                courses={courses} 
                onClearFilters={handleClearFilters} 
                onEdit={handleEditCourse}
              />
            )}
            {totalItems > 0 && !isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                limit={limit}
                onPageChange={(p) => setCurrentPage(p)}
                onLimitChange={(val) => {
                  setLimit(val);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </section>
      </main>

      <CreateCourseDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSuccess={fetchCourses}
        mode={dialogMode}
        initialData={selectedCourse ? {
          id: selectedCourse.id,
          title: selectedCourse.title,
          shortDescription: selectedCourse.shortDescription,
          longDescription: selectedCourse.longDescription,
          trainerId: selectedCourse.trainerId,
          trainerName: selectedCourse.trainerName,
        } : undefined}
      />
    </div>
  );
}
