export type EnrollmentStatus = "pending" | "in-progress" | "suspended" | "dropped" | "completed";
export type UserRole = "admin" | "trainer" | "trainee";

export type Enrollment = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  courseName: string;
  enrollmentDate: string;
  expireAt?: string | null;
  status: EnrollmentStatus;
};

export const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@vrxlearn.com",
    role: "trainee",
    courseName: "Advanced FastAPI: Building Scalable Backend Systems",
    enrollmentDate: "2026-04-10T00:00:00Z",
    expireAt: "2026-07-10T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@vrxlearn.com",
    role: "trainer",
    courseName: "Introduction to Mainframe Modernization and Legacy Systems",
    enrollmentDate: "2026-04-11T00:00:00Z",
    expireAt: null,
    status: "pending"
  },
  {
    id: "3",
    name: "Robert Brown",
    email: "robert@vrxlearn.com",
    role: "trainee",
    courseName: "System Design for Scalable Applications: From Monolith to Microservices",
    enrollmentDate: "2026-04-12T00:00:00Z",
    expireAt: "2026-10-12T00:00:00Z",
    status: "completed"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@vrxlearn.com",
    role: "trainee",
    courseName: "Full Stack Development with React, FastAPI, and PostgreSQL",
    enrollmentDate: "2026-04-13T00:00:00Z",
    expireAt: "2026-07-13T00:00:00Z",
    status: "suspended"
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@vrxlearn.com",
    role: "trainer",
    courseName: "Mastering Asynchronous Programming in Python for Backend Engineers",
    enrollmentDate: "2026-04-14T00:00:00Z",
    expireAt: null,
    status: "in-progress"
  },
  {
    id: "6",
    name: "Sarah Miller",
    email: "sarah@vrxlearn.com",
    role: "trainee",
    courseName: "Cloud Native Infrastructure with Kubernetes and Terraform",
    enrollmentDate: "2026-04-15T00:00:00Z",
    expireAt: "2026-08-15T00:00:00Z",
    status: "dropped"
  },
  {
    id: "7",
    name: "David Taylor",
    email: "david@vrxlearn.com",
    role: "trainee",
    courseName: "Data Engineering with Apache Spark and Delta Lake",
    enrollmentDate: "2026-04-16T00:00:00Z",
    expireAt: "2026-09-16T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "8",
    name: "Jessica Anderson",
    email: "jessica@vrxlearn.com",
    role: "admin",
    courseName: "Machine Learning Operations (MLOps): Deploying Models to Production",
    enrollmentDate: "2026-04-17T00:00:00Z",
    expireAt: null,
    status: "completed"
  },
  {
    id: "9",
    name: "Christopher Thomas",
    email: "chris@vrxlearn.com",
    role: "trainee",
    courseName: "Frontend Performance Optimization: Core Web Vitals and Beyond",
    enrollmentDate: "2026-04-18T00:00:00Z",
    expireAt: "2026-07-18T00:00:00Z",
    status: "pending"
  },
  {
    id: "10",
    name: "Ashley Jackson",
    email: "ashley@vrxlearn.com",
    role: "trainee",
    courseName: "Cybersecurity Fundamentals: Protecting Modern Web Architectures",
    enrollmentDate: "2026-04-19T00:00:00Z",
    expireAt: "2026-12-19T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "11",
    name: "Matthew White",
    email: "matthew@vrxlearn.com",
    role: "trainee",
    courseName: "React Server Components and the Future of Web Development",
    enrollmentDate: "2026-04-20T00:00:00Z",
    expireAt: "2026-08-20T00:00:00Z",
    status: "completed"
  },
  {
    id: "12",
    name: "Olivia Harris",
    email: "olivia@vrxlearn.com",
    role: "trainer",
    courseName: "GraphQL API Design: Schema-First Development with Apollo",
    enrollmentDate: "2026-04-21T00:00:00Z",
    expireAt: null,
    status: "in-progress"
  },
  {
    id: "13",
    name: "Daniel Martin",
    email: "daniel@vrxlearn.com",
    role: "trainee",
    courseName: "DevOps for Startups: Automating Everything from Day One",
    enrollmentDate: "2026-04-22T00:00:00Z",
    expireAt: "2026-07-22T00:00:00Z",
    status: "suspended"
  },
  {
    id: "14",
    name: "Sophia Thompson",
    email: "sophia@vrxlearn.com",
    role: "trainee",
    courseName: "Building Real-time Applications with WebSockets and Redis",
    enrollmentDate: "2026-04-23T00:00:00Z",
    expireAt: "2026-09-23T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "15",
    name: "James Garcia",
    email: "james@vrxlearn.com",
    role: "trainee",
    courseName: "TypeScript for Enterprise: Scalable Patterns and Advanced Types",
    enrollmentDate: "2026-04-24T00:00:00Z",
    expireAt: "2026-10-24T00:00:00Z",
    status: "completed"
  },
  {
    id: "16",
    name: "Isabella Martinez",
    email: "isabella@vrxlearn.com",
    role: "trainee",
    courseName: "Serverless Architectures on AWS: Lambda, S3, and DynamoDB",
    enrollmentDate: "2026-04-25T00:00:00Z",
    expireAt: "2026-08-25T00:00:00Z",
    status: "pending"
  },
  {
    id: "17",
    name: "Joshua Robinson",
    email: "joshua@vrxlearn.com",
    role: "trainer",
    courseName: "UI/UX Design for Developers: Creating Intuitive Interfaces",
    enrollmentDate: "2026-04-26T00:00:00Z",
    expireAt: null,
    status: "in-progress"
  },
  {
    id: "18",
    name: "Mia Clark",
    email: "mia@vrxlearn.com",
    role: "trainee",
    courseName: "Testing Strategy for Modern Web Apps: Unit, Integration, and E2E",
    enrollmentDate: "2026-04-27T00:00:00Z",
    expireAt: "2026-07-27T00:00:00Z",
    status: "dropped"
  },
  {
    id: "19",
    name: "Andrew Rodriguez",
    email: "andrew@vrxlearn.com",
    role: "trainee",
    courseName: "Progressive Web Apps (PWA): Bridging the Gap Between Web and Native",
    enrollmentDate: "2026-04-28T00:00:00Z",
    expireAt: "2026-11-28T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "20",
    name: "Charlotte Lewis",
    email: "charlotte@vrxlearn.com",
    role: "trainee",
    courseName: "Elasticsearch Mastery: Building Powerful Search Engines",
    enrollmentDate: "2026-04-29T00:00:00Z",
    expireAt: "2026-08-29T00:00:00Z",
    status: "completed"
  },
  {
    id: "21",
    name: "Ethan Lee",
    email: "ethan@vrxlearn.com",
    role: "trainee",
    courseName: "Go Programming for Backend Services: Concurrency and Performance",
    enrollmentDate: "2026-04-30T00:00:00Z",
    expireAt: "2026-09-30T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "22",
    name: "Amelia Walker",
    email: "amelia@vrxlearn.com",
    role: "trainer",
    courseName: "Rust for Systems Programming: Safety and Speed Without Compromise",
    enrollmentDate: "2026-05-01T00:00:00Z",
    expireAt: null,
    status: "pending"
  },
  {
    id: "23",
    name: "Alexander Hall",
    email: "alex@vrxlearn.com",
    role: "trainee",
    courseName: "Container Security: Hardening Docker and Kubernetes Environments",
    enrollmentDate: "2026-05-02T00:00:00Z",
    expireAt: "2026-08-02T00:00:00Z",
    status: "suspended"
  },
  {
    id: "24",
    name: "Madison Allen",
    email: "madison@vrxlearn.com",
    role: "trainee",
    courseName: "Domain-Driven Design (DDD) in Practice: Modeling Complex Systems",
    enrollmentDate: "2026-05-03T00:00:00Z",
    expireAt: "2026-11-03T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "25",
    name: "William Young",
    email: "william@vrxlearn.com",
    role: "trainee",
    courseName: "Observability and Monitoring: Prometheus, Grafana, and ELK Stack",
    enrollmentDate: "2026-05-04T00:00:00Z",
    expireAt: "2026-08-04T00:00:00Z",
    status: "completed"
  },
  {
    id: "26",
    name: "Abigail King",
    email: "abigail@vrxlearn.com",
    role: "trainee",
    courseName: "Edge Computing with Cloudflare Workers and Vercel Edge Functions",
    enrollmentDate: "2026-05-05T00:00:00Z",
    expireAt: "2026-09-05T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "27",
    name: "Ryan Wright",
    email: "ryan@vrxlearn.com",
    role: "trainee",
    courseName: "Building Accessible Web Applications: WCAG Compliance and Beyond",
    enrollmentDate: "2026-05-06T00:00:00Z",
    expireAt: "2026-10-06T00:00:00Z",
    status: "pending"
  },
  {
    id: "28",
    name: "Elizabeth Scott",
    email: "elizabeth@vrxlearn.com",
    role: "trainee",
    courseName: "The Pragmatic Architect: Balancing Innovation and Maintenance",
    enrollmentDate: "2026-05-07T00:00:00Z",
    expireAt: "2026-08-07T00:00:00Z",
    status: "dropped"
  },
  {
    id: "29",
    name: "Nathan Green",
    email: "nathan@vrxlearn.com",
    role: "trainee",
    courseName: "Next.js App Router Deep Dive: Layouts, Loading, and Error States",
    enrollmentDate: "2026-05-08T00:00:00Z",
    expireAt: "2026-12-08T00:00:00Z",
    status: "in-progress"
  },
  {
    id: "30",
    name: "Grace Baker",
    email: "grace@vrxlearn.com",
    role: "trainee",
    courseName: "Event Sourcing and CQRS: Building Resilient Distributed Systems",
    enrollmentDate: "2026-05-09T00:00:00Z",
    expireAt: "2026-11-09T00:00:00Z",
    status: "completed"
  }
];
