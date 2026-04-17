export interface Module {
  id: string;
  title: string;
  description: string;
}

export interface Assignment {
  id: string;
  title: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  trainerId: string;
  trainerName: string;
}

export interface CourseContentData {
  course: CourseDetail;
  modules: Module[];
  assignments: Assignment[];
}

export const MOCK_COURSE_CONTENT: Record<string, CourseContentData> = {
  "C-1": {
    course: {
      id: "C-1",
      title: "Advanced FastAPI Development",
      shortDescription: "Build scalable APIs",
      longDescription: "### Course Overview\n\nThis course covers advanced patterns in FastAPI for building production-ready APIs.",
      trainerId: "U-1",
      trainerName: "Arjun Kumar"
    },
    modules: [
      { id: "M-1", title: "Introduction", description: "Basics of async programming and FastAPI core." },
      { id: "M-2", title: "Routing", description: "Deep dive into routers, dependencies, and mounting." },
      { id: "M-3", title: "Authentication", description: "OAuth2, JWT, and custom auth flows." }
    ],
    assignments: [
      { id: "A-1", title: "CRUD API Task" },
      { id: "A-2", title: "Auth System Implementation" },
      { id: "A-3", title: "Background Tasks Challenge" }
    ]
  },
  "C-2": {
    course: {
      id: "C-2",
      title: "Mainframe Modernization",
      shortDescription: "Legacy system transformation",
      longDescription: "Modernizing legacy mainframe systems using modern cloud patterns.",
      trainerId: "U-2",
      trainerName: "Priya Sharma"
    },
    modules: [
      { id: "M-4", title: "Legacy Landscapes", description: "Understanding the current state of mainframes." }
    ],
    assignments: []
  }
};
