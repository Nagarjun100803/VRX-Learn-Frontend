import { Card } from "@/components/ui/card";
import { User } from "../types";
import { UserRow } from "./UserRow";
import { UserCard } from "./UserCard";
import { EmptyState } from "./EmptyState";

interface UsersListProps {
  users: User[];
  onClearFilters: () => void;
}

export function UsersList({ users, onClearFilters }: UsersListProps) {
  if (users.length === 0) {
    return (
      <Card className="w-full">
        <EmptyState onClearFilters={onClearFilters} />
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      {/* Table Header (Desktop) */}
      <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_80px] items-center p-4 border-b border-border-subtle bg-bg-secondary/50">
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Name</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Email</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Role</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Last Login</div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Created At</div>
        <div className="text-right text-[10px] uppercase tracking-widest font-bold text-text-secondary">Actions</div>
      </div>

      <div className="divide-y divide-border-subtle">
        {users.map((user) => (
          <div key={user.id}>
            <UserRow user={user} />
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </Card>
  );
}
