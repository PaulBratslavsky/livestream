import { useState } from "react";
import { YouTubePlayer } from "~/components/custom/YouTubePlayerV2/YouTubePlayer";
import { YouTubePlaylist } from "~/components/custom/YouTubePlayerV2/YouTubePlaylist";
import { VideoTranscript } from "~/routes/resources.video-transcript.$videoId";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface PlayerAndControlsProps {
  videoId: string;
  playlist: any[];
  title: string;
  description: string;
}

export function PlayerAndControls({
  videoId,
  playlist,
  title,
  description,
}: Readonly<PlayerAndControlsProps>) {
  const [player, setPlayer] = useState<any>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);

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
            timestamp={timeStamp}
          />
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1">
          <aside className="rounded-3xl">
            <Tabs defaultValue="playlist" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="playlist">Playlist</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>
              <TabsContent value="playlist">
                <YouTubePlaylist
                  playlist={playlist}
                  title={title}
                  description={description}
                  player={player}
                  currentClipIndex={currentClipIndex}
                  setCurrentClipIndex={setCurrentClipIndex}
                />
              </TabsContent>
              <TabsContent value="transcript">
                <VideoTranscript
                  videoId={videoId}
                  setTimestamp={setTimeStamp}
                />
              </TabsContent>
            </Tabs>
          </aside>
        </div>
      </div>
    </section>
  );
}
