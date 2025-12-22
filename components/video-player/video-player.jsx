"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "./videojs-plugins";

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

  // ✅ take from query first, fallback to prop
  const initialStartTime = Number(searchParams.get("time")) || startTime;

  const reportWatchTime = (currentTime) => {
    if (isFullFilm && onTimeUpdate && currentTime > 5) {
      // Only report if more than 5 seconds
      const timeInSeconds = Math.floor(currentTime);
      // Only report if time has progressed by at least 10 seconds
      if (timeInSeconds > lastReportedTime.current + 10) {
        lastReportedTime.current = timeInSeconds;
        onTimeUpdate(currentTime);
        // console.log("Reporting watch time:", timeInSeconds, "seconds");
      }
    }
  };

  const startTimeTracking = (player) => {
    if (isFullFilm && onTimeUpdate) {
      // Clear any existing interval
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }

      // Start reporting time every 30 seconds during playback (reduced frequency)
      timeUpdateInterval.current = setInterval(() => {
        if (player && !player.paused() && !player.ended()) {
          const currentTime = player.currentTime();
          reportWatchTime(currentTime);
        }
      }, 30000); // Report every 30 seconds instead of 10
    }
  };

  const stopTimeTracking = (player) => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }

    // Report current time immediately
    if (isFullFilm && onTimeUpdate && player) {
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
          type: "application/x-mpegURL",
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
      // console.log("Player is ready");
      setIsPlayerReady(true);

      // ✅ Enable resolution selector
      if (player.hlsQualitySelector) {
        player.hlsQualitySelector({
          displayCurrentQuality: true,
          default: "auto",
        });
      }

      // Seek to startTime if provided
      if (initialStartTime > 0) {
        player.currentTime(initialStartTime);
      }
    });

    // Event listeners
    player.on("play", () => {
      // console.log("Video started playing");
      startTimeTracking(player);
    });

    player.on("pause", () => {
      // console.log("Video paused");
      stopTimeTracking(player);
    });

    player.on("seeked", () => {
      // console.log("Video seeked");
      if (isFullFilm && onTimeUpdate) {
        const currentTime = player.currentTime();
        reportWatchTime(currentTime);
      }
    });

    player.on("ended", () => {
      // console.log("Video ended");
      stopTimeTracking(player);
    });

    player.on("error", (error) => {
      console.error("Video player error:", error);
    });

    player.on("waiting", () => {
      // console.log("player is waiting");
    });

    // Cleanup function
    return () => {
      // console.log("Cleaning up video player");

      // Clear interval
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
        timeUpdateInterval.current = null;
      }

      if (player && !player.isDisposed()) {
        const lastTime = player.currentTime();

        // Final time update on component unmount
        if (isFullFilm && onTimeUpdate && lastTime > 0) {
          reportWatchTime(lastTime);
        }

        if (onClose) onClose(lastTime);

        player.dispose();
      }

      playerRef.current = null;
      setIsPlayerReady(false);
    };
  }, [src, initialStartTime, isFullFilm, onTimeUpdate, onClose]);

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
