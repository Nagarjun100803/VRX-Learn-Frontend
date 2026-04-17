import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/features/users/types";

interface UserCardProps {
  name: string;
  email: string;
  role: UserRole;
  onClick?: () => void;
  selected?: boolean;
}

const roleStyles = {
  admin: "bg-text-primary/5 text-text-primary shadow-border",
  trainer: "bg-accent-blue/5 text-accent-blue shadow-border",
  trainee: "bg-text-secondary/5 text-text-secondary shadow-border",
};

export function UserCard({ name, email, role, onClick, selected }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-card transition-all cursor-pointer flex items-center justify-between gap-3
        ${selected ? "bg-bg-secondary shadow-border" : "bg-bg-primary shadow-border hover:bg-bg-secondary/50"}
      `}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-text-primary truncate">{name}</div>
        <div className="text-xs text-text-secondary truncate">{email}</div>
      </div>
      <Badge variant="secondary" className={`capitalize font-medium text-[10px] px-2 py-0 h-5 shrink-0 ${roleStyles[role]}`}>
        {role}
      </Badge>
    </div>
  );
}
