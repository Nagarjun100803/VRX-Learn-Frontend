export type LessonMimeType = "application/pdf" | "video/mp4";

export interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  module_id: string;
  media_id: string;
  mime_type: LessonMimeType;
}

export interface Module {
  id: string;
  title: string;
  description: string;
}

export const MOCK_MODULES: Module[] = [
  { 
    id: "M-1", 
    title: "Introduction to FastAPI", 
    description: "Getting started with high-performance Python APIs. We'll cover environment setup, basic routing, and the core philosophy of FastAPI." 
  },
  { 
    id: "M-2", 
    title: "Advanced Dependency Injection", 
    description: "Mastering the powerful DI system in FastAPI to write clean, testable, and reusable code for your production applications." 
  },
  { 
    id: "M-3", 
    title: "Database Integration & ORMs", 
    description: "Connecting your API to relational databases using SQLAlchemy and Tortoise-ORM. Handling migrations and async database drivers." 
  }
];

export const MOCK_LESSONS: Lesson[] = [
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
];
