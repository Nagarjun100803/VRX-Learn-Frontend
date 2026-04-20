import { Course, Module, Lesson, LessonMimeType, Assignment, Submission, SubmissionStatus } from "./types";

export type TraineeCourse = {
  courseId: string;
  courseName: string;
  trainerName: string;
  thumbnailUrl: string | null;
};

export const traineeCourses: TraineeCourse[] = [
  {
    courseId: "C-1", // IMPORTANT: must match existing course
    courseName: "Advanced FastAPI Development",
    trainerName: "Arjun Kumar",
    thumbnailUrl: null
  },
  {
    courseId: "C-2",
    courseName: "Advanced JavaScript",
    trainerName: "Jane Smith",
    thumbnailUrl: null
  },
  {
    courseId: "C-3",
    courseName: "System Design Basics",
    trainerName: "Alex Johnson",
    thumbnailUrl: null
  },
  {
    courseId: "C-4",
    courseName: "Database Design",
    trainerName: "Emily Davis",
    thumbnailUrl: null
  },
  {
    courseId: "C-5",
    courseName: "API Development with FastAPI",
    trainerName: "Michael Brown",
    thumbnailUrl: null
  }
];

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
    { 
      id: "L-1", 
      title: "Course Overview", 
      description: `
# Welcome to Advanced FastAPI

In this lesson, we will explore the core architecture of the application we are going to build.

## What you will learn:
- **Project Structure**: How to organize a large-scale FastAPI project.
- **Asynchronous Patterns**: Leveraging \`async\` and \`await\` for high performance.
- **Dependency Injection**: Mastering the DI system.

### Requirements:
- Python 3.9+
- Basic knowledge of REST APIs

> "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python."
`, 
      module_id: "M-1", 
      media_id: "ME-1", 
      mime_type: "video/mp4",
      url: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    { 
      id: "L-2", 
      title: "Sample PDF Lesson", 
      description: `
# Course Documentation

This document contains all the essential information you need to follow the course.

## Topics Covered:
- Environment Setup
- Core Concepts
- Graduation Requirements

*Please review this PDF carefully.*
`, 
      module_id: "M-1", 
      media_id: "ME-2", 
      mime_type: "application/pdf",
      url: "https://api.slingacademy.com/v1/sample-data/files/text-and-images.pdf"
    },
    { id: "L-3", title: "Setting up your Dev Environment", description: "Configuring Python, Virtualenv, and VS Code.", module_id: "M-1", media_id: "ME-3", mime_type: "video/mp4" },
    { id: "L-4", title: "First Steps with FastAPI", description: null, module_id: "M-1", media_id: "ME-4", mime_type: "video/mp4" },
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
  ] as Assignment[],
  submissions: [
    {
      "id": "S-100",
      "assignment_id": "A-1",
      "username": "John Doe",
      "email": "john@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.636Z"
    },
    {
      "id": "S-101",
      "assignment_id": "A-1",
      "username": "Jane Smith",
      "email": "jane@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-18T08:46:59.636Z"
    },
    {
      "id": "S-102",
      "assignment_id": "A-1",
      "username": "Alice Johnson",
      "email": "alice@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "graded",
      "score": 4,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.636Z"
    },
    {
      "id": "S-103",
      "assignment_id": "A-1",
      "username": "Bob Brown",
      "email": "bob@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "graded",
      "score": 0,
      "maxScore": 10,
      "submittedAt": "2026-04-16T08:46:59.636Z"
    },
    {
      "id": "S-104",
      "assignment_id": "A-1",
      "username": "Charlie Davis",
      "email": "charlie@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-11T08:46:59.636Z"
    },
    {
      "id": "S-105",
      "assignment_id": "A-1",
      "username": "Eve White",
      "email": "eve@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-17T08:46:59.636Z"
    },
    {
      "id": "S-106",
      "assignment_id": "A-1",
      "username": "Frank Miller",
      "email": "frank@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-10T08:46:59.636Z"
    },
    {
      "id": "S-107",
      "assignment_id": "A-1",
      "username": "Grace Hopper",
      "email": "grace@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "graded",
      "score": 1,
      "maxScore": 10,
      "submittedAt": "2026-04-17T08:46:59.636Z"
    },
    {
      "id": "S-108",
      "assignment_id": "A-1",
      "username": "Heidi Klum",
      "email": "heidi@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-11T08:46:59.636Z"
    },
    {
      "id": "S-109",
      "assignment_id": "A-1",
      "username": "Ivan Drago",
      "email": "ivan@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "graded",
      "score": 3,
      "maxScore": 10,
      "submittedAt": "2026-04-14T08:46:59.636Z"
    },
    {
      "id": "S-110",
      "assignment_id": "A-1",
      "username": "John Doe",
      "email": "john@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-10T08:46:59.636Z"
    },
    {
      "id": "S-111",
      "assignment_id": "A-1",
      "username": "Jane Smith",
      "email": "jane@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "graded",
      "score": 1,
      "maxScore": 10,
      "submittedAt": "2026-04-12T08:46:59.636Z"
    },
    {
      "id": "S-112",
      "assignment_id": "A-1",
      "username": "Alice Johnson",
      "email": "alice@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-11T08:46:59.636Z"
    },
    {
      "id": "S-113",
      "assignment_id": "A-1",
      "username": "Bob Brown",
      "email": "bob@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-17T08:46:59.636Z"
    },
    {
      "id": "S-114",
      "assignment_id": "A-1",
      "username": "Charlie Davis",
      "email": "charlie@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.636Z"
    },
    {
      "id": "S-115",
      "assignment_id": "A-1",
      "username": "Eve White",
      "email": "eve@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-16T08:46:59.636Z"
    },
    {
      "id": "S-116",
      "assignment_id": "A-1",
      "username": "Frank Miller",
      "email": "frank@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 0,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.636Z"
    },
    {
      "id": "S-117",
      "assignment_id": "A-1",
      "username": "Grace Hopper",
      "email": "grace@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 4,
      "maxScore": 10,
      "submittedAt": "2026-04-18T08:46:59.636Z"
    },
    {
      "id": "S-118",
      "assignment_id": "A-1",
      "username": "Heidi Klum",
      "email": "heidi@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.636Z"
    },
    {
      "id": "S-119",
      "assignment_id": "A-1",
      "username": "Ivan Drago",
      "email": "ivan@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.636Z"
    },
    {
      "id": "S-120",
      "assignment_id": "A-1",
      "username": "John Doe",
      "email": "john@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-10T08:46:59.637Z"
    },
    {
      "id": "S-121",
      "assignment_id": "A-1",
      "username": "Jane Smith",
      "email": "jane@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-16T08:46:59.637Z"
    },
    {
      "id": "S-122",
      "assignment_id": "A-1",
      "username": "Alice Johnson",
      "email": "alice@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-12T08:46:59.637Z"
    },
    {
      "id": "S-123",
      "assignment_id": "A-1",
      "username": "Bob Brown",
      "email": "bob@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "submitted",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-13T08:46:59.637Z"
    },
    {
      "id": "S-124",
      "assignment_id": "A-1",
      "username": "Charlie Davis",
      "email": "charlie@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 10,
      "maxScore": 10,
      "submittedAt": "2026-04-16T08:46:59.637Z"
    },
    {
      "id": "S-125",
      "assignment_id": "A-1",
      "username": "Eve White",
      "email": "eve@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-14T08:46:59.637Z"
    },
    {
      "id": "S-126",
      "assignment_id": "A-1",
      "username": "Frank Miller",
      "email": "frank@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "graded",
      "score": 10,
      "maxScore": 10,
      "submittedAt": "2026-04-12T08:46:59.637Z"
    },
    {
      "id": "S-127",
      "assignment_id": "A-1",
      "username": "Grace Hopper",
      "email": "grace@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 8,
      "maxScore": 10,
      "submittedAt": "2026-04-18T08:46:59.637Z"
    },
    {
      "id": "S-128",
      "assignment_id": "A-1",
      "username": "Heidi Klum",
      "email": "heidi@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 2,
      "maxScore": 10,
      "submittedAt": "2026-04-13T08:46:59.637Z"
    },
    {
      "id": "S-129",
      "assignment_id": "A-1",
      "username": "Ivan Drago",
      "email": "ivan@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-09T08:46:59.637Z"
    },
    {
      "id": "S-200",
      "assignment_id": "A-2",
      "username": "John Doe",
      "email": "john@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 10,
      "maxScore": 10,
      "submittedAt": "2026-04-10T08:46:59.637Z"
    },
    {
      "id": "S-201",
      "assignment_id": "A-2",
      "username": "Jane Smith",
      "email": "jane@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-18T08:46:59.637Z"
    },
    {
      "id": "S-202",
      "assignment_id": "A-2",
      "username": "Alice Johnson",
      "email": "alice@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "graded",
      "score": 8,
      "maxScore": 10,
      "submittedAt": "2026-04-10T08:46:59.637Z"
    },
    {
      "id": "S-203",
      "assignment_id": "A-2",
      "username": "Bob Brown",
      "email": "bob@example.com",
      "attempt": 1,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-15T08:46:59.637Z"
    },
    {
      "id": "S-204",
      "assignment_id": "A-2",
      "username": "Charlie Davis",
      "email": "charlie@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "graded",
      "score": 4,
      "maxScore": 10,
      "submittedAt": "2026-04-13T08:46:59.637Z"
    },
    {
      "id": "S-205",
      "assignment_id": "A-2",
      "username": "Eve White",
      "email": "eve@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-10T08:46:59.637Z"
    },
    {
      "id": "S-206",
      "assignment_id": "A-2",
      "username": "Frank Miller",
      "email": "frank@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-14T08:46:59.637Z"
    },
    {
      "id": "S-207",
      "assignment_id": "A-2",
      "username": "Grace Hopper",
      "email": "grace@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-12T08:46:59.637Z"
    },
    {
      "id": "S-208",
      "assignment_id": "A-2",
      "username": "Heidi Klum",
      "email": "heidi@example.com",
      "attempt": 3,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-17T08:46:59.637Z"
    },
    {
      "id": "S-209",
      "assignment_id": "A-2",
      "username": "Ivan Drago",
      "email": "ivan@example.com",
      "attempt": 2,
      "maxAttempt": 3,
      "status": "done-late",
      "score": null,
      "maxScore": 10,
      "submittedAt": "2026-04-12T08:46:59.637Z"
    }
  ] as Submission[]
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

  createAssignment(courseId: string, data: { 
    title: string; 
    instructions: string | null; 
    dueDate: string | null; 
    maxScore: number; 
    numberOfAttempts: number;
    attachment?: { mediaId: string; mimeType: LessonMimeType; filename: string; } | null;
  }): Assignment {
    console.log("db.createAssignment", { courseId, data });
    const newAssignment: Assignment = {
      id: `A-${DB.assignments.length + 1}`,
      course_id: courseId,
      title: data.title,
      instructions: data.instructions || "",
      dueDate: data.dueDate || "",
      maxScore: data.maxScore,
      numberOfAttempts: data.numberOfAttempts,
      attachment: data.attachment || null
    };
    DB.assignments.push(newAssignment);
    return newAssignment;
  },

  updateAssignment(assignmentId: string, data: { 
    title: string; 
    instructions: string | null; 
    dueDate: string | null; 
  }): Assignment {
    console.log("db.updateAssignment", { assignmentId, data });
    const index = DB.assignments.findIndex(a => a.id === assignmentId);
    if (index === -1) throw new Error("Assignment not found");
    
    DB.assignments[index] = {
      ...DB.assignments[index],
      title: data.title,
      instructions: data.instructions || "",
      dueDate: data.dueDate || ""
    };
    return DB.assignments[index];
  },

  getSubmissionsByAssignment(assignmentId: string): Submission[] {
    console.log("db.getSubmissionsByAssignment", { assignmentId });
    return DB.submissions.filter(s => s.assignment_id === assignmentId);
  },
  
  getModule(courseId: string, moduleId: string): Module | null {
    console.log("db.getModule", { courseId, moduleId });
    return DB.modules.find(m => m.id === moduleId && m.course_id === courseId) || null;
  },

  createModule(courseId: string, data: { title: string; description: string }): Module {
    console.log("db.createModule", { courseId, data });
    const newModule: Module = {
      id: `M-${DB.modules.length + 1}`,
      course_id: courseId,
      title: data.title,
      description: data.description
    };
    DB.modules.push(newModule);
    return newModule;
  },

  updateModule(moduleId: string, data: { title: string; description: string }): Module {
    console.log("db.updateModule", { moduleId, data });
    const index = DB.modules.findIndex(m => m.id === moduleId);
    if (index === -1) throw new Error("Module not found");
    
    DB.modules[index] = {
      ...DB.modules[index],
      title: data.title,
      description: data.description
    };
    return DB.modules[index];
  },

  getLesson(moduleId: string, lessonId: string): Lesson | null {
    console.log("db.getLesson", { moduleId, lessonId });
    return DB.lessons.find(l => l.id === lessonId && l.module_id === moduleId) || null;
  },

  createLesson(moduleId: string, data: { 
    title: string; 
    description: string; 
    media_id: string; 
    mime_type: LessonMimeType;
    url?: string | null;
  }): Lesson {
    console.log("db.createLesson", { moduleId, data });
    const newLesson: Lesson = {
      id: `L-${DB.lessons.length + 1}`,
      module_id: moduleId,
      title: data.title,
      description: data.description,
      media_id: data.media_id,
      mime_type: data.mime_type,
      url: data.url
    };
    DB.lessons.push(newLesson);
    return newLesson;
  },

  updateLesson(lessonId: string, data: { title: string; description: string }): Lesson {
    console.log("db.updateLesson", { lessonId, data });
    const index = DB.lessons.findIndex(l => l.id === lessonId);
    if (index === -1) throw new Error("Lesson not found");
    
    DB.lessons[index] = {
      ...DB.lessons[index],
      title: data.title,
      description: data.description
    };
    return DB.lessons[index];
  },

  getSubmissions({
    assignmentId,
    page,
    limit,
    fromDate,
    toDate,
    status,
    sortBy
  }: {
    assignmentId: string;
    page: number;
    limit: number;
    fromDate?: string | null;
    toDate?: string | null;
    status?: SubmissionStatus | null;
    sortBy?: "submitted_at_asc" | "submitted_at_desc" | "grade_asc" | "grade_desc";
  }) {
    console.log("db.getSubmissions", { assignmentId, page, limit, fromDate, toDate, status, sortBy });
    
    let filtered = DB.submissions.filter(s => s.assignment_id === assignmentId);

    if (status) {
      filtered = filtered.filter(s => s.status === status);
    }

    if (fromDate) {
      const start = new Date(fromDate);
      filtered = filtered.filter(s => new Date(s.submittedAt) >= start);
    }

    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(s => new Date(s.submittedAt) <= end);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "submitted_at_asc":
            return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
          case "submitted_at_desc":
            return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
          case "grade_asc":
            if (a.score === null && b.score === null) return 0;
            if (a.score === null) return 1;
            if (b.score === null) return -1;
            return a.score - b.score;
          case "grade_desc":
            if (a.score === null && b.score === null) return 0;
            if (a.score === null) return 1;
            if (b.score === null) return -1;
            return b.score - a.score;
          default:
            return 0;
        }
      });
    }

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const offset = (page - 1) * limit;
    const data = filtered.slice(offset, offset + limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages
    };
  },

  getTraineeCourses: () => traineeCourses
};
