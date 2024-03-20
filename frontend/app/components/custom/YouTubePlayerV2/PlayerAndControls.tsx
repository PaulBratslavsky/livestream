import { useState } from "react";
import { YouTubePlayer } from "~/components/custom/YouTubePlayerV2/YouTubePlayer";
import { YouTubePlaylist } from "~/components/custom/YouTubePlayerV2/YouTubePlaylist";

interface PlayerAndControlsProps {
  videoId: string;
  playlist: any[];
}

export function PlayerAndControls({
  videoId,
  playlist,
}: PlayerAndControlsProps) {
  const [player, setPlayer] = useState<any>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  return (
    <section className="py-6 bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 items-start gap-2 lg:grid-cols-3 lg:gap-4">
        {/* Left column */}
        <div className="grid grid-cols-1 lg:col-span-2">
          <YouTubePlayer
            videoId={videoId}
            playlist={playlist}
            player={player}
            setPlayer={setPlayer}
            currentClipIndex={currentClipIndex}
            setCurrentClipIndex={setCurrentClipIndex}
          />
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1">
          <aside className="rounded-3xl">
            <YouTubePlaylist
              playlist={playlist}
              player={player}
              currentClipIndex={currentClipIndex}
              setCurrentClipIndex={setCurrentClipIndex}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
