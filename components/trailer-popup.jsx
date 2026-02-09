// components/trailer-popup.jsx
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
import { useEffect, useRef, useState } from "react";

export default function TrailerPopup({
  movie = {
    trailer_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    title: "Movie Title",
  },
  triggerBtn,
  absolute = false,
  isOpen,
  onClose,
  netflixMode = false,
}) {
  const { trailer_url, title, logline } = movie;
  const videoRef = useRef(null);
  const [internalOpen, setInternalOpen] = useState(false);

  // Use external state if provided (Netflix mode), otherwise use internal state
  const dialogOpen = netflixMode ? isOpen : internalOpen;

  useEffect(() => {
    if (dialogOpen && videoRef.current) {
      // Auto-play when dialog opens (Netflix-style)
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play?.();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [dialogOpen]);

  const handleOpenChange = (open) => {
    if (netflixMode) {
      if (!open && onClose) {
        onClose();
      }
    } else {
      setInternalOpen(open);
    }
  };

  // Netflix mode: controlled externally
  if (netflixMode) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{title} — Trailer</DialogTitle>
            <DialogDescription className="-mt-1">
              Watch the official trailer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <VideoPlayer
              src={trailer_url}
              ref={videoRef}
              autoPlay={isOpen}
              controls={true}
              muted={false}
            />
            {logline && (
              <div className="bg-transparent rounded-md px-4 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Synopsis</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {logline}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Original mode: with trigger button
  return (
    <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={`${absolute ? "absolute bottom-2 left-2" : ""}`}
      >
        {triggerBtn}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>{title} — Trailer</DialogTitle>
          <DialogDescription className="-mt-1">
            Watch the official trailer
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <VideoPlayer
            src={trailer_url}
            ref={videoRef}
            autoPlay={dialogOpen}
            controls={true}
            muted={false}
          />
          {logline && (
            <div className="bg-transparent rounded-md px-4 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Synopsis</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {logline}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
