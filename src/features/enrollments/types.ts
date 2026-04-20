export type EnrollmentStatus = "pending" | "in-progress" | "suspended" | "dropped" | "completed";
export type UserRole = "admin" | "trainer" | "trainee";

export type Enrollment = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  expireAt?: string | null;
  status: EnrollmentStatus;
};
