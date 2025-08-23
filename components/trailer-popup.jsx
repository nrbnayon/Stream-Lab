"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import VideoPlayer from "./video-player/video-player";

export default function TrailerPopup({
  movie = {
    trailer_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    title: "Movie Title",
  },
  triggerBtn,
  absolute = false,
}) {
  const { trailer_url, title } = movie;
  return (
    <Dialog>
      <DialogTrigger
        className={`${absolute ? "absolute bottom-2 left-2" : ""}`}
      >
        {triggerBtn}
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
