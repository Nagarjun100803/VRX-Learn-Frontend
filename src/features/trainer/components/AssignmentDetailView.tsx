import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, Target, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import ReactMarkdown from "react-markdown";

export function AssignmentDetailView({ courseId }: { courseId: string }) {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const assignment = db.getAssignment(courseId, assignmentId || "");
  
  const [activeTab, setActiveTab] = useState<"instructions" | "submissions">("instructions");

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-sm text-text-secondary bg-bg-primary text-center p-8">
        <p>Assignment not found (Check console logs)</p>
        <Button 
          variant="ghost" 
          className="mt-4" 
          onClick={() => navigate(`/trainer/courses/${courseId}/content/assignments`)}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Assignments
        </Button>
      </div>
    );
  }

  const handleBack = () => {
    const root = window.location.pathname.includes("/admin") ? "/admin" : "/trainer";
    navigate(`${root}/courses/${courseId}/content/assignments`);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto p-8 max-w-5xl mx-auto w-full">
      <div 
        className="flex items-center gap-2 mb-6 py-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
        onClick={handleBack}
      >
        <ArrowLeft className="size-4" />
        Back to Assignments
      </div>

      <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-4">
        {assignment.title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-text-muted" />
          <span>
            <span className="text-text-muted mr-1">Due:</span>
            <span className="font-medium text-text-primary">{new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </span>
        </div>
        <span className="hidden md:inline text-border-subtle">·</span>
        <div className="flex items-center gap-2">
          <Target className="size-4 text-text-muted" />
          <span>
            <span className="text-text-muted mr-1">Score:</span>
            <span className="font-medium text-text-primary">{assignment.maxScore}</span>
          </span>
        </div>
        <span className="hidden md:inline text-border-subtle">·</span>
        <div className="flex items-center gap-2">
          <RotateCcw className="size-4 text-text-muted" />
          <span>
            <span className="text-text-muted mr-1">Attempts:</span>
            <span className="font-medium text-text-primary">{assignment.numberOfAttempts}</span>
          </span>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border-subtle mb-6">
        <button 
          className={`pb-3 text-sm font-bold ${activeTab === "instructions" ? "text-text-primary border-b-2 border-text-primary" : "text-text-secondary"}`}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button>
        <button 
          className={`pb-3 text-sm font-bold ${activeTab === "submissions" ? "text-text-primary border-b-2 border-text-primary" : "text-text-secondary"}`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
      </div>

      {activeTab === "instructions" ? (
        <div className="space-y-6">
          <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed">
            <ReactMarkdown>
              {assignment.instructions}
            </ReactMarkdown>
          </div>
          
          {assignment.attachment && (
            <div className="p-4 rounded-card border border-border-subtle flex items-center gap-3">
              <FileText className="size-5 text-accent-blue" />
              <div className="flex-1 text-sm font-medium">{assignment.attachment.filename}</div>
              <Button variant="ghost" size="sm" className="text-xs">Download</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-text-secondary">
          Submissions coming soon
        </div>
      )}
    </div>
  );
}
