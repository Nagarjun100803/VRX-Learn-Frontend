import React, { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/lib/auth-context";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  src: string;
}

export function PDFViewer({ src }: PDFViewerProps) {
  const { role } = useAuth();
  const isAdmin = role === "admin";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout|null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (err: Error) => {
    console.error("PDF Load Error:", err);
    setError("Failed to load PDF. Documents might be restricted by CORS or be invalid.");
    setIsLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prev => {
      const next = prev + offset;
      if (next < 1) return 1;
      if (next > numPages) return numPages;
      return next;
    });
    
    // Auto-scroll on desktop when paginated
    if (window.innerWidth >= 768) {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = useCallback(() => changePage(-1), [numPages]);
  const nextPage = useCallback(() => changePage(1), [numPages]);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < 1) setPageNumber(1);
      else if (value > numPages) setPageNumber(numPages);
      else setPageNumber(value);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const adjustZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(prev + delta, 0.4), 3.0));
  };

  const fitToWidth = () => {
     if (containerRef.current) {
        const width = containerRef.current.clientWidth - 48;
        // Assume default PDF width is ~600pt
        setScale(width / 600);
     }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        prevPage();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        nextPage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [prevPage, nextPage]);

  const showControlsTemporarily = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isFullscreen) setIsControlsVisible(true); // Keep visible on desktop
      else setIsControlsVisible(false);
    }, 3000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Controls = ({ isMobile }: { isMobile?: boolean }) => (
    <div className={`
      flex items-center justify-between gap-4 p-3 
      ${isMobile 
        ? "sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-md shadow-border" 
        : "bg-bg-secondary/90 backdrop-blur-md shadow-border rounded-button border border-border-subtle"
      }
    `}>
      {/* Page Info & Nav */}
      <div className="flex items-center gap-1.5">
        <ControlBtn onClick={prevPage} disabled={pageNumber <= 1} isMinimal={!isMobile}>
          <ChevronLeft className="size-4" />
        </ControlBtn>
        
        <div className="flex items-center gap-1 px-2 h-8 rounded-button bg-bg-primary/50 shadow-border">
          <input 
            type="number" 
            value={pageNumber} 
            onChange={handlePageInput}
            className="w-8 bg-transparent text-text-primary text-[11px] font-mono text-center focus:outline-none"
          />
          <span className="text-[10px] text-text-secondary uppercase font-bold tabular-nums">
            / {numPages || "?"}
          </span>
        </div>

        <ControlBtn onClick={nextPage} disabled={pageNumber >= numPages || numPages === 0} isMinimal={!isMobile}>
          <ChevronRight className="size-4" />
        </ControlBtn>
      </div>

      {/* Zoom & Screen */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center h-8 rounded-button bg-bg-primary/50 shadow-border overflow-hidden">
           <ControlBtn onClick={() => adjustZoom(-0.1)} className="border-none rounded-none w-8 hover:bg-bg-secondary">
             <ZoomOut className="size-4" />
           </ControlBtn>
           <span className="px-2 text-[10px] text-text-primary font-mono min-w-[50px] text-center border-x border-border-subtle">
             {Math.round(scale * 100)}%
           </span>
           <ControlBtn onClick={() => adjustZoom(0.1)} className="border-none rounded-none w-8 hover:bg-bg-secondary">
             <ZoomIn className="size-4" />
           </ControlBtn>
        </div>

        <ControlBtn onClick={fitToWidth} title="Fit to width" className="hidden xs:flex">
          <Maximize2 className="size-3.5" />
        </ControlBtn>

        {isAdmin && (
          <ControlBtn onClick={handleDownload} title="Download PDF" className="hover:text-accent-blue">
            <Download className="size-3.5" />
          </ControlBtn>
        )}

        <ControlBtn onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        </ControlBtn>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={`
        relative group flex flex-col bg-bg-secondary rounded-card overflow-hidden shadow-border select-none transition-all
        ${isFullscreen ? "fixed inset-0 z-50 rounded-none bg-bg-primary" : "min-h-[60vh] md:h-[80vh] w-full"}
      `}
      onMouseMove={showControlsTemporarily}
    >
      {/* Mobile Sticky Top Controls */}
      <div className="md:hidden">
        <Controls isMobile />
      </div>

      {/* Scrollable Viewer Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-auto custom-scrollbar flex flex-col items-center scroll-smooth bg-bg-secondary/30"
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <Loader2 className="size-8 text-text-secondary animate-spin opacity-40" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative py-8 md:py-12 flex flex-col items-center gap-6 md:gap-12 w-full">
          <Document 
            file={src} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="flex flex-col items-center w-full"
          >
            {/* Mobile: Render all pages for vertical scroll */}
            <div className="md:hidden flex flex-col items-center gap-4 w-full">
              {Array.from(new Array(numPages), (_, index) => (
                <div key={index} className="w-full flex justify-center px-4">
                  <Page 
                    pageNumber={index + 1} 
                    scale={scale} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                    className="shadow-card max-w-full"
                    width={containerRef.current?.clientWidth ? containerRef.current.clientWidth - 32 : undefined}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Paginated view */}
            <div className="hidden md:flex flex-col items-center w-full">
               <Page 
                pageNumber={pageNumber} 
                scale={scale * (isFullscreen ? 1.2 : 1)} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                className="shadow-card max-w-[95%]"
              />
            </div>
          </Document>

          {error && (
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
              <AlertCircle className="size-10 text-accent-red opacity-80" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-text-primary">Unable to display PDF</h3>
                <p className="text-xs text-text-secondary max-w-xs">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Floating Bottom Controls */}
      <AnimatePresence>
        {isControlsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4"
          >
            <Controls />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ControlBtn({ 
  children, 
  onClick, 
  disabled, 
  title, 
  className,
  isMinimal
}: { 
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  className?: string;
  isMinimal?: boolean;
}) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        size-8 flex items-center justify-center rounded-button transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95
        ${isMinimal 
          ? "text-text-secondary hover:text-text-primary hover:bg-bg-primary/50" 
          : "bg-bg-primary text-text-primary shadow-border hover:bg-bg-secondary"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
