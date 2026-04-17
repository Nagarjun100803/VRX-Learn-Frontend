export type Course = {
  id: string;
  title: string;
  shortDescription: string | null;
  longDescription: string;
  trainerId: string;
  trainerName: string;
  noOfTrainees: number;
  createdAt: string;
};

export const MOCK_COURSES: Course[] = [
  {
    id: "C-1",
    title: "Advanced FastAPI: Building Scalable, Event-Driven Backend Systems",
    shortDescription: "Deep dive into FastAPI with async patterns, caching, and event-driven architecture.",
    longDescription: "",
    trainerId: "U-1",
    trainerName: "John Doe",
    noOfTrainees: 120,
    createdAt: "2026-04-10T00:00:00Z"
  },
  {
    id: "C-2",
    title: "Introduction to Mainframe Modernization and Legacy System Transformation",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-2",
    trainerName: "Jane Smith",
    noOfTrainees: 95,
    createdAt: "2026-04-11T00:00:00Z"
  },
  {
    id: "C-3",
    title: "System Design for Scalable Applications: From Monolith to Microservices",
    shortDescription: "Learn system design principles for high-scale distributed systems.",
    longDescription: "",
    trainerId: "U-3",
    trainerName: "Alex",
    noOfTrainees: 150,
    createdAt: "2026-04-12T00:00:00Z"
  },
  {
    id: "C-4",
    title: "Full Stack Development with React, FastAPI, and PostgreSQL",
    shortDescription: "End-to-end application development using modern stack.",
    longDescription: "",
    trainerId: "U-4",
    trainerName: "Mike",
    noOfTrainees: 80,
    createdAt: "2026-04-13T00:00:00Z"
  },
  {
    id: "C-5",
    title: "Mastering Asynchronous Programming in Python for Backend Engineers",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-5",
    trainerName: "Sara",
    noOfTrainees: 110,
    createdAt: "2026-04-14T00:00:00Z"
  },
  {
    id: "C-6",
    title: "Cloud Native Infrastructure with Kubernetes and Terraform",
    shortDescription: "Infrastructure as code and container orchestration at scale.",
    longDescription: "",
    trainerId: "U-6",
    trainerName: "John Doe",
    noOfTrainees: 175,
    createdAt: "2026-04-15T00:00:00Z"
  },
  {
    id: "C-7",
    title: "Data Engineering with Apache Spark and Delta Lake",
    shortDescription: "Building robust data pipelines for big data processing.",
    longDescription: "",
    trainerId: "U-7",
    trainerName: "Jane Smith",
    noOfTrainees: 130,
    createdAt: "2026-04-16T00:00:00Z"
  },
  {
    id: "C-8",
    title: "Machine Learning Operations (MLOps): Deploying Models to Production",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-8",
    trainerName: "Alex",
    noOfTrainees: 90,
    createdAt: "2026-04-17T00:00:00Z"
  },
  {
    id: "C-9",
    title: "Frontend Performance Optimization: Core Web Vitals and Beyond",
    shortDescription: "Make your web applications lightning fast for better user experience.",
    longDescription: "",
    trainerId: "U-9",
    trainerName: "Mike",
    noOfTrainees: 140,
    createdAt: "2026-04-18T00:00:00Z"
  },
  {
    id: "C-10",
    title: "Cybersecurity Fundamentals: Protecting Modern Web Architectures",
    shortDescription: "Essential security practices for developers and architects.",
    longDescription: "",
    trainerId: "U-10",
    trainerName: "Sara",
    noOfTrainees: 160,
    createdAt: "2026-04-19T00:00:00Z"
  },
  {
    id: "C-11",
    title: "React Server Components and the Future of Web Development",
    shortDescription: "Exploring the next generation of React architecture.",
    longDescription: "",
    trainerId: "U-1",
    trainerName: "John Doe",
    noOfTrainees: 200,
    createdAt: "2026-04-20T00:00:00Z"
  },
  {
    id: "C-12",
    title: "GraphQL API Design: Schema-First Development with Apollo",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-2",
    trainerName: "Jane Smith",
    noOfTrainees: 85,
    createdAt: "2026-04-21T00:00:00Z"
  },
  {
    id: "C-13",
    title: "DevOps for Startups: Automating Everything from Day One",
    shortDescription: "Pragmatic DevOps strategies for small and growing teams.",
    longDescription: "",
    trainerId: "U-3",
    trainerName: "Alex",
    noOfTrainees: 115,
    createdAt: "2026-04-22T00:00:00Z"
  },
  {
    id: "C-14",
    title: "Building Real-time Applications with WebSockets and Redis",
    shortDescription: "Interactive features and live updates for modern apps.",
    longDescription: "",
    trainerId: "U-4",
    trainerName: "Mike",
    noOfTrainees: 105,
    createdAt: "2026-04-23T00:00:00Z"
  },
  {
    id: "C-15",
    title: "TypeScript for Enterprise: Scalable Patterns and Advanced Types",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-5",
    trainerName: "Sara",
    noOfTrainees: 190,
    createdAt: "2026-04-24T00:00:00Z"
  },
  {
    id: "C-16",
    title: "Serverless Architectures on AWS: Lambda, S3, and DynamoDB",
    shortDescription: "Building cost-effective and scalable serverless backends.",
    longDescription: "",
    trainerId: "U-6",
    trainerName: "John Doe",
    noOfTrainees: 145,
    createdAt: "2026-04-25T00:00:00Z"
  },
  {
    id: "C-17",
    title: "UI/UX Design for Developers: Creating Intuitive Interfaces",
    shortDescription: "Design principles for engineers who want to build better products.",
    longDescription: "",
    trainerId: "U-7",
    trainerName: "Jane Smith",
    noOfTrainees: 165,
    createdAt: "2026-04-26T00:00:00Z"
  },
  {
    id: "C-18",
    title: "Testing Strategy for Modern Web Apps: Unit, Integration, and E2E",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-8",
    trainerName: "Alex",
    noOfTrainees: 75,
    createdAt: "2026-04-27T00:00:00Z"
  },
  {
    id: "C-19",
    title: "Progressive Web Apps (PWA): Bridging the Gap Between Web and Native",
    shortDescription: "Offline support, push notifications, and app-like experience.",
    longDescription: "",
    trainerId: "U-9",
    trainerName: "Mike",
    noOfTrainees: 95,
    createdAt: "2026-04-28T00:00:00Z"
  },
  {
    id: "C-20",
    title: "Elasticsearch Mastery: Building Powerful Search Engines",
    shortDescription: "Advanced indexing, querying, and performance tuning.",
    longDescription: "",
    trainerId: "U-10",
    trainerName: "Sara",
    noOfTrainees: 125,
    createdAt: "2026-04-29T00:00:00Z"
  },
  {
    id: "C-21",
    title: "Go Programming for Backend Services: Concurrency and Performance",
    shortDescription: "Building high-performance microservices with Golang.",
    longDescription: "",
    trainerId: "U-1",
    trainerName: "John Doe",
    noOfTrainees: 180,
    createdAt: "2026-04-30T00:00:00Z"
  },
  {
    id: "C-22",
    title: "Rust for Systems Programming: Safety and Speed Without Compromise",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-2",
    trainerName: "Jane Smith",
    noOfTrainees: 155,
    createdAt: "2026-05-01T00:00:00Z"
  },
  {
    id: "C-23",
    title: "Container Security: Hardening Docker and Kubernetes Environments",
    shortDescription: "Securing your containerized applications from build to runtime.",
    longDescription: "",
    trainerId: "U-3",
    trainerName: "Alex",
    noOfTrainees: 110,
    createdAt: "2026-05-02T00:00:00Z"
  },
  {
    id: "C-24",
    title: "Domain-Driven Design (DDD) in Practice: Modeling Complex Systems",
    shortDescription: "Strategic and tactical design for large-scale software projects.",
    longDescription: "",
    trainerId: "U-4",
    trainerName: "Mike",
    noOfTrainees: 135,
    createdAt: "2026-05-03T00:00:00Z"
  },
  {
    id: "C-25",
    title: "Observability and Monitoring: Prometheus, Grafana, and ELK Stack",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-5",
    trainerName: "Sara",
    noOfTrainees: 140,
    createdAt: "2026-05-04T00:00:00Z"
  },
  {
    id: "C-26",
    title: "Edge Computing with Cloudflare Workers and Vercel Edge Functions",
    shortDescription: "Running code closer to your users for ultra-low latency.",
    longDescription: "",
    trainerId: "U-6",
    trainerName: "John Doe",
    noOfTrainees: 120,
    createdAt: "2026-05-05T00:00:00Z"
  },
  {
    id: "C-27",
    title: "Building Accessible Web Applications: WCAG Compliance and Beyond",
    shortDescription: "Ensuring your software is usable by everyone, regardless of ability.",
    longDescription: "",
    trainerId: "U-7",
    trainerName: "Jane Smith",
    noOfTrainees: 150,
    createdAt: "2026-05-06T00:00:00Z"
  },
  {
    id: "C-28",
    title: "The Pragmatic Architect: Balancing Innovation and Maintenance",
    shortDescription: null,
    longDescription: "",
    trainerId: "U-8",
    trainerName: "Alex",
    noOfTrainees: 100,
    createdAt: "2026-05-07T00:00:00Z"
  },
  {
    id: "C-29",
    title: "Next.js App Router Deep Dive: Layouts, Loading, and Error States",
    shortDescription: "Mastering the new paradigm of Next.js development.",
    longDescription: "",
    trainerId: "U-9",
    trainerName: "Mike",
    noOfTrainees: 185,
    createdAt: "2026-05-08T00:00:00Z"
  },
  {
    id: "C-30",
    title: "Event Sourcing and CQRS: Building Resilient Distributed Systems",
    shortDescription: "Advanced architectural patterns for complex data requirements.",
    longDescription: "",
    trainerId: "U-10",
    trainerName: "Sara",
    noOfTrainees: 115,
    createdAt: "2026-05-09T00:00:00Z"
  }
];
