"use client";
import VideoPlayer from "@/components/video-player/video-player";

export default function VideoPlayerClient() {
  return (
    <VideoPlayer
      src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      className="max-w-4xl"
    />
  );
}
