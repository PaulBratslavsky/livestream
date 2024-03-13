import { useEffect, useRef, useState, useCallback } from "react";
import { parseStartTime, parseEndTime } from "~/lib/utils";
import { YouTubePlaylist } from "./YouTubePlaylist";
import { PlayerControls } from "./PlayerControls";

const playing = false;
const muted = false;
const controls = true;
const playsinline = false;
const rel = false;

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

let apiLoaded = false;
const playerInitializers = new Map();

const YouTubePlayer = ({
  id,
  playerKey,
  playlist,
  height,
}: {
  id: string;
  playerKey: string;
  playlist: any[];
  height?: string;
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const url = `https://www.youtube.com/watch?v=${id}`;

  const initializeYouTubePlayer = useCallback(() => {
    if (!id || !playerRef.current) return;
    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      width: "100%",
      height: height || "450px",
      videoId: id,
      playerVars: {
        autoplay: playing ? 1 : 0,
        mute: muted ? 1 : 0,
        controls: controls ? 1 : 0,
        start: parseStartTime(url),
        end: parseEndTime(url),
        playsinline: playsinline ? 1 : 0,
        iv_load_policy: 1,
        rel: rel ? 1 : 0,
      },
    });
  }, [id, url]);

  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  useEffect(() => {
    playerInitializers.set(playerKey, initializeYouTubePlayer);

    if (!apiLoaded) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];

      if (firstScriptTag.parentNode)
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        apiLoaded = true;
        playerInitializers.forEach((initialize) => initialize());
      };
    } else if (apiLoaded) {
      initializeYouTubePlayer();
    }

    return () => {
      playerInitializers.delete(playerKey);
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, [initializeYouTubePlayer, playerKey]);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      playerInstanceRef.current.seekTo(playlist[currentClipIndex].start);
      playerInstanceRef.current.playVideo();
      timer = setTimeout(() => {
        if (currentClipIndex + 1 === playlist.length) {
          setIsPlaying(false);
          return;
        }
        setCurrentClipIndex(currentClipIndex + 1);
      }, (playlist[currentClipIndex].end - playlist[currentClipIndex].start) * 1000);
    }
    return () => clearTimeout(timer);
  }, [currentClipIndex, isPlaying, playerInstanceRef]);

  const handlePlay = () => {
    if (playerInstanceRef.current) {
      if (isPlaying) {
        playerInstanceRef.current.pauseVideo();
      } else {
        playerInstanceRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.stopVideo();
      setIsPlaying(false);
    }
  };

  const handleSeekForward = () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.seekTo(
        playerInstanceRef.current.getCurrentTime() + 5,
        true
      );
    }
  };

  const handleSeekBackward = () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.seekTo(
        playerInstanceRef.current.getCurrentTime() - 5,
        true
      );
    }
  };

  const handleRestart = () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.seekTo(0);
      setCurrentClipIndex(0);
      !isPlaying && handlePlay();
    }
  };

  const handleNextClip = () => {
    if (currentClipIndex < playlist.length - 1) {
      setCurrentClipIndex(currentClipIndex + 1);
    } else {
      setCurrentClipIndex(0);
    }
    !isPlaying && handlePlay();
  };

  const handlePrevClip = () => {
    if (currentClipIndex > 0) {
      setCurrentClipIndex(currentClipIndex - 1);
    } else {
      setCurrentClipIndex(playlist.length - 1);
    }
    !isPlaying && handlePlay();
  };

  const handlePlayPlaylist = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  if (!id || !playlist)
    return (
      <p className="text-white container mx-auto">No playlist provided.</p>
    );

  return (
    <div className="bg-slate-800 py-4">
      <div className="container mx-auto grid grid-cols-7 gap-4 my-4">
        <div className="col-span-5">
          <div className="overflow-hidden rounded-lg" ref={playerRef} id={id} />
          <PlayerControls
            isPlaying={isPlaying}
            playVideo={handlePlay}
            pauseVideo={handleStop}
            restartVideo={handleRestart}
            seekForward={handleSeekForward}
            seekBackward={handleSeekBackward}
            playPlaylist={handlePlayPlaylist}
            nextClip={handleNextClip}
            prevClip={handlePrevClip}
          />
        </div>
        <div className="col-span-2">
          <YouTubePlaylist
            player={playerInstanceRef.current}
            isPlaying={isPlaying}
            playVideo={handlePlay}
            playlist={playlist}
            currentClipIndex={currentClipIndex}
            setCurrentClipIndex={setCurrentClipIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
