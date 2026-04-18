export type LessonMimeType = "application/pdf" | "video/mp4";

export interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  module_id: string;
  media_id: string;
  mime_type: LessonMimeType;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxScore: number;
  numberOfAttempts: number;
  attachment: {
    mediaId: string;
    mimeType: LessonMimeType;
    filename: string;
  } | null;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  trainerId: string;
  trainerName: string;
}

export interface CourseContentData {
  course: Course;
  modules: Module[];
  assignments: Assignment[];
}

export type SubmissionStatus = "submitted" | "done-late" | "graded";

export interface Submission {
  id: string;
  assignment_id: string;
  username: string;
  email: string;
  attempt: number;
  maxAttempt: number;
  status: SubmissionStatus;
  score: number | null;
  maxScore: number;
  submittedAt: string;
}
