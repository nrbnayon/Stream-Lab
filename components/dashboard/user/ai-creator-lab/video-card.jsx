import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download01Icon, PlayIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const FALLBACK_THUMBNAIL =
  "https://i.pinimg.com/736x/ac/79/dd/ac79ddd7af3b06b3ced6c1822f16fe13.jpg";

export default function VideoCard({ video }) {
  const [open, setOpen] = useState(false);

  const thumbnail = video?.thumbnail || FALLBACK_THUMBNAIL;
  const duration =
    video?.metadata?.duration || video?.duration || video?.length || "0:08";
  const playbackUrl =
    video?.playback_url ||
    video?.output_url ||
    video?.url ||
    video?.download_url;
  const downloadUrl =
    video?.download_url || video?.output_url || video?.file_url || null;
  const prompt = video?.prompt || "Generated video";
  const canPlay = Boolean(playbackUrl);

  return (
    <>
      <button
        type="button"
        className="relative w-full max-w-48 aspect-[9/16]"
        onClick={() => canPlay && setOpen(true)}
        disabled={!canPlay}
      >
        <Image
          src={thumbnail}
          alt={prompt}
          className="rounded-md object-cover"
          fill
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-lg">
          <HugeiconsIcon icon={PlayIcon} size={40} className="cursor-pointer" />
        </span>
        <span className="z-10 absolute bottom-0 flex items-center justify-between w-full px-3 bg-secondary/50">
          <span className="text-sm">{duration}</span>
          {downloadUrl ? (
            <Button
              size="icon"
              variant="ghost"
              className="bg-secondary/25 rounded-full"
              asChild
            >
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <HugeiconsIcon icon={Download01Icon} />
              </a>
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="bg-secondary/25 rounded-full"
              disabled
            >
              <HugeiconsIcon icon={Download01Icon} />
            </Button>
          )}
        </span>
      </button>
      {canPlay && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{prompt}</DialogTitle>
            </DialogHeader>
            <video
              controls
              src={playbackUrl}
              className="w-full rounded-md"
              preload="metadata"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
