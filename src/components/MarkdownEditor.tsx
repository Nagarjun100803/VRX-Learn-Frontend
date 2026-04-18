import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export function MarkdownEditor({ value, onChange, label, placeholder, error }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-0.5">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="flex bg-bg-secondary p-0.5 rounded-button shadow-border">
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`
              px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-button transition-all
              ${mode === "edit" ? "bg-bg-primary text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}
            `}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`
              px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-button transition-all
              ${mode === "preview" ? "bg-bg-primary text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}
            `}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="relative min-h-[200px] bg-bg-primary shadow-border rounded-card overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === "edit" ? (
            <motion.textarea
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`
                w-full min-h-[200px] p-4 text-sm bg-transparent outline-none resize-none font-mono leading-relaxed
                ${error ? "placeholder:text-accent-red/50" : "placeholder:text-text-secondary/50"}
              `}
            />
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 min-h-[200px] text-text-primary overflow-y-auto"
            >
              {value ? (
                <div className="markdown-preview space-y-4 text-sm leading-relaxed">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-xl font-bold border-b border-border-subtle pb-2 mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-semibold mt-6 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-base font-semibold mt-4 mb-2">{children}</h3>,
                      p: ({ children }) => <p className="mb-4">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      code: ({ children }) => <code className="bg-bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">{children}</code>,
                      pre: ({ children }) => <pre className="bg-bg-secondary p-4 rounded-card font-mono text-xs overflow-x-auto mb-4">{children}</pre>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-border-subtle pl-4 italic mb-4">{children}</blockquote>,
                    }}
                  >
                    {value}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-text-secondary italic text-xs">Nothing to preview</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <p className="text-[10px] font-medium text-accent-red ml-1">{error}</p>
      )}
    </div>
  );
}
