import React, { useState } from "react";
import { Bug, X, Trash2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDebugStore, DebugLog } from "@/lib/dev-debug-store";

export function DevDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { logs, clearLogs } = useDebugStore();

  if (process.env.NODE_ENV !== "development") return null;

  const copyToClipboard = (data: any, id: string) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-10 bg-bg-primary border border-border-subtle rounded-full shadow-card flex items-center justify-center hover:bg-bg-secondary transition-colors"
      >
        {isOpen ? <X className="size-5" /> : <Bug className="size-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[400px] max-h-[70vh] bg-bg-primary border border-border-subtle rounded-card shadow-card overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-3 border-b border-border-subtle bg-bg-secondary/50">
              <h3 className="text-sm font-semibold text-text-primary">API Inspector</h3>
              <button
                onClick={clearLogs}
                className="text-text-secondary hover:text-accent-red transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {logs.map((log) => (
                <DebugEntry key={log.id} log={log} onCopy={copyToClipboard} isCopied={copiedId === log.id} />
              ))}
              {logs.length === 0 && (
                <p className="text-center text-xs text-text-secondary py-4">No API logs yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DebugEntry({ log, onCopy, isCopied }: { log: DebugLog; onCopy: (data: any, id: string) => void; isCopied: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const statusColor = log.response ? 
    (log.response.status >= 500 ? "text-accent-red" : log.response.status >= 400 ? "text-yellow-600" : "text-green-600") 
    : "text-accent-red";

  return (
    <div className="border border-border-subtle rounded-button p-2 text-xs space-y-1">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-bg-secondary p-1 rounded" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold text-text-primary">{log.request.method}</span>
          <span className="text-text-secondary truncate max-w-[200px]">{log.request.url}</span>
          <span className={`${statusColor} font-bold`}>{log.response?.status || "ERR"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary">{log.timestamp}</span>
          {expanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </div>
      </div>
      
      {expanded && (
        <div className="space-y-2 pt-2 border-t border-border-subtle font-mono text-[11px]">
          <Section title="Request" data={log.request} onCopy={() => onCopy(log.request, log.id)} />
          {log.response && <Section title="Response" data={log.response} onCopy={() => onCopy(log.response, log.id)} />}
          {log.error && <Section title="Error" data={log.error} onCopy={() => onCopy(log.error, log.id)} />}
        </div>
      )}
    </div>
  );
}

function Section({ title, data, onCopy }: { title: string; data: any; onCopy: () => void }) {
  return (
    <div className="bg-bg-secondary p-2 rounded">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-text-primary">{title}</span>
        <button onClick={onCopy} className="text-text-secondary hover:text-text-primary">
          <Copy className="size-3" />
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
