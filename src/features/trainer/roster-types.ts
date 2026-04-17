import { UserRole } from "../users/types";

export interface TraineeRosterItem {
  traineeId: string;
  name: string;
  email: string;
  enrollmentDate: string;
  role: UserRole;
}

export const MOCK_TRAINEE_ROSTER: TraineeRosterItem[] = [
  { traineeId: "t1", name: "Rohan Gupta", email: "rohan.gupta@example.com", role: "trainee", enrollmentDate: "2026-03-05" },
  { traineeId: "t2", name: "Anjali Verma", email: "anjali.verma@example.com", role: "trainee", enrollmentDate: "2026-03-12" },
  { traineeId: "t3", name: "Sanya Malhotra", email: "sanya.m@example.com", role: "trainee", enrollmentDate: "2026-04-16" },
  { traineeId: "t4", name: "Amit Shah", email: "amit.shah@example.com", role: "trainee", enrollmentDate: "2026-04-01" },
  { traineeId: "t5", name: "Kavita Devi", email: "kavita.devi@example.com", role: "trainee", enrollmentDate: "2026-04-10" },
  { traineeId: "t6", name: "Meera Nair", email: "meera.nair@example.com", role: "trainee", enrollmentDate: "2026-04-05" },
  { traineeId: "t7", name: "Deepak Chahar", email: "deepak.c@example.com", role: "trainee", enrollmentDate: "2026-03-20" },
  { traineeId: "t8", name: "Tara Sutaria", email: "tara.s@example.com", role: "trainee", enrollmentDate: "2026-03-25" },
  { traineeId: "t9", name: "Varun Dhawan", email: "varun.d@example.com", role: "trainee", enrollmentDate: "2026-04-01" },
  { traineeId: "t10", name: "Kriti Sanon", email: "kriti.s@example.com", role: "trainee", enrollmentDate: "2026-03-28" },
  { traineeId: "t11", name: "Ayushmann Khurrana", email: "ayushmann.k@example.com", role: "trainee", enrollmentDate: "2026-02-15" },
  { traineeId: "t12", name: "Rajkummar Rao", email: "rajkummar.r@example.com", role: "trainee", enrollmentDate: "2026-02-20" },
  { traineeId: "t13", name: "Katrina Kaif", email: "katrina.k@example.com", role: "trainee", enrollmentDate: "2026-01-10" },
  { traineeId: "t14", name: "Sidharth Malhotra", email: "sidharth.m@example.com", role: "trainee", enrollmentDate: "2026-01-15" },
  { traineeId: "t15", name: "Deepika Padukone", email: "deepika.p@example.com", role: "trainee", enrollmentDate: "2026-04-12" },
  { traineeId: "t16", name: "Priya Sharma", email: "priya.sharma@example.com", role: "trainer", enrollmentDate: "2026-01-05" },
  { traineeId: "t17", name: "Vikram Singh", email: "vikram.singh@example.com", role: "trainer", enrollmentDate: "2026-01-12" },
  { traineeId: "t18", name: "Sneha Reddy", email: "sneha.reddy@example.com", role: "trainer", enrollmentDate: "2026-02-01" },
  { traineeId: "t19", name: "Suresh Raina", email: "suresh.r@example.com", role: "trainer", enrollmentDate: "2026-02-10" },
  { traineeId: "t20", name: "Ishaan Khatter", email: "ishaan.k@example.com", role: "trainer", enrollmentDate: "2026-03-01" },
  { traineeId: "t21", name: "Alia Bhatt", email: "alia.b@example.com", role: "trainer", enrollmentDate: "2026-03-10" },
  { traineeId: "t22", name: "Bhumi Pednekar", email: "bhumi.p@example.com", role: "trainer", enrollmentDate: "2026-04-01" },
  { traineeId: "t23", name: "Arjun Kumar", email: "arjun.kumar@example.com", role: "admin", enrollmentDate: "2025-12-15" },
  { traineeId: "t24", name: "Rahul Dravid", email: "rahul.d@example.com", role: "admin", enrollmentDate: "2025-12-20" },
  { traineeId: "t25", name: "Pooja Hegde", email: "pooja.h@example.com", role: "admin", enrollmentDate: "2026-01-05" },
  { traineeId: "t26", name: "Ranbir Kapoor", email: "ranbir.k@example.com", role: "admin", enrollmentDate: "2026-01-12" },
  { traineeId: "t27", name: "Taapsee Pannu", email: "taapsee.p@example.com", role: "admin", enrollmentDate: "2026-02-01" },
  { traineeId: "t28", name: "Shah Rukh Khan", email: "srk@example.com", role: "admin", enrollmentDate: "2026-02-10" },
  { traineeId: "t29", name: "Vicky Kaushal", email: "vicky.k@example.com", role: "trainer", enrollmentDate: "2026-03-15" },
  { traineeId: "t30", name: "Kiara Advani", email: "kiara.a@example.com", role: "trainer", enrollmentDate: "2026-03-20" }
];
