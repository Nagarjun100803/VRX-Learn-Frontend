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

export const MOCK_USERS: User[] = [
  { id: "U-1", name: "Arjun Kumar", email: "arjun.kumar@example.com", role: "admin", lastLogin: "2026-04-10T10:30:00Z", createdAt: "2025-01-15T08:00:00Z", status: "active" },
  { id: "U-2", name: "Priya Sharma", email: "priya.sharma@example.com", role: "trainer", lastLogin: "2026-04-12T14:20:00Z", createdAt: "2025-02-10T09:30:00Z", status: "active" },
  { id: "U-3", name: "Rohan Gupta", email: "rohan.gupta@example.com", role: "trainee", lastLogin: null, createdAt: "2025-03-05T11:00:00Z", status: "active" },
  { id: "U-4", name: "Anjali Verma", email: "anjali.verma@example.com", role: "trainee", lastLogin: "2026-04-15T16:45:00Z", createdAt: "2025-03-12T10:15:00Z", status: "active" },
  { id: "U-5", name: "Vikram Singh", email: "vikram.singh@example.com", role: "trainer", lastLogin: null, createdAt: "2025-04-01T14:00:00Z", status: "active" },
  { id: "U-6", name: "Sanya Malhotra", email: "sanya.m@example.com", role: "trainee", lastLogin: "2026-04-16T09:00:00Z", createdAt: "2025-04-20T15:30:00Z", status: "active" },
  { id: "U-7", name: "Rahul Dravid", email: "rahul.d@example.com", role: "admin", lastLogin: "2026-04-14T11:15:00Z", createdAt: "2025-05-05T08:45:00Z", status: "active" },
  { id: "U-8", name: "Sneha Reddy", email: "sneha.reddy@example.com", role: "trainer", lastLogin: "2026-04-13T13:40:00Z", createdAt: "2025-05-15T10:00:00Z", status: "active" },
  { id: "U-9", name: "Amit Shah", email: "amit.shah@example.com", role: "trainee", lastLogin: null, createdAt: "2025-06-01T12:00:00Z", status: "active" },
  { id: "U-10", name: "Kavita Devi", email: "kavita.devi@example.com", role: "trainee", lastLogin: "2026-04-11T15:20:00Z", createdAt: "2025-06-10T11:30:00Z", status: "active" },
  { id: "U-11", name: "Suresh Raina", email: "suresh.r@example.com", role: "trainer", lastLogin: "2026-04-09T10:00:00Z", createdAt: "2025-07-01T09:00:00Z", status: "active" },
  { id: "U-12", name: "Meera Nair", email: "meera.nair@example.com", role: "trainee", lastLogin: null, createdAt: "2025-07-15T14:15:00Z", status: "active" },
  { id: "U-13", name: "Deepak Chahar", email: "deepak.c@example.com", role: "trainee", lastLogin: "2026-04-08T16:30:00Z", createdAt: "2025-08-01T10:45:00Z", status: "active" },
  { id: "U-14", name: "Pooja Hegde", email: "pooja.h@example.com", role: "admin", lastLogin: "2026-04-07T11:00:00Z", createdAt: "2025-08-10T12:00:00Z", status: "active" },
  { id: "U-15", name: "Ishaan Khatter", email: "ishaan.k@example.com", role: "trainer", lastLogin: null, createdAt: "2025-09-01T15:00:00Z", status: "active" },
  { id: "U-16", name: "Tara Sutaria", email: "tara.s@example.com", role: "trainee", lastLogin: "2026-04-06T09:30:00Z", createdAt: "2025-09-15T11:30:00Z", status: "active" },
  { id: "U-17", name: "Varun Dhawan", email: "varun.d@example.com", role: "trainee", lastLogin: "2026-04-05T14:00:00Z", createdAt: "2025-10-01T10:00:00Z", status: "active" },
  { id: "U-18", name: "Alia Bhatt", email: "alia.b@example.com", role: "trainer", lastLogin: "2026-04-04T13:15:00Z", createdAt: "2025-10-15T09:00:00Z", status: "active" },
  { id: "U-19", name: "Ranbir Kapoor", email: "ranbir.k@example.com", role: "admin", lastLogin: null, createdAt: "2025-11-01T12:00:00Z", status: "active" },
  { id: "U-20", name: "Kriti Sanon", email: "kriti.s@example.com", role: "trainee", lastLogin: "2026-04-03T15:45:00Z", createdAt: "2025-11-15T14:30:00Z", status: "active" },
  { id: "U-21", name: "Ayushmann Khurrana", email: "ayushmann.k@example.com", role: "trainee", lastLogin: "2026-04-02T10:30:00Z", createdAt: "2025-12-01T11:00:00Z", status: "active" },
  { id: "U-22", name: "Bhumi Pednekar", email: "bhumi.p@example.com", role: "trainer", lastLogin: null, createdAt: "2025-12-15T10:15:00Z", status: "active" },
  { id: "U-23", name: "Rajkummar Rao", email: "rajkummar.r@example.com", role: "trainee", lastLogin: "2026-04-01T16:20:00Z", createdAt: "2026-01-01T09:30:00Z", status: "active" },
  { id: "U-24", name: "Taapsee Pannu", email: "taapsee.p@example.com", role: "admin", lastLogin: "2026-03-31T11:45:00Z", createdAt: "2026-01-15T12:00:00Z", status: "active" },
  { id: "U-25", name: "Vicky Kaushal", email: "vicky.k@example.com", role: "trainer", lastLogin: null, createdAt: "2026-02-01T14:00:00Z", status: "active" },
  { id: "U-26", "name": "Katrina Kaif", "email": "katrina.k@example.com", "role": "trainee", "lastLogin": "2026-03-30T09:15:00Z", "createdAt": "2026-02-15T10:30:00Z", "status": "active" },
  { id: "U-27", "name": "Sidharth Malhotra", "email": "sidharth.m@example.com", "role": "trainee", "lastLogin": "2026-03-29T13:40:00Z", "createdAt": "2026-03-01T11:00:00Z", "status": "active" },
  { id: "U-28", "name": "Kiara Advani", "email": "kiara.a@example.com", "role": "trainer", "lastLogin": "2026-03-28T15:20:00Z", "createdAt": "2026-03-10T09:45:00Z", "status": "active" },
  { id: "U-29", "name": "Shah Rukh Khan", "email": "srk@example.com", "role": "admin", "lastLogin": null, "createdAt": "2026-03-20T12:00:00Z", "status": "active" },
  { id: "U-30", "name": "Deepika Padukone", "email": "deepika.p@example.com", "role": "trainee", "lastLogin": "2026-03-27T10:00:00Z", "createdAt": "2026-03-25T14:15:00Z", "status": "active" }
];
