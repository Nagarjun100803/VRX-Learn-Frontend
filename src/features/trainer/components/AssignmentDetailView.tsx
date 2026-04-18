import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, Target, RotateCcw, Eye, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { SubmissionStatus } from "@/types";
import ReactMarkdown from "react-markdown";

import { motion, AnimatePresence } from "motion/react";

// Custom hook for responsive layout
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export function AssignmentDetailView({ courseId }: { courseId: string }) {
  const params = useParams();
  const { assignmentId } = params;
  console.log("AssignmentDetailView params:", params);

  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const assignment = db.getAssignment(courseId, assignmentId!);
  
  // Step 4 & 5: Load Submissions Data (used for overview/stats)
  const submissions = useMemo(() => {
    if (!assignmentId) return [];
    return db.getSubmissionsByAssignment(assignmentId);
  }, [assignmentId]);

  // Step 8: Debug Checklist
  useEffect(() => {
    console.log("AssignmentDetailView [Debug]:", {
      assignmentId,
      assignment,
      submissionsCount: submissions.length
    });
  }, [assignmentId, assignment, submissions]);

  const [activeTab, setActiveTab] = useState<"instructions" | "submissions">("instructions");

  // Submissions State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<SubmissionStatus | "all">("all");
  const [sortBy, setSortBy] = useState<any>("submitted_at_desc");

  const handleBack = () => {
    const root = window.location.pathname.includes("/admin") ? "/admin" : "/trainer";
    navigate(`${root}/courses/${courseId}/content/assignments`);
  };

  const submissionsResult = useMemo(() => {
    if (activeTab !== "submissions" || !assignmentId) return null;
    return db.getSubmissions({
      assignmentId,
      page,
      limit,
      fromDate: fromDate || null,
      toDate: toDate || null,
      status: status === "all" ? null : status,
      sortBy
    });
  }, [assignmentId, page, limit, fromDate, toDate, status, sortBy, activeTab]);

  // Reset page on filter or limit change
  useEffect(() => {
    setPage(1);
  }, [fromDate, toDate, status, sortBy, limit]);

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-full w-full bg-bg-primary font-sans p-8 text-center space-y-4">
        <div className="size-16 rounded-3xl bg-bg-secondary flex items-center justify-center text-text-muted mb-2 shadow-border mx-auto">
          <AlertCircle className="size-8" />
        </div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight">Assignment not found</h3>
        <p className="text-sm text-text-secondary max-w-[320px] mx-auto leading-relaxed">
          We couldn't find the assignment you're looking for. It may have been moved or deleted, or the URL might be incorrect.
        </p>
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

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case "submitted":
        return <span className="text-text-secondary font-medium">Submitted</span>;
      case "done-late":
        return <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 font-medium">Done Late</Badge>;
      case "graded":
        return <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200 font-medium">Graded</Badge>;
      default:
        return null;
    }
  };

  const MetadataRow = () => (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-secondary ${isMobile ? 'justify-start' : ''}`}>
      <div className="flex items-center gap-2">
        <Calendar className="size-4 text-text-muted" />
        <span>
          <span className="text-text-muted mr-1">Due:</span>
          <span className="font-medium text-text-primary">{new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </span>
      </div>
      {!isMobile && <span className="hidden md:inline text-border-subtle">·</span>}
      <div className="flex items-center gap-2">
        <Target className="size-4 text-text-muted" />
        <span>
          <span className="text-text-muted mr-1">Score:</span>
          <span className="font-medium text-text-primary">{assignment.maxScore}</span>
        </span>
      </div>
      {!isMobile && <span className="hidden md:inline text-border-subtle">·</span>}
      <div className="flex items-center gap-2">
        <RotateCcw className="size-4 text-text-muted" />
        <span>
          <span className="text-text-muted mr-1">Attempts:</span>
          <span className="font-medium text-text-primary">{assignment.numberOfAttempts}</span>
        </span>
      </div>
    </div>
  );

  const PaginationControl = ({ result }: { result: any }) => {
    if (!result) return null;
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4 bg-bg-primary">
        <div className="text-sm text-text-secondary">
          Showing <span className="font-medium text-text-primary">{((page - 1) * limit) + 1}–{Math.min(page * limit, result.totalItems)}</span> of{" "}
          <span className="font-medium text-text-primary">{result.totalItems}</span> entries
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary font-medium whitespace-nowrap">Rows per page</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="h-8 bg-bg-primary shadow-border rounded-button px-2 text-xs outline-none focus:ring-0 focus-visible:ring-0 transition-all border border-border-subtle"
            >
              {[10, 20, 25].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="size-8"
            >
              <ChevronLeft className="size-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.max(1, result.totalPages) }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={page === p ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setPage(p)}
                  className={`size-8 text-xs font-bold transition-all ${page === p ? "bg-bg-secondary text-text-primary shadow-border border-border-subtle border" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {p}
                </Button>
              ))}
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setPage(p => Math.min(result.totalPages || 1, p + 1))}
              disabled={page === (result.totalPages || 1)}
              className="size-8"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="flex-1 flex-col h-full bg-bg-primary overflow-y-auto font-sans">
        <header className="p-4 pb-3 bg-bg-primary border-b border-border-subtle sticky top-0 z-20 space-y-3">
          <div 
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
            onClick={handleBack}
          >
            <ArrowLeft className="size-4" />
            <span className="font-medium">Back to Assignments</span>
          </div>
          
          <h1 className="text-xl font-bold text-text-primary tracking-tight leading-tight line-clamp-2">
            {assignment.title}
          </h1>
        </header>

        <div className="px-4 py-3 bg-bg-primary border-b border-border-subtle/40">
          <MetadataRow />
        </div>

        <div className="flex border-b border-border-subtle bg-bg-primary sticky top-[138px] z-10">
          <button 
            className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === "instructions" ? "text-text-primary" : "text-text-secondary"}`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
            {activeTab === "instructions" && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-text-primary mx-4" />}
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === "submissions" ? "text-text-primary" : "text-text-secondary"}`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions
            {activeTab === "submissions" && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-text-primary mx-4" />}
          </button>
        </div>

        <div className="p-4 pb-20 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "instructions" ? (
              <motion.div 
                key="instructions"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed bg-bg-secondary/10 p-4 rounded-card border border-border-subtle/40 shadow-sm">
                  <ReactMarkdown>
                    {assignment.instructions}
                  </ReactMarkdown>
                </div>

                {assignment.attachment && (
                  <div className="p-4 rounded-card border border-border-subtle flex items-center justify-between gap-3 bg-bg-secondary/30 shadow-border">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="size-5 text-accent-blue shrink-0" />
                      <div className="text-sm font-medium text-text-primary truncate">{assignment.attachment.filename}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-8 px-3">Download</Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="submissions"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                {/* Vertical Filters */}
                <div className="space-y-4 p-4 rounded-card border border-border-subtle bg-bg-secondary/20 shadow-border">
                  <div className="space-y-1.5 font-sans">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">From Date</label>
                    <input 
                      type="date" 
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1.5 font-sans">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">To Date</label>
                    <input 
                      type="date" 
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1.5 font-sans">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</label>
                    <select 
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all cursor-pointer appearance-none pr-8 font-medium"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="submitted">Submitted</option>
                      <option value="done-late">Done Late</option>
                      <option value="graded">Graded</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 font-sans">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Sort By</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all cursor-pointer appearance-none pr-8 font-medium"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                    >
                      <option value="submitted_at_desc">Newest First</option>
                      <option value="submitted_at_asc">Oldest First</option>
                      <option value="grade_desc">Highest Grade</option>
                      <option value="grade_asc">Lowest Grade</option>
                    </select>
                  </div>
                </div>

                {/* Submissions Card List */}
                <div className="space-y-3">
                  {submissionsResult?.data.map((sub) => (
                    <div key={sub.id} className="p-4 bg-bg-primary shadow-border border border-border-subtle/50 rounded-card space-y-3 active:scale-[0.98] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-text-primary tracking-tight leading-tight truncate font-sans">{sub.username}</div>
                          <div className="text-[10px] text-text-secondary font-medium truncate font-sans">{sub.email}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="size-8 p-0 text-text-secondary hover:text-text-primary rounded-button shrink-0 border border-border-subtle/50 shadow-sm shadow-border">
                          <Eye className="size-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 pt-1">
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest font-sans">Attempt</div>
                          <div className="text-xs font-semibold text-text-primary truncate font-sans">{sub.attempt} / {sub.maxAttempt}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest font-sans">Score</div>
                          <div className="text-xs font-bold text-text-primary truncate font-sans">
                            {sub.score !== null ? `${sub.score} / ${sub.maxScore}` : "N/A"}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest font-sans">Status</div>
                          <div>{getStatusBadge(sub.status)}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest font-sans">Submitted At</div>
                          <div className="text-[11px] font-medium text-text-secondary truncate font-sans">
                            {new Date(sub.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {submissionsResult?.data.length === 0 && (
                    <div className="py-12 text-center text-text-secondary italic text-sm font-sans">
                      No submissions found matching criteria
                    </div>
                  )}
                </div>

                <PaginationControl result={submissionsResult} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary overflow-y-auto p-8 max-w-5xl mx-auto w-full font-sans">
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

      <div className="mb-8 font-sans">
        <MetadataRow />
      </div>

      <div className="flex gap-6 border-b border-border-subtle mb-6">
        <button 
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "instructions" ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
          {activeTab === "instructions" && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-text-primary" />}
        </button>
        <button 
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "submissions" ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
          {activeTab === "submissions" && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-text-primary" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "instructions" ? (
          <motion.div 
            key="instructions-desktop"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed font-sans">
              <ReactMarkdown>
                {assignment.instructions}
              </ReactMarkdown>
            </div>
            
            {assignment.attachment && (
              <div className="p-4 rounded-card border border-border-subtle flex items-center gap-3 bg-bg-secondary/30 shadow-border">
                <FileText className="size-5 text-accent-blue" />
                <div className="flex-1 text-sm font-medium text-text-primary truncate font-sans">{assignment.attachment.filename}</div>
                <Button variant="ghost" size="sm" className="text-xs h-8 px-3">Download</Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="submissions-desktop"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 bg-bg-primary shadow-border rounded-card md:items-end">
              <div className="space-y-1.5 flex-1 min-w-[140px] font-sans">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">From Date</label>
                <input 
                  type="date" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5 flex-1 min-w-[140px] font-sans">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">To Date</label>
                <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5 flex-1 min-w-[140px] font-sans">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all cursor-pointer appearance-none pr-8 font-medium"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="done-late">Done Late</option>
                  <option value="graded">Graded</option>
                </select>
              </div>
              <div className="space-y-1.5 flex-1 min-w-[140px] font-sans">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full h-9 px-3 text-sm rounded-button border border-border-subtle bg-bg-primary focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all cursor-pointer appearance-none pr-8 font-medium"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                >
                  <option value="submitted_at_desc">Newest First</option>
                  <option value="submitted_at_asc">Oldest First</option>
                  <option value="grade_desc">Highest Grade</option>
                  <option value="grade_asc">Lowest Grade</option>
                </select>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="border border-border-subtle rounded-card overflow-hidden shadow-sm shadow-border">
              <table className="w-full text-sm text-left font-sans">
                <thead className="bg-bg-secondary/50 border-b border-border-subtle">
                  <tr>
                    <th className="px-4 py-3 font-bold text-text-secondary text-[11px] uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 font-bold text-text-secondary text-[11px] uppercase tracking-wider text-center">Attempt</th>
                    <th className="px-4 py-3 font-bold text-text-secondary text-[11px] uppercase tracking-wider text-center">Score</th>
                    <th className="px-4 py-3 font-bold text-text-secondary text-[11px] uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 font-bold text-text-secondary text-[11px] uppercase tracking-wider">Submitted At</th>
                    <th className="px-4 py-3 font-bold text-text-secondary text-[11px] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {submissionsResult?.data.map((sub) => (
                    <tr key={sub.id} className="hover:bg-bg-secondary/30 transition-colors group">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-text-primary leading-none mb-1 font-sans">{sub.username}</div>
                        <div className="text-[11px] text-text-secondary font-medium tracking-tight font-sans">{sub.email}</div>
                      </td>
                      <td className="px-4 py-4 text-center font-medium text-text-secondary font-sans">
                        {sub.attempt} / {sub.maxAttempt}
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-text-primary font-sans">
                        {sub.score !== null ? (
                          <span>{sub.score} / {sub.maxScore}</span>
                        ) : (
                          <span className="text-text-secondary font-medium font-sans">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(sub.status)}
                      </td>
                      <td className="px-4 py-4 text-text-secondary whitespace-nowrap font-sans">
                        {new Date(sub.submittedAt).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="sm" className="size-8 p-0 text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all">
                          <Eye className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {submissionsResult?.data.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-secondary italic font-sans">
                        No submissions found matching the criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <PaginationControl result={submissionsResult} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
