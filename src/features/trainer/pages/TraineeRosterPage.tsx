import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { TraineeFilters } from "../components/TraineeFilters";
import { TraineeList } from "../components/TraineeList";
import { Pagination } from "../../users/components/Pagination";
import { EnrollmentFormDialog } from "../../enrollments/components/EnrollmentFormDialog";
import { MOCK_TRAINEE_ROSTER } from "../roster-types";

export function TraineeRosterPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;
  
  const isAdmin = userRole === "admin";

  // Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filter & Sort Logic
  const filteredTrainees = useMemo(() => {
    let result = [...MOCK_TRAINEE_ROSTER];

    // Search
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(term) || t.email.toLowerCase().includes(term)
      );
    }

    // Role Filter
    if (role) {
      result = result.filter((t) => t.role === role);
    }

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime();
          case "oldest":
            return new Date(a.enrollmentDate).getTime() - new Date(b.enrollmentDate).getTime();
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [search, role, sortBy]);

  // Paginated Data
  const totalItems = filteredTrainees.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedTrainees = filteredTrainees.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole(null);
    setSortBy(null);
    setCurrentPage(1);
  };

  const handleBack = () => {
    const basePath = isAdmin ? "/admin" : "/trainer";
    navigate(`${basePath}/courses/${courseId}`);
  };

  return (
    <main className="container-vercel py-12 space-y-8 min-h-screen selection:bg-accent-blue/10 font-sans">
      {/* Header section with back button */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleBack}
          className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group w-fit"
        >
          <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Course Overview
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <header className="space-y-1">
            <h1 className="text-section font-semibold tracking-tight-lg">
              Trainee Roster
            </h1>
            <p className="text-text-secondary text-body">
              Manage trainees enrolled in this course.
            </p>
          </header>
          
          {isAdmin && (
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
                onClick={() => setIsEnrollModalOpen(true)}
              >
                <Plus className="size-4 sm:mr-2" />
                <span className="hidden sm:inline">New Enrollment</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <section className="space-y-6">
        <TraineeFilters
          search={search}
          role={role}
          sortBy={sortBy}
          onSearchChange={handleSearchChange}
          onRoleChange={(val) => { setRole(val); setCurrentPage(1); }}
          onSortChange={(val) => { setSortBy(val); setCurrentPage(1); }}
        />

        <div className="space-y-0">
          <TraineeList 
            trainees={paginatedTrainees} 
            onClearFilters={handleClearFilters} 
          />
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

      {/* Reusable Dialog */}
      <EnrollmentFormDialog 
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        mode="create"
      />
    </main>
  );
}
