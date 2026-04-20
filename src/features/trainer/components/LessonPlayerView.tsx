import { ArrowLeft } from "lucide-react";
import { Lesson } from "@/types";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PDFViewer } from "@/components/PDFViewer";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";

interface LessonPlayerViewProps {
  lesson: Lesson;
  onBack: () => void;
}

export function LessonPlayerView({ lesson, onBack }: LessonPlayerViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto custom-scrollbar"
    >
      {/* Top Navigation */}
      <div className="shadow-border bg-bg-primary sticky top-0 z-30">
        <div className="px-4 md:px-8 h-16 max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Lessons</span>
          </button>
          
          <div className="flex-1 text-center px-4 hidden sm:block">
            <h2 className="text-xs font-bold text-text-primary truncate max-w-[400px] mx-auto uppercase tracking-widest">
              {lesson.title}
            </h2>
          </div>
          
          <div className="w-[100px] flex justify-end" />
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Lesson Header (Mobile) */}
        <div className="sm:hidden space-y-1 mb-4">
           <h1 className="text-xl font-bold text-text-primary tracking-tight">
            {lesson.title}
          </h1>
        </div>

        {/* Player Section (Video or PDF) */}
        <div className="w-full">
          {lesson.url ? (
            <>
              {lesson.mime_type === "video/mp4" && <VideoPlayer src={lesson.url} />}
              {lesson.mime_type === "application/pdf" && <PDFViewer src={lesson.url} />}
              {lesson.mime_type !== "video/mp4" && lesson.mime_type !== "application/pdf" && (
                <div className="aspect-video bg-bg-secondary rounded-card shadow-border flex flex-col items-center justify-center text-center p-8">
                   <AlertCircle className="size-8 text-text-secondary mb-4 opacity-40" />
                   <h3 className="text-lg font-bold text-text-primary">Unsupported File Type</h3>
                   <p className="text-sm text-text-secondary">{lesson.mime_type}</p>
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video bg-bg-secondary rounded-card shadow-border flex flex-col items-center justify-center text-center p-8 space-y-4">
               <div className="size-16 bg-bg-primary rounded-full flex items-center justify-center shadow-border">
                 <PlayCircle className="size-8 text-text-secondary opacity-40" />
               </div>
               <div className="space-y-1">
                 <h3 className="text-lg font-bold text-text-primary">No Content Available</h3>
                 <p className="text-sm text-text-secondary max-w-[300px]">
                   This lesson does not have a video or document attached.
                 </p>
               </div>
            </div>
          )}
        </div>

        {/* Overview Section */}
        <div className="space-y-6 pb-20">
          <div className="flex items-center justify-between shadow-border bg-bg-secondary/30 rounded-card p-4">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Overview</h2>
            <div className="px-3 py-1 bg-bg-primary text-text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full shadow-border">
              {lesson.mime_type === "video/mp4" ? "Video Lesson" : "Document"}
            </div>
          </div>

          <div className="markdown-body px-4">
            {lesson.description ? (
              <ReactMarkdown>{lesson.description}</ReactMarkdown>
            ) : (
              <p className="text-text-secondary italic">No description provided for this lesson.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlayCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
