export type UserRole = "admin" | "trainer" | "trainee";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string | null;
  createdAt: string;
  status: "active";
};
