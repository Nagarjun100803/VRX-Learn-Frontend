import { useState, useEffect, useCallback } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnrollmentFilters } from "../components/EnrollmentFilters";
import { EnrollmentList } from "../components/EnrollmentList";
import { Pagination } from "../components/Pagination";
import { Enrollment } from "../types";
import { EnrollmentFormDialog } from "../components/EnrollmentFormDialog";
import { api } from "@/lib/api-client";

export default function EnrollmentsPage() {
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | undefined>(undefined);

  // Data State
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1); // ✅ STRICT 1-based
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

  // Fetch Logic (CRITICAL)
  const fetchEnrollments = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: any = {
        page: currentPage,
        limit,
      };

      // 🔥 SEARCH overrides ALL filters
      if (debouncedSearch) {
        params.nameOrEmail = debouncedSearch;
      } else {
        if (status !== "all") params.status = status;
        if (role !== "all") params.role = role;

        // Sorting mapping
        if (sortBy === "newest") params.sortByEnrollmentDate = "desc";
        if (sortBy === "oldest") params.sortByEnrollmentDate = "asc";
        if (sortBy === "course-asc") params.sortByCourseName = "asc";
        if (sortBy === "course-desc") params.sortByCourseName = "desc";
      }

      const res = await api.get("list/admin/enrollments", { params });

      setEnrollments(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);

      // ❌ DO NOT DO THIS:
      // setCurrentPage(res.data.page);

    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, status, role, sortBy, currentPage, limit]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setRole("all");
    setStatus("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleCreateEnrollment = () => {
    setDialogMode("create");
    setSelectedEnrollment(undefined);
    setIsDialogOpen(true);
  };

  const handleEditEnrollment = (enrollment: Enrollment) => {
    setDialogMode("edit");
    setSelectedEnrollment(enrollment);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary font-sans selection:bg-accent-blue/10">
      <main className="container-vercel py-12 space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <header className="space-y-1">
            <h1 className="text-section font-semibold tracking-tight-lg">
              Enrollments Management
            </h1>
            <p className="text-text-secondary text-body">
              Monitor course progress and manage trainee access.
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
              aria-label="New Enrollment"
              onClick={handleCreateEnrollment}
            >
              <Plus className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">New Enrollment</span>
            </Button>
          </div>
        </div>

        <section className="space-y-6">
          <EnrollmentFilters
            search={search}
            role={role}
            status={status}
            sortBy={sortBy}
            onSearchChange={handleSearchChange}
            onRoleChange={(val) => { setRole(val); setCurrentPage(1); }}
            onStatusChange={(val) => { setStatus(val); setCurrentPage(1); }}
            onSortChange={(val) => { setSortBy(val); setCurrentPage(1); }}
          />

          <div className="space-y-0 relative">
            {isLoading && (
               <div className="absolute inset-0 bg-bg-primary/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-card">
                 <div className="size-6 border-2 border-border-subtle border-t-text-primary rounded-full animate-spin" />
               </div>
            )}
            <EnrollmentList 
              enrollments={enrollments} 
              onClearFilters={handleClearFilters} 
              onEdit={handleEditEnrollment}
            />
            {totalItems > 0 && (
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

      <EnrollmentFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mode={dialogMode}
        initialData={selectedEnrollment ? {
          id: selectedEnrollment.id,
          userId: selectedEnrollment.userId,
          name: selectedEnrollment.name,
          email: selectedEnrollment.email,
          role: selectedEnrollment.role,
          courseId: selectedEnrollment.courseId,
          courseName: selectedEnrollment.courseName,
          status: selectedEnrollment.status,
          expireAt: selectedEnrollment.expireAt,
        } : undefined}
      />
    </div>
  );
}
