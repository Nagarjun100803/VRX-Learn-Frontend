import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserRole, User } from "@/features/users/types";
import { UserCard } from "./UserCard";
import { motion, AnimatePresence } from "motion/react";
import { api } from "@/lib/api-client";

interface UserSearchSelectProps {
  onSelect: (userId: string, userName: string) => void;
  selectedId?: string;
  error?: string;
  disabled?: boolean;
  role?: UserRole | "all";
  label?: string;
}

export function UserSearchSelect({ 
  onSelect, 
  selectedId, 
  error, 
  disabled, 
  role = "trainer",
  label = "Trainer"
}: UserSearchSelectProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch users when searching or opening
  useEffect(() => {
    if (!isOpen && !debouncedSearch) return;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          limit: 10,
          page: 1
        };

        if (debouncedSearch) {
          params.nameOrEmail = debouncedSearch;
        } else if (role !== "all") {
          params.role = role;
        }

        const res = await api.get("list/admin/users", { params });
        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users in select:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch, isOpen, role]);

  // Fetch selected user if only ID is provided
  useEffect(() => {
    if (selectedId && !selectedUser) {
      const fetchSelected = async () => {
        try {
          // We don't have a single user fetch yet, so we query by id (assuming nameOrEmail can handle ids or just filter list)
          // For now, let's just try to find it in the list or just leave it blank if not found
          const res = await api.get("list/admin/users", { params: { limit: 1, nameOrEmail: selectedId } });
          if (res.data.data.length > 0) {
            setSelectedUser(res.data.data[0]);
          }
        } catch (error) {
          console.error("Failed to fetch selected user:", error);
        }
      };
      fetchSelected();
    } else if (!selectedId) {
      setSelectedUser(null);
    }
  }, [selectedId, selectedUser]);

  return (
    <div className={`space-y-1.5 relative ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      <label className="text-sm font-medium text-text-primary ml-0.5">
        {label} <span className="text-accent-red">*</span>
      </label>

      {selectedUser ? (
        <div className="relative group">
          <UserCard
            name={selectedUser.name}
            email={selectedUser.email}
            role={selectedUser.role}
            selected
          />
          {!disabled && (
            <button
              onClick={() => {
                onSelect("", "");
                setSelectedUser(null);
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
              placeholder={`Search ${role === "all" ? "user" : role} by name or email`}
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
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        onClick={() => {
                          onSelect(user.id, user.name);
                          setSelectedUser(user);
                          setIsOpen(false);
                          setSearch("");
                        }}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-text-secondary">
                      No {role === "all" ? "users" : role + "s"} found
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
