"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "./videojs-plugins";

export default function VideoPlayer({
  // TODO: Remove default video
  src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  className,
  startTime = 0, // fallback start time if no query param
  onClose,
}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const searchParams = useSearchParams();

  // ✅ take from query first, fallback to prop
  const initialStartTime = Number(searchParams.get("time")) || startTime;

  // options
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
  //   handle Player is Ready
  const onReady = (player) => {
    playerRef.current = player;

    // Enable resolution selector
    // if (player.hlsQualitySelector) {
    //   player.hlsQualitySelector({
    //     displayCurrentQuality: true,
    //     default: "auto",
    //   });
    // }

    // Seek to startTime if provided
    player.on("loadedmetadata", () => {
      if (initialStartTime > 0) {
        player.currentTime(initialStartTime);
      }
    });

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [src]);
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        // ✅ Save last watched time before disposing
        const lastTime = player.currentTime();
        if (onClose) onClose(lastTime);

        player.dispose();
        playerRef.current = null;
      }
    };
  }, [onClose]);
  return (
    <div data-vjs-player>
      <div
        ref={videoRef}
        tabIndex="0"
        className={cn("rounded-md overflow-clip max-w-4xl", className)}
      />
    </div>
  );
}
