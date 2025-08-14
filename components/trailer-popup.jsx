import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PlayIcon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import VideoPlayer from "./video-player/video-player";

export default function TrailerPopup({ movie }) {
  const { trailer_url, title } = movie;
  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-2 left-2 ">
        <Button
          variant="destructive"
          size="sm"
          className="rounded-full"
          asChild
        >
          <span>
            <HugeiconsIcon icon={PlayIcon} size={25} />
            Trailer
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title} — Trailer</DialogTitle>
          <DialogDescription className="text-base -mt-1">
            Watch the official trailer
          </DialogDescription>
        </DialogHeader>

        {/* Trailer Player */}
        <VideoPlayer src={trailer_url} />
      </DialogContent>
    </Dialog>
  );
}
