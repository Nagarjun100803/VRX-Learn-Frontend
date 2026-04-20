import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "../types";

interface UserCardProps {
  user: User;
}

const roleStyles = {
  admin: "bg-bg-secondary text-text-primary shadow-border",
  trainer: "bg-accent-blue/10 text-accent-blue shadow-border",
  trainee: "bg-bg-secondary text-text-secondary shadow-border",
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="md:hidden p-4 space-y-4 hover:bg-bg-secondary transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="font-semibold text-text-primary truncate">{user.name}</div>
          <div className="text-text-secondary text-xs truncate">{user.email}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="size-9 text-text-secondary hover:text-text-primary">
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-9 text-text-secondary hover:text-accent-red">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className={`capitalize font-medium text-[10px] px-2 py-0 h-5 ${roleStyles[user.role]}`}>
          {user.role}
        </Badge>
        <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 shadow-border text-[10px] px-2 py-0 h-5">
          Active
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Last Login</div>
          <div className="text-xs text-text-primary">{formatDate(user.lastLogin)}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Created At</div>
          <div className="text-xs text-text-primary">{formatDate(user.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
