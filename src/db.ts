import { Course, Module, Lesson, Assignment } from "./types";

export const DB = {
  courses: [
    {
      id: "C-1",
      title: "Advanced FastAPI Development",
      shortDescription: "Build scalable APIs",
      longDescription: "### Course Overview\n\nThis course covers advanced patterns in FastAPI for building production-ready APIs.",
      trainerId: "U-1",
      trainerName: "Arjun Kumar"
    },
    {
      id: "C-2",
      title: "Mainframe Modernization",
      shortDescription: "Legacy system transformation",
      longDescription: "Modernizing legacy mainframe systems using modern cloud patterns.",
      trainerId: "U-2",
      trainerName: "Priya Sharma"
    }
  ],
  modules: [
    { id: "M-1", course_id: "C-1", title: "Introduction to FastAPI", description: "Getting started with high-performance Python APIs. We'll cover environment setup, basic routing, and the core philosophy of FastAPI." },
    { id: "M-2", course_id: "C-1", title: "Advanced Dependency Injection", description: "Mastering the powerful DI system in FastAPI to write clean, testable, and reusable code for your production applications." },
    { id: "M-3", course_id: "C-1", title: "Database Integration & ORMs", description: "Connecting your API to relational databases using SQLAlchemy and Tortoise-ORM. Handling migrations and async database drivers." },
    { id: "M-4", course_id: "C-2", title: "Legacy Landscapes", description: "Understanding the current state of mainframes." }
  ],
  lessons: [
    // Module 1 Lessons
    { id: "L-1", title: "Course Overview", description: "A high-level look at what we will build.", module_id: "M-1", media_id: "ME-1", mime_type: "application/pdf" },
    { id: "L-2", title: "Setting up your Dev Environment", description: "Configuring Python, Virtualenv, and VS Code.", module_id: "M-1", media_id: "ME-2", mime_type: "video/mp4" },
    { id: "L-3", title: "First Steps with FastAPI", description: null, module_id: "M-1", media_id: "ME-3", mime_type: "video/mp4" },
    { id: "L-4", title: "Path Parameters & Query Parameters", description: "Deep dive into dynamic routing.", module_id: "M-1", media_id: "ME-4", mime_type: "application/pdf" },
    { id: "L-5", title: "Request Body & Pydantic", description: "Data validation made easy with Pydantic models.", module_id: "M-1", media_id: "ME-5", mime_type: "video/mp4" },
    { id: "L-6", title: "Module 1 Conclusion", description: "Recap of what we learned.", module_id: "M-1", media_id: "ME-6", mime_type: "application/pdf" },
    // Module 2 Lessons
    { id: "L-7", title: "Why Dependency Injection?", description: "Understanding the Core Concepts.", module_id: "M-2", media_id: "ME-7", mime_type: "application/pdf" },
    { id: "L-8", title: "Creating your First Dependency", description: "Simple function-based dependencies.", module_id: "M-2", media_id: "ME-8", mime_type: "video/mp4" },
    { id: "L-9", title: "Class-Based Dependencies", description: "Handling stateful dependencies.", module_id: "M-2", media_id: "ME-9", mime_type: "video/mp4" },
    { id: "L-10", title: "Dependency Overriding for Testing", description: "Mocking services during integration tests.", module_id: "M-2", media_id: "ME-10", mime_type: "application/pdf" },
    { id: "L-11", title: "Advanced Dependency Scopes", description: null, module_id: "M-2", media_id: "ME-11", mime_type: "video/mp4" },
    // Module 3 Lessons
    { id: "L-12", title: "SQLAlchemy 2.0 Basics", description: "Async session mapping and models.", module_id: "M-3", media_id: "ME-12", mime_type: "application/pdf" },
    { id: "L-13", title: "Database Migrations with Alembic", description: "Managing schema changes safely.", module_id: "M-3", media_id: "ME-13", mime_type: "video/mp4" },
    { id: "L-14", title: "CRUD Operations (Create & Read)", description: "Efficient data retrieval patterns.", module_id: "M-3", media_id: "ME-14", mime_type: "video/mp4" },
    { id: "L-15", title: "Handling Relationships", description: "One-to-many and many-to-many examples.", module_id: "M-3", media_id: "ME-15", mime_type: "application/pdf" },
    { id: "L-16", title: "Transaction Management", description: "Ensuring data integrity with async transactions.", module_id: "M-3", media_id: "ME-16", mime_type: "video/mp4" }
  ] as Lesson[],
  assignments: [
    { 
      id: "A-1", 
      course_id: "C-1", 
      title: "CRUD API Task", 
      instructions: `
# CRUD API Task

## Objective
Build a production-ready REST API using FastAPI for managing a library system.

## Requirements
- Implement Create, Read, Update, Delete (CRUD) endpoints for "Books" and "Authors".
- Use Pydantic models for data validation and response serialization.
- Add proper HTTP error handling with descriptive messages.
- Ensure type-hinting is correct throughout the application.

## Bonus
- Implement basic pagination for the list endpoints.
- Add simple search filtering by book title.

## Submission
Provide the link to your public GitHub repository containing the complete implementation and a README file.
`, 
      dueDate: "2026-04-20T10:00:00Z", 
      maxScore: 10, 
      numberOfAttempts: 1, 
      attachment: { mediaId: "ME-1", mimeType: "application/pdf", filename: "task_spec.pdf" } 
    },
    { 
      id: "A-2", 
      course_id: "C-1", 
      title: "Authentication System", 
      instructions: `
# Authentication & Authorization

## Objective
Secure your FastAPI application using OAuth2 with Password flow and JWT tokens.

## Requirements
- Implement a user registration and login system.
- Secure at least three endpoints so only authenticated users can access them.
- Use JWT (JSON Web Tokens) for token-based authentication.
- Hash passwords securely using passlib (bcrypt).

## Bonus
- Implement Role-Based Access Control (RBAC) with "Admin" and "User" roles.

## Submission
Submit your implementation code and a text file documenting how to test the auth flow.
`, 
      dueDate: "2026-04-25T10:00:00Z", 
      maxScore: 15, 
      numberOfAttempts: 2, 
      attachment: null 
    },
    { 
      id: "A-3", 
      course_id: "C-1", 
      title: "Data Modeling Challenge", 
      instructions: `
# Advanced Data Modeling

## Objective
Design a complex database schema for an e-commerce platform.

## Requirements
- Define relationships: Many-to-One, One-to-Many, and Many-to-Many.
- Use SQLAlchemy (or Tortoise-ORM) to define the models.
- Include fields for Products, Orders, Customers, and Categories.
- Ensure correct indexing on frequently queried columns.

## Submission
Upload a PDF of your ERD diagram and the Python file containing your ORM model definitions.
`, 
      dueDate: "2026-04-22T10:00:00Z", 
      maxScore: 5, 
      numberOfAttempts: 1, 
      attachment: { mediaId: "ME-2", mimeType: "application/pdf", filename: "modeling_guide.pdf" } 
    },
    { 
      id: "A-4", 
      course_id: "C-1", 
      title: "Unit Testing Mastery", 
      instructions: `
# Testing Your API

## Objective
Achieve high code coverage and reliability using pytest and HTTPX.

## Requirements
- Write unit tests for all your core logic functions.
- Implement integration tests using TestClient for your FastAPI endpoints.
- Mock database sessions effectively to isolate tests.
- Verify both success and error cases (404, 422, etc.).

## Submission
Upload your 'tests' folder and a screenshot of your code coverage report.
`, 
      dueDate: "2026-04-28T10:00:00Z", 
      maxScore: 20, 
      numberOfAttempts: 3, 
      attachment: null 
    },
    { id: "A-5", course_id: "C-1", title: "Integration Testing", instructions: "# Test API Calls\n\nEnsure your endpoints work correctly together using automated integration tests.", dueDate: "2026-05-01T10:00:00Z", maxScore: 10, numberOfAttempts: 1, attachment: { mediaId: "ME-3", mimeType: "application/pdf", filename: "integration.pdf" } },
    { id: "A-6", course_id: "C-1", title: "Deployment", instructions: "# Deploy to Cloud\n\nLearn to containerize your app and deploy it to a production environment.", dueDate: "2026-05-05T10:00:00Z", maxScore: 5, numberOfAttempts: 1, attachment: null },
    { id: "A-7", course_id: "C-1", title: "Caching Strategy", instructions: "# Implement Redis\n\nOptimize your API performance by implementing a caching layer.", dueDate: "2026-05-08T10:00:00Z", maxScore: 10, numberOfAttempts: 1, attachment: { mediaId: "ME-4", mimeType: "application/pdf", filename: "caching.pdf" } },
    { id: "A-8", course_id: "C-1", title: "API Documentation", instructions: "# OpenAPI/Swagger\n\nCustomize your documentation with descriptive tags and summaries.", dueDate: "2026-05-10T10:00:00Z", maxScore: 5, numberOfAttempts: 1, attachment: null },
    { id: "A-9", course_id: "C-1", title: "Rate Limiting", instructions: "# Deny Service\n\nProtect your API from abuse by implementing rate limiting.", dueDate: "2026-05-12T10:00:00Z", maxScore: 5, numberOfAttempts: 1, attachment: null },
    { id: "A-10", course_id: "C-1", title: "Final Project", instructions: "# Build Full Stack App\n\nCombine everything you learned into a complete production project.", dueDate: "2026-05-20T10:00:00Z", maxScore: 50, numberOfAttempts: 1, attachment: null }
  ] as Assignment[]
};

export const db = {
  getCourse(courseId: string): Course | null {
    console.log("db.getCourse", { courseId });
    return DB.courses.find(c => c.id === courseId) || null;
  },

  getModulesByCourse(courseId: string): Module[] {
    console.log("db.getModulesByCourse", { courseId });
    return DB.modules.filter(m => m.course_id === courseId);
  },

  getLessonsByModule(moduleId: string): Lesson[] {
    console.log("db.getLessonsByModule", { moduleId });
    return DB.lessons.filter(l => l.module_id === moduleId);
  },

  getAssignmentsByCourse(courseId: string): Assignment[] {
    console.log("db.getAssignmentsByCourse", { courseId });
    return DB.assignments.filter(a => a.course_id === courseId);
  },

  getAssignment(courseId: string, assignmentId: string): Assignment | null {
    console.log("db.getAssignment", { courseId, assignmentId });
    return DB.assignments.find(a => a.id === assignmentId && a.course_id === courseId) || null;
  },
  
  getModule(courseId: string, moduleId: string): Module | null {
    console.log("db.getModule", { courseId, moduleId });
    return DB.modules.find(m => m.id === moduleId && m.course_id === courseId) || null;
  }
};
