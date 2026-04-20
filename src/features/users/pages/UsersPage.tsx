import { useState, useEffect, useCallback } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsersFilters } from "../components/UsersFilters";
import { UsersList } from "../components/UsersList";
import { Pagination } from "../components/Pagination";
import { CreateUserDialog } from "../components/CreateUserDialog";
import { User } from "../types";
import { api } from "@/lib/api-client";

export default function UsersPage() {
  // Dialog State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Data State
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState("active");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Logic
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const params: any = {
        page: currentPage,
        limit,
      };

      if (debouncedSearch) {
        params.nameOrEmail = debouncedSearch;
      } else {
        if (role !== "all") {
          params.role = role;
        }

        // Map sortBy to backend parameters
        if (sortBy === "newest") params.sortByCreatedAt = "desc";
        if (sortBy === "oldest") params.sortByCreatedAt = "asc";
        if (sortBy === "name-asc") params.sortByUsername = "asc";
        if (sortBy === "name-desc") params.sortByUsername = "desc";
        // for "last-active", we'll just fall back to newest or skip
      }

      const res = await api.get("list/admin/users", { params });

      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, role, sortBy, currentPage, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
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

          <div className="space-y-0 relative">
            {isLoading && (
               <div className="absolute inset-0 bg-bg-primary/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-card">
                 <div className="size-6 border-2 border-border-subtle border-t-text-primary rounded-full animate-spin" />
               </div>
            )}
            <UsersList users={users} onClearFilters={handleClearFilters} />
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
