import { TraineeRosterItem } from "../roster-types";
import { UserRole } from "../../users/types";
import { Button } from "@/components/ui/button";

interface TraineeListProps {
  trainees: TraineeRosterItem[];
  onClearFilters: () => void;
}

export function TraineeList({ trainees, onClearFilters }: TraineeListProps) {
  if (trainees.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 bg-bg-primary shadow-border rounded-card">
        <div className="size-16 bg-bg-secondary rounded-full flex items-center justify-center">
          <svg className="size-8 text-text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0zM9 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-text-primary tracking-tight">No trainees found</h3>
          <p className="text-sm text-text-secondary max-w-[320px] mx-auto">
            Try adjusting your filters or search to find what you're looking for.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="h-9 px-4 shadow-border"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto bg-bg-primary shadow-border rounded-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-secondary/30">
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Email</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Enrollment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {trainees.map((trainee) => (
              <tr key={trainee.traineeId} className="hover:bg-bg-secondary/30 transition-colors group">
                <td className="px-6 py-4 text-sm font-semibold text-text-primary">{trainee.name}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{trainee.email}</td>
                <td className="px-6 py-4">
                  <RoleBadge role={trainee.role} />
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                  {new Date(trainee.enrollmentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {trainees.map((trainee) => (
          <div key={trainee.traineeId} className="p-4 bg-bg-primary shadow-border rounded-card space-y-4">
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1 min-w-0">
                <h3 className="text-sm font-bold text-text-primary truncate">{trainee.name}</h3>
                <p className="text-xs text-text-secondary truncate">{trainee.email}</p>
              </div>
              <RoleBadge role={trainee.role} />
            </div>
            
            <div className="pt-4 border-t border-border-subtle flex justify-between items-center text-[10px] text-text-secondary uppercase font-bold tracking-wider">
              <span>Enrollment Date</span>
              <span className="font-mono text-[11px] lowercase text-text-primary">
                {new Date(trainee.enrollmentDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const styles = {
    admin: "bg-accent-red/10 text-accent-red border-accent-red/20",
    trainer: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    trainee: "bg-bg-secondary text-text-secondary border-border-subtle",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[role]}`}>
      {role}
    </span>
  );
}
