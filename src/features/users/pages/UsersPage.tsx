import { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsersFilters } from "../components/UsersFilters";
import { UsersList } from "../components/UsersList";
import { Pagination } from "../components/Pagination";
import { CreateUserDialog } from "../components/CreateUserDialog";
import { MOCK_USERS, User } from "../types";

export default function UsersPage() {
  // Dialog State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState("active");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filtering & Sorting Logic
  const filteredUsers = useMemo(() => {
    let result = [...MOCK_USERS];

    // Search (resets other filters if used - as per requirement)
    if (search) {
      const term = search.toLowerCase();
      return result.filter(
        (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
      );
    }

    // Role Filter
    if (role !== "all") {
      result = result.filter((u) => u.role === role);
    }

    // Status Filter (only active for now)
    if (status === "active") {
      result = result.filter((u) => u.status === "active");
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "last-active":
          if (!a.lastLogin) return 1;
          if (!b.lastLogin) return -1;
          return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [search, role, sortBy, status]);

  // Paginated Data
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (val) {
      setRole("all");
      setSortBy("newest");
      setStatus("active");
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole("all");
    setSortBy("newest");
    setStatus("active");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-bg-primary font-sans selection:bg-accent-blue/10">
      <main className="container-vercel py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <header className="space-y-1">
            <h1 className="text-section font-semibold tracking-tight-lg">
              Users Management
            </h1>
            <p className="text-text-secondary text-body">
              Manage roles, permissions, and user activity.
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
              aria-label="New User"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">New User</span>
            </Button>
          </div>
        </div>

        <section className="space-y-6">
          <UsersFilters
            search={search}
            role={role}
            sortBy={sortBy}
            status={status}
            onSearchChange={handleSearchChange}
            onRoleChange={(val) => { setRole(val); setCurrentPage(1); }}
            onSortChange={(val) => { setSortBy(val); setCurrentPage(1); }}
            onStatusChange={(val) => { setStatus(val); setCurrentPage(1); }}
          />

          <div className="space-y-0">
            <UsersList users={paginatedUsers} onClearFilters={handleClearFilters} />
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

      <CreateUserDialog 
        isOpen={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)} 
      />
    </div>
  );
}
