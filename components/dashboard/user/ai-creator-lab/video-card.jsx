// components/dashboard/user/ai-creator-lab/video-card.jsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download01Icon, PlayIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Trash2 } from "lucide-react";
import DeleteConfirmationModal from "./delete-confirmation-modal";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_THUMBNAIL =
  "https://i.pinimg.com/736x/ac/79/dd/ac79ddd7af3b06b3ced6c1822f16fe13.jpg";

export default function VideoCard({ video }) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isProcessing = video?.status === "processing";
  const thumbnail = video?.thumbnail || FALLBACK_THUMBNAIL;
  const duration =
    video?.metadata?.duration || video?.duration || video?.length || "0:08";
  const playbackUrl =
    video?.playback_url ||
    video?.output_url ||
    video?.url ||
    video?.download_url ||
    "";
  const downloadUrl =
    video?.download_url || video?.output_url || video?.file_url || null;
  const prompt = video?.prompt || "Generated video";
  const canPlay = Boolean(playbackUrl);

  const handleDelete = (e) => {
    e.stopPropagation();
    setDeleteOpen(true);
  };

  if (isProcessing) {
    return (
      <>
        <div className="group relative w-full max-w-48 aspect-[9/16] overflow-hidden rounded-md">
          <Skeleton className="w-full h-full rounded-md" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-3"></div>
              <p className="text-xs text-white font-medium">Processing...</p>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 bg-primary/70 hover:bg-primary/90 rounded-full backdrop-blur-sm"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 text-white" />
              <span className="sr-only">Delete video</span>
            </Button>
          </div>
        </div>
        <DeleteConfirmationModal
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          generation={video}
        />
      </>
    );
  }

  return (
    <>
      {/* Card Preview */}
      <button
        type="button"
        onClick={() => canPlay && setOpen(true)}
        disabled={!canPlay}
        className="group relative w-full max-w-48 aspect-[9/16] overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        <video
          src={playbackUrl || thumbnail}
          className="w-full h-full object-cover rounded-md pointer-events-none"
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-50 group-hover:opacity-100 transition-opacity rounded-md">
          <HugeiconsIcon
            icon={PlayIcon}
            size={48}
            className="text-white drop-shadow-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/70 to-transparent text-white">
          <span className="text-xs font-medium drop-shadow-md">{duration}</span>

          {downloadUrl ? (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"
              asChild
            >
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={(e) => e.stopPropagation()}
              >
                <HugeiconsIcon icon={Download01Icon} size={18} />
                <span className="sr-only">Download video</span>
              </a>
            </Button>
          ) : (
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center cursor-not-allowed">
              <HugeiconsIcon
                icon={Download01Icon}
                size={18}
                className="text-white opacity-50"
              />
              <span className="sr-only">Download unavailable</span>
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-primary/70 hover:bg-primary/90 rounded-full backdrop-blur-sm"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 text-white" />
            <span className="sr-only">Delete video</span>
          </Button>
        </div>
      </button>

      {/* Fullscreen Modal */}
      {canPlay && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="max-w-4xl p-6 md:p-10 bg-black rounded-xl shadow-2xl"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <VisuallyHidden>
              <DialogTitle>Video Player</DialogTitle>
              <DialogDescription>Playing video: {prompt}</DialogDescription>
            </VisuallyHidden>
            <div className="relative w-full">
              <video
                src={playbackUrl}
                controls
                autoPlay
                className="w-full rounded-lg shadow-2xl"
                preload="metadata"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <DeleteConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        generation={video}
      />
    </>
  );
}
