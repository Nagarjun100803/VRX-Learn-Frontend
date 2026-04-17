export interface TrainerKPIs {
  assignedCourses: number;
  totalLearners: number;
}

export interface TrainerCourse {
  courseId: string;
  courseName: string;
  shortDescription: string | null;
  totalTrainees: number;
  noOfModules: number;
  noOfLessons: number;
  noOfAssignments: number;
  thumbnailUrl: string | null;
}

export const MOCK_TRAINER_KPIS: TrainerKPIs = {
  assignedCourses: 8,
  totalLearners: 1240,
};

export const MOCK_TRAINER_COURSES: TrainerCourse[] = [
  {
    courseId: "c1",
    courseName: "Advanced FastAPI Architecture: Scalable Microservices",
    shortDescription: "Learn how to build, deploy and scale Python microservices using the FastAPI framework. Covers dependency injection, background tasks, and high-performance design patterns.",
    totalTrainees: 450,
    noOfModules: 12,
    noOfLessons: 36,
    noOfAssignments: 8,
    thumbnailUrl: null,
  },
  {
    courseId: "c2",
    courseName: "Introduction to Mainframe Modernization",
    shortDescription: "A strategic overview of transforming legacy systems to modern cloud architectures. Discusses refactoring vs re-hosting strategies.",
    totalTrainees: 120,
    noOfModules: 8,
    noOfLessons: 24,
    noOfAssignments: 3,
    thumbnailUrl: null,
  },
  {
    courseId: "c3",
    courseName: "Async Python in Production",
    shortDescription: "Master asynchronous programming to improve throughput and response times in your backend services.",
    totalTrainees: 215,
    noOfModules: 10,
    noOfLessons: 30,
    noOfAssignments: 5,
    thumbnailUrl: null,
  },
  {
    courseId: "c4",
    courseName: "System Design for Global Scale",
    shortDescription: "Architectural principles for systems that handle millions of users across multiple regions.",
    totalTrainees: 340,
    noOfModules: 15,
    noOfLessons: 45,
    noOfAssignments: 10,
    thumbnailUrl: null,
  },
  {
    courseId: "c5",
    courseName: "Frontend Engineering with Next.js",
    shortDescription: "Building performant web applications with React Server Components, Streaming, and PPR.",
    totalTrainees: 890,
    noOfModules: 14,
    noOfLessons: 42,
    noOfAssignments: 7,
    thumbnailUrl: null,
  },
  {
    courseId: "c6",
    courseName: "Cloud-Native Security",
    shortDescription: "Deep dive into securing containerized workloads and cloud infrastructure using modern DevSecOps tools.",
    totalTrainees: 155,
    noOfModules: 11,
    noOfLessons: 33,
    noOfAssignments: 6,
    thumbnailUrl: null,
  },
  {
    courseId: "c7",
    courseName: "Data Engineering Pipelines",
    shortDescription: "Build scalable ETL processes with Apache Spark, Delta Lake, and modern data warehouse architectures.",
    totalTrainees: 275,
    noOfModules: 9,
    noOfLessons: 27,
    noOfAssignments: 4,
    thumbnailUrl: null,
  },
  {
    courseId: "c8",
    courseName: "Technical Leadership for Engineers",
    shortDescription: "Transition from individual contributor to engineering manager. Learn about scaling culture, feedback loops, and team dynamics.",
    totalTrainees: 92,
    noOfModules: 6,
    noOfLessons: 18,
    noOfAssignments: 2,
    thumbnailUrl: null,
  },
];
