"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "./videojs-plugins";

const getVideoType = (src) => {
  if (!src) return "";
  const match = src.match(/\.([a-zA-Z0-9]+)($|\?)/);
  const ext = match ? match[1].toLowerCase() : "";

  const typeMap = {
    m3u8: "application/x-mpegURL",
    mp4: "video/mp4",
    mov: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    "3gp": "video/3gpp",
    ogg: "video/ogg",
    ogv: "video/ogg",
    avi: "video/x-msvideo",
    wmv: "video/x-ms-wmv",
    flv: "video/x-flv",
    ts: "video/mp2t",
  };

  return typeMap[ext] || "";
};

export default function VideoPlayer({
  src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  className,
  startTime = 0,
  onClose,
  onTimeUpdate,
  filmId,
  isFullFilm = false,
}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const searchParams = useSearchParams();
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const timeUpdateInterval = useRef(null);
  const lastReportedTime = useRef(0);

  // ✅ Store initial start time in a ref to prevent re-initialization
  const initialStartTimeRef = useRef(
    Number(searchParams.get("time")) || startTime
  );

  // ✅ Use refs for callbacks to prevent effect re-execution
  const onTimeUpdateRef = useRef(onTimeUpdate);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
    onCloseRef.current = onClose;
  }, [onTimeUpdate, onClose]);

  const reportWatchTime = (currentTime) => {
    if (isFullFilm && onTimeUpdateRef.current && currentTime > 5) {
      const timeInSeconds = Math.floor(currentTime);
      if (timeInSeconds > lastReportedTime.current + 10) {
        lastReportedTime.current = timeInSeconds;
        onTimeUpdateRef.current(currentTime);
      }
    }
  };

  const startTimeTracking = (player) => {
    if (isFullFilm) {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }

      timeUpdateInterval.current = setInterval(() => {
        if (player && !player.paused() && !player.ended()) {
          const currentTime = player.currentTime();
          reportWatchTime(currentTime);
        }
      }, 30000);
    }
  };

  const stopTimeTracking = (player) => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }

    if (isFullFilm && player) {
      const currentTime = player.currentTime();
      reportWatchTime(currentTime);
    }
  };

  useEffect(() => {
    if (!src) return;

    // Create video element
    const videoElement = document.createElement("video-js");
    videoElement.className = "vjs-big-play-centered video-js";

    // Clear container and add video element
    if (videoRef.current) {
      videoRef.current.innerHTML = "";
      videoRef.current.appendChild(videoElement);
    }

    const options = {
      autoplay: true,
      controls: true,
      responsive: true,
      preload: "auto",
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      sources: [
        {
          src,
          ...(getVideoType(src) ? { type: getVideoType(src) } : {}),
        },
      ],
      plugins: {
        hotkeys: {
          volumeStep: 0.2,
          seekStep: 10,
          enableModifiersForNumbers: false,
        },
      },
    };

    // Initialize VideoJS
    const player = videojs(videoElement, options);
    playerRef.current = player;

    player.ready(() => {
      setIsPlayerReady(true);

      // ✅ Enable resolution selector
      if (player.hlsQualitySelector) {
        player.hlsQualitySelector({
          displayCurrentQuality: true,
          default: "auto",
        });
      }

      // ✅ Use ref value instead of state/prop
      if (initialStartTimeRef.current > 0) {
        player.currentTime(initialStartTimeRef.current);
      }
    });

    // Event listeners
    player.on("play", () => {
      startTimeTracking(player);
    });

    player.on("pause", () => {
      stopTimeTracking(player);
    });

    player.on("seeked", () => {
      if (isFullFilm) {
        const currentTime = player.currentTime();
        reportWatchTime(currentTime);
      }
    });

    player.on("ended", () => {
      stopTimeTracking(player);
    });

    player.on("error", (error) => {
      console.error("Video player error:", error);
    });

    // Cleanup function
    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
        timeUpdateInterval.current = null;
      }

      if (player && !player.isDisposed()) {
        const lastTime = player.currentTime();

        if (isFullFilm && lastTime > 0) {
          reportWatchTime(lastTime);
        }

        if (onCloseRef.current) onCloseRef.current(lastTime);

        player.dispose();
      }

      playerRef.current = null;
      setIsPlayerReady(false);
    };
  }, [src, isFullFilm]); // ✅ Removed callbacks from dependencies to prevent re-initialization

  return (
    <div data-vjs-player className="video-js-container">
      <div
        ref={videoRef}
        className={cn("rounded-md overflow-hidden max-w-4xl", className)}
        style={{ minHeight: "400px", backgroundColor: "#000" }}
      />
      {!isPlayerReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          Loading player...
        </div>
      )}
    </div>
  );
}
