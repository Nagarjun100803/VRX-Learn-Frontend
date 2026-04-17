import { useState, useMemo } from "react";
import { Search, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MOCK_USERS, UserRole } from "@/features/users/types";
import { UserCard } from "./UserCard";
import { motion, AnimatePresence } from "motion/react";

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
  const [isOpen, setIsOpen] = useState(false);

  const users = useMemo(() => {
    if (role === "all") return MOCK_USERS;
    return MOCK_USERS.filter((u) => u.role === role);
  }, [role]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const term = search.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
    );
  }, [search, users]);

  const selectedUser = useMemo(() => {
    return MOCK_USERS.find((u) => u.id === selectedId);
  }, [selectedId]);

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
              onClick={() => onSelect("", "")}
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        onClick={() => {
                          onSelect(user.id, user.name);
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
