"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import DeleteConfirmationModal from "./delete-confirmation-modal";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnalyzedScripts({ scripts = [] }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState(null);
  const [expandedScripts, setExpandedScripts] = useState({});

  const handleDelete = (script) => {
    setSelectedScript(script);
    setDeleteOpen(true);
  };

  const toggleExpanded = (scriptId) => {
    setExpandedScripts((prev) => ({
      ...prev,
      [scriptId]: !prev[scriptId],
    }));
  };

  return scripts.length ? (
    <>
      <div className="my-5 flex flex-col gap-6">
        {scripts.map((script, index) => {
          const isProcessing = script?.status === "processing";
          const summaryText =
            script?.analysis_text ??
            script?.summary ??
            script?.metadata?.raw?.analysis_text ??
            "";

          const downloadUrl =
            script?.download_url ||
            script?.output_url ||
            script?.file_url ||
            script?.metadata?.raw?.output_url ||
            null;

          const fileName =
            script?.prompt || script?.file_name || `Script-${index + 1}`;

          const scriptId = script?.id ?? index;
          const isExpanded = expandedScripts[scriptId];

          if (isProcessing) {
            return (
              <div
                key={scriptId}
                className="rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-2 mt-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <p className="text-sm text-muted-foreground">
                      Analyzing script...
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={scriptId}
              className="rounded-lg border bg-card shadow-sm relative"
            >
              <div
                className="flex justify-between items-start gap-4 p-5 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => toggleExpanded(scriptId)}
              >
                <h4 className="font-semibold text-foreground flex-1">
                  {fileName}
                </h4>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(script);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 border-t pt-4">
                  {summaryText ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {summaryText}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No analysis available
                    </p>
                  )}

                  {downloadUrl && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-4"
                      asChild
                    >
                      <a
                        href={downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Notes
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DeleteConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        generation={selectedScript}
      />
    </>
  ) : (
    <p className="text-center text-destructive my-8 text-lg">
      You haven&apos;t analyzed any script yet
    </p>
  );
}
