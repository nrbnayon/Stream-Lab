"use client";
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

export default function TrailerPopup({
  movie = {
    trailer_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    title: "Movie Title",
  },
  absolute = true,
}) {
  const { trailer_url, title } = movie;
  return (
    <Dialog>
      <DialogTrigger
        className={`${absolute ? "absolute bottom-2 left-2" : ""}`}
      >
        <Button
          variant={`${absolute ? "destructive" : "default"}`}
          size={`${absolute ? "sm" : "default"}`}
          className={`${absolute ? "rounded-full" : ""}`}
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
          <DialogTitle>{title} — Trailer</DialogTitle>
          <DialogDescription className="-mt-1">
            Watch the official trailer
          </DialogDescription>
        </DialogHeader>
        {/* Trailer Player */}
        <VideoPlayer src={trailer_url} />
      </DialogContent>
    </Dialog>
  );
}
