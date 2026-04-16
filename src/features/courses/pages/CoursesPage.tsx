import { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoursesFilters } from "../components/CoursesFilters";
import { CoursesList } from "../components/CoursesList";
import { Pagination } from "../components/Pagination";
import { MOCK_COURSES, Course } from "../types";

export default function CoursesPage() {
  // Filter States
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filtering & Sorting Logic
  const filteredCourses = useMemo(() => {
    let result = [...MOCK_COURSES];

    // Search (title + trainer)
    if (search) {
      const term = search.toLowerCase();
      return result.filter(
        (c) => 
          c.title.toLowerCase().includes(term) || 
          c.trainerName.toLowerCase().includes(term)
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "trainees-asc":
          return a.noOfTrainees - b.noOfTrainees;
        case "trainees-desc":
          return b.noOfTrainees - a.noOfTrainees;
        default:
          return 0;
      }
    });

    return result;
  }, [search, sortBy]);

  // Paginated Data
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (val) {
      setSortBy("name-asc");
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSortBy("name-asc");
    setCurrentPage(1);
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
              className="h-9 px-3 sm:px-4" 
              aria-label="New Course"
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

          <div className="space-y-0">
            <CoursesList courses={paginatedCourses} onClearFilters={handleClearFilters} />
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
