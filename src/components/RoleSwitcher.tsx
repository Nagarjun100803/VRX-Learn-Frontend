import { useAuth, Role } from "@/lib/auth-context";

export function RoleSwitcher() {
  const { role, setRole } = useAuth();

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-bg-secondary rounded-button shadow-border">
      <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">
        Dev Mode
      </span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className="bg-transparent text-xs font-medium text-text-primary focus:outline-none cursor-pointer"
      >
        <option value="admin">Admin</option>
        <option value="trainer">Trainer</option>
        <option value="trainee">Trainee</option>
      </select>
    </div>
  );
}
