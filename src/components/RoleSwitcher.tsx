import { useAuth, Role } from "@/lib/auth-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoleSwitcher() {
  const { role, setRole } = useAuth();

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-bg-secondary rounded-button shadow-border">
      <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest px-1">
        Dev Mode
      </span>
      <Select value={role} onValueChange={(val) => setRole(val as Role)}>
        <SelectTrigger className="h-7 border-none bg-transparent shadow-none px-1 py-0 text-xs font-medium text-text-primary hover:bg-bg-primary/50 transition-colors">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent align="end" className="w-28 bg-bg-primary shadow-[var(--border-shadow)] text-text-primary">
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="trainer">Trainer</SelectItem>
          <SelectItem value="trainee">Trainee</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
