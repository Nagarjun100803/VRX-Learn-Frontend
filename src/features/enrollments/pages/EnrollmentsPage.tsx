import { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnrollmentFilters } from "../components/EnrollmentFilters";
import { EnrollmentList } from "../components/EnrollmentList";
import { Pagination } from "../components/Pagination";
import { MOCK_ENROLLMENTS, Enrollment } from "../types";

export default function EnrollmentsPage() {
  // Filter States
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filtering & Sorting Logic
  const filteredEnrollments = useMemo(() => {
    let result = [...MOCK_ENROLLMENTS];

    // Search (name/email)
    if (search) {
      const term = search.toLowerCase();
      return result.filter(
        (e) => 
          e.name.toLowerCase().includes(term) || 
          e.email.toLowerCase().includes(term)
      );
    }

    // Role Filter
    if (role !== "all") {
      result = result.filter((e) => e.role === role);
    }

    // Status Filter
    if (status !== "all") {
      result = result.filter((e) => e.status === status);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime();
        case "oldest":
          return new Date(a.enrollmentDate).getTime() - new Date(b.enrollmentDate).getTime();
        case "course-asc":
          return a.courseName.localeCompare(b.courseName);
        case "course-desc":
          return b.courseName.localeCompare(a.courseName);
        default:
          return 0;
      }
    });

    return result;
  }, [search, role, status, sortBy]);

  // Paginated Data
  const totalItems = filteredEnrollments.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedEnrollments = filteredEnrollments.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (val) {
      setRole("all");
      setStatus("all");
      setSortBy("newest");
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
    setSortBy("newest");
    setCurrentPage(1);
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
              className="h-9 px-3 sm:px-4" 
              aria-label="New Enrollment"
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

          <div className="space-y-0">
            <EnrollmentList enrollments={paginatedEnrollments} onClearFilters={handleClearFilters} />
            {totalItems > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                limit={limit}
                onPageChange={setCurrentPage}
                onLimitChange={(val) => { setLimit(val); setCurrentPage(1); }}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
