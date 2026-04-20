import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "../types";

interface UserRowProps {
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

export function UserRow({ user }: UserRowProps) {
  return (
    <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_80px] items-center p-4 hover:bg-bg-secondary transition-colors group">
      <div className="font-semibold text-text-primary truncate">{user.name}</div>
      <div className="text-text-secondary text-sm truncate">{user.email}</div>
      <div>
        <Badge variant="secondary" className={`capitalize font-medium text-[10px] px-2 py-0 h-5 ${roleStyles[user.role]}`}>
          {user.role}
        </Badge>
      </div>
      <div className="text-text-secondary text-xs">{formatDate(user.lastLogin)}</div>
      <div className="text-text-secondary text-xs">{formatDate(user.createdAt)}</div>
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="size-8 text-text-secondary hover:text-text-primary">
          <Pencil className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-text-secondary hover:text-accent-red">
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
