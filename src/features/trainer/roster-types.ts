import { UserRole } from "../users/types";

export interface TraineeRosterItem {
  traineeId: string;
  name: string;
  email: string;
  enrollmentDate: string;
  role: UserRole;
}

export const MOCK_TRAINEE_ROSTER: TraineeRosterItem[] = [
  { traineeId: "U-3", name: "Rohan Gupta", email: "rohan.gupta@example.com", role: "trainee", enrollmentDate: "2026-03-05" },
  { traineeId: "U-4", name: "Anjali Verma", email: "anjali.verma@example.com", role: "trainee", enrollmentDate: "2026-03-12" },
  { traineeId: "U-6", name: "Sanya Malhotra", email: "sanya.m@example.com", role: "trainee", enrollmentDate: "2026-04-16" },
  { traineeId: "U-9", name: "Amit Shah", email: "amit.shah@example.com", role: "trainee", enrollmentDate: "2026-04-01" },
  { traineeId: "U-10", name: "Kavita Devi", email: "kavita.devi@example.com", role: "trainee", enrollmentDate: "2026-04-10" },
  { traineeId: "U-12", name: "Meera Nair", email: "meera.nair@example.com", role: "trainee", enrollmentDate: "2026-04-05" },
  { traineeId: "U-13", name: "Deepak Chahar", email: "deepak.c@example.com", role: "trainee", enrollmentDate: "2026-03-20" },
  { traineeId: "U-16", name: "Tara Sutaria", email: "tara.s@example.com", role: "trainee", enrollmentDate: "2026-03-25" },
  { traineeId: "U-17", name: "Varun Dhawan", email: "varun.d@example.com", role: "trainee", enrollmentDate: "2026-04-01" },
  { traineeId: "U-20", name: "Kriti Sanon", email: "kriti.s@example.com", role: "trainee", enrollmentDate: "2026-03-28" },
  { traineeId: "U-21", name: "Ayushmann Khurrana", email: "ayushmann.k@example.com", role: "trainee", enrollmentDate: "2026-02-15" },
  { traineeId: "U-23", name: "Rajkummar Rao", email: "rajkummar.r@example.com", role: "trainee", enrollmentDate: "2026-02-20" },
  { traineeId: "U-26", name: "Katrina Kaif", email: "katrina.k@example.com", role: "trainee", enrollmentDate: "2026-01-10" },
  { traineeId: "U-27", name: "Sidharth Malhotra", email: "sidharth.m@example.com", role: "trainee", enrollmentDate: "2026-01-15" },
  { traineeId: "U-30", name: "Deepika Padukone", email: "deepika.p@example.com", role: "trainee", enrollmentDate: "2026-04-12" },
  { traineeId: "U-2", name: "Priya Sharma", email: "priya.sharma@example.com", role: "trainer", enrollmentDate: "2026-01-05" },
  { traineeId: "U-5", name: "Vikram Singh", email: "vikram.singh@example.com", role: "trainer", enrollmentDate: "2026-01-12" },
  { traineeId: "U-8", name: "Sneha Reddy", email: "sneha.reddy@example.com", role: "trainer", enrollmentDate: "2026-02-01" },
  { traineeId: "U-11", name: "Suresh Raina", email: "suresh.r@example.com", role: "trainer", enrollmentDate: "2026-02-10" },
  { traineeId: "U-15", name: "Ishaan Khatter", email: "ishaan.k@example.com", role: "trainer", enrollmentDate: "2026-03-01" },
  { traineeId: "U-18", name: "Alia Bhatt", email: "alia.b@example.com", role: "trainer", enrollmentDate: "2026-03-10" },
  { traineeId: "U-22", name: "Bhumi Pednekar", email: "bhumi.p@example.com", role: "trainer", enrollmentDate: "2026-04-01" },
  { traineeId: "U-1", name: "Arjun Kumar", email: "arjun.kumar@example.com", role: "admin", enrollmentDate: "2025-12-15" },
  { traineeId: "U-7", name: "Rahul Dravid", email: "rahul.d@example.com", role: "admin", enrollmentDate: "2025-12-20" },
  { traineeId: "U-14", name: "Pooja Hegde", email: "pooja.h@example.com", role: "admin", enrollmentDate: "2026-01-05" },
  { traineeId: "U-19", name: "Ranbir Kapoor", email: "ranbir.k@example.com", role: "admin", enrollmentDate: "2026-01-12" },
  { traineeId: "U-24", name: "Taapsee Pannu", email: "taapsee.p@example.com", role: "admin", enrollmentDate: "2026-02-01" },
  { traineeId: "U-29", name: "Shah Rukh Khan", email: "srk@example.com", role: "admin", enrollmentDate: "2026-02-10" },
  { traineeId: "U-25", name: "Vicky Kaushal", email: "vicky.k@example.com", role: "trainer", enrollmentDate: "2026-03-15" },
  { traineeId: "U-28", name: "Kiara Advani", email: "kiara.a@example.com", role: "trainer", enrollmentDate: "2026-03-20" }
];
