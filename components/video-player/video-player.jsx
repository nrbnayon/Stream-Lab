import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "videojs-hotkeys";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

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
    if (player.hlsQualitySelector) {
      player.hlsQualitySelector({
        displayCurrentQuality: true,
        default: "auto",
      });
    }

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
  }, [options, videoRef]);
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);
  return (
    <div data-vjs-player>
      <div ref={videoRef} tabIndex="0" />
    </div>
  );
}
