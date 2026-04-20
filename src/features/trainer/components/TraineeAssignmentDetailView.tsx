import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Target, 
  RotateCcw, 
  AlertCircle,
  FileUp,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Submission, Assignment } from "@/types";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

export function TraineeAssignmentDetailView({ courseId }: { courseId: string }) {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const assignment = useMemo(() => 
    assignmentId ? db.getAssignment(courseId, assignmentId) : null
  , [courseId, assignmentId]);

  // In a real app, we would filter by the current logged-in user's email/ID
  // For this demo, we'll pretend the trainee is "John Doe" (john@example.com)
  const submissions = useMemo(() => {
    if (!assignmentId) return [];
    return db.getSubmissionsByAssignment(assignmentId)
      .filter(s => s.email === "john@example.com");
  }, [assignmentId]);

  const usedAttempts = submissions.length;
  const totalAttempts = assignment?.numberOfAttempts ?? 0;
  const remainingAttempts = Math.max(0, totalAttempts - usedAttempts);

  const handleBack = () => {
    navigate(`/trainee/courses/${courseId}/content/assignments`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    console.log("Submitting file:", selectedFile);
    // In a real app, we would call an API here
    setIsUploading(false);
    setSelectedFile(null);
    // Optionally trigger a refresh or toast
  };

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-full w-full bg-bg-primary font-sans p-8 text-center space-y-4">
        <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-muted mb-2 shadow-border mx-auto">
          <AlertCircle className="size-8" />
        </div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight">Assignment not found</h3>
        <div 
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
          onClick={handleBack}
        >
          <ArrowLeft className="size-4" />
          <span className="font-medium">Back to Assignments</span>
        </div>
      </div>
    );
  }

  const getButtonLabel = () => {
    if (usedAttempts === 0) return "Take Assignment";
    if (remainingAttempts > 0) return "Retake Assignment";
    return "No Attempts Left";
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto font-sans">
      <div className="max-w-3xl mx-auto w-full p-6 md:p-12 space-y-12 pb-32">
        {/* Header Section */}
        <section className="space-y-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group mb-4"
          >
            <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Assignments
          </button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              {assignment.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-text-muted" />
                <span>Due: <span className="text-text-primary font-medium">{new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="size-4 text-text-muted" />
                <span>Max Score: <span className="text-text-primary font-medium">{assignment.maxScore}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="size-4 text-text-muted" />
                <span>Attempts: <span className="text-text-primary font-medium">{usedAttempts} / {totalAttempts} used</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-text-primary tracking-tight">Instructions</h2>
          <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed bg-bg-secondary/10 p-6 rounded-card border border-border-subtle shadow-sm">
            <ReactMarkdown>
              {assignment.instructions}
            </ReactMarkdown>
          </div>

          {assignment.attachment && (
            <div className="mt-4 p-4 rounded-card border border-border-subtle flex items-center justify-between gap-3 bg-bg-primary shadow-border max-w-sm">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="size-5 text-accent-blue shrink-0" />
                <div className="text-sm font-medium text-text-primary truncate">{assignment.attachment.filename}</div>
              </div>
            </div>
          )}
        </section>

        {/* Submissions Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">Your Submissions</h2>
            <Button
              onClick={() => setIsUploading(!isUploading)}
              variant={isUploading ? "secondary" : "default"}
              size="sm"
              disabled={remainingAttempts === 0 && !isUploading}
              className={`h-9 px-4 font-bold text-xs rounded-button transition-all active:scale-95 ${isUploading ? 'bg-bg-secondary text-text-primary' : 'bg-text-primary text-bg-primary'} ${remainingAttempts === 0 && !isUploading ? 'opacity-50 cursor-not-allowed contrast-75' : ''}`}
            >
              {isUploading ? "Cancel" : getButtonLabel()}
            </Button>
          </div>

          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-card border-2 border-dashed border-border-subtle bg-bg-secondary/30 space-y-4">
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="size-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted mb-3 shadow-border">
                      <Upload className="size-5" />
                    </div>
                    <p className="text-sm font-medium text-text-primary">
                      {selectedFile ? selectedFile.name : "Select a PDF file to upload"}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Max file size: 5MB
                    </p>
                    <input 
                      type="file" 
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden" 
                      id="file-upload"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-4 text-accent-blue hover:text-accent-blue hover:bg-accent-blue/5 text-xs font-bold"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-xs text-accent-red font-medium justify-center">
                      <AlertCircle className="size-3.5" />
                      {error}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <Button 
                      className="flex-1 bg-text-primary text-bg-primary hover:bg-text-primary/90 font-bold h-10 rounded-button"
                      onClick={handleSubmit}
                      disabled={!selectedFile}
                    >
                      Submit Assignment
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="h-10 px-6 font-bold text-text-secondary rounded-button"
                      onClick={() => {
                        setIsUploading(false);
                        setSelectedFile(null);
                        setError(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div 
                key={submission.id}
                className="p-5 bg-bg-primary rounded-card border border-border-subtle shadow-border space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-button bg-bg-secondary flex items-center justify-center text-accent-blue shrink-0 shadow-border">
                      <FileText className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate">
                        submission_{index + 1}.pdf
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary font-medium">
                        <Clock className="size-3" />
                        <span>Submitted on {new Date(submission.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {submission.status === "graded" ? (
                      <div className="text-right">
                        <p className="text-xs font-bold text-text-primary">
                          Score: <span className="text-accent-blue">{submission.score}</span> / {submission.maxScore}
                        </p>
                      </div>
                    ) : (
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          submission.status === "done-late" 
                            ? "bg-amber-50 text-amber-600 border-amber-200" 
                            : "bg-bg-secondary text-text-secondary border-border-subtle"
                        }`}
                      >
                        {submission.status === "submitted" ? "Submitted" : "Late"}
                      </Badge>
                    )}
                  </div>
                </div>

                {submission.status === "graded" ? (
                  <div className="pt-4 border-t border-border-subtle/50">
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Feedback</p>
                    <p className="text-sm text-text-secondary leading-relaxed italic">
                      "Great work on the implementation. The code is clean and handles most edge cases. Consider optimizing the database queries in the next module."
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-3 border-t border-border-subtle/50 text-[11px] font-medium text-text-muted">
                    <AlertCircle className="size-3.5" />
                    Waiting for evaluation
                  </div>
                )}
              </div>
            ))}

            {submissions.length === 0 && !isUploading && (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-muted mb-6 shadow-border">
                  <ClipboardList className="size-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary tracking-tight">
                  No submissions yet
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-[240px]">
                  Start by clicking the button above to take the assignment
                </p>
              </div>
            )}
          </div>
        </section>

        {remainingAttempts === 0 && (
          <div className="p-4 rounded-card bg-bg-secondary/50 border border-border-subtle flex items-center justify-center gap-2 text-sm font-medium text-text-secondary">
            <CheckCircle2 className="size-4 text-emerald-500" />
            All attempts completed
          </div>
        )}
      </div>
    </div>
  );
}

// Placeholder for potential future exports
export default TraineeAssignmentDetailView;
