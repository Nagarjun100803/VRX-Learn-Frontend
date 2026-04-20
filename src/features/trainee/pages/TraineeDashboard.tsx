import { EnrolledCourses } from "../components/EnrolledCourses";
import { db } from "@/db";

export default function TraineeDashboard() {
  const courses = db.getTraineeCourses();

  return (
    <main className="container-vercel py-12 space-y-12 min-h-screen">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-section font-semibold tracking-tight-lg">
          Trainee Dashboard
        </h1>
        <p className="text-text-secondary text-body max-w-2xl">
          Track your learning progress and manage your enrolled courses.
        </p>
      </header>

      {/* Greeting */}
      <section className="space-y-1">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">
          Hello Trainee
        </h2>
        <p className="text-sm text-text-secondary">
          Keep learning. Small progress every day adds up.
        </p>
      </section>

      {/* Courses */}
      <section>
        <EnrolledCourses courses={courses} />
      </section>
    </main>
  );
}
