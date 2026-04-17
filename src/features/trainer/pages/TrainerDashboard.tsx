import { TrainerKPISection } from "../components/TrainerKPISection";
import { AssignedCourses } from "../components/AssignedCourses";
import { MOCK_TRAINER_KPIS, MOCK_TRAINER_COURSES } from "../types";

export default function TrainerDashboard() {
  return (
    <main className="container-vercel py-12 space-y-12 min-h-screen">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-section font-semibold tracking-tight-lg">
          Trainer Dashboard
        </h1>
        <p className="text-text-secondary text-body max-w-2xl">
          Overview of your teaching performance and course management.
        </p>
      </header>

      {/* KPIs */}
      <section>
        <TrainerKPISection kpis={MOCK_TRAINER_KPIS} />
      </section>

      {/* Courses */}
      <section>
        <AssignedCourses courses={MOCK_TRAINER_COURSES} />
      </section>
    </main>
  );
}
