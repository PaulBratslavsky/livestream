import { useState } from "react";
import { Bio } from "~/components/custom/Bio";
import { YouTubePlayer } from "~/components/custom/YouTubePlayerV2/YouTubePlayer";
import { YouTubePlaylist } from "~/components/custom/YouTubePlayerV2/YouTubePlaylist";
import { YouTubePlaylistDescription } from "~/components/custom/YouTubePlayerV2/YouTubePlaylistDescription";

const playlist = [
  {
    id: 23,
    attributes: {
      name: "untitled",
      start: 76.33548579782105,
      end: 111.35646614686584,
      videoUrl:
        "https://www.youtube.com/watch?v=aJ2pYRN8DH0&list=PL7Q0DQYATmvg5Ip7hpXypLf_G3-zEWhR6&index=5",
      videoId: "aJ2pYRN8DH0",
      createdAt: "2023-02-10T16:06:38.284Z",
      updatedAt: "2023-02-10T16:06:38.284Z",
      publishedAt: "2023-02-10T16:06:38.277Z",
    },
  },
  {
    id: 24,
    attributes: {
      name: "untitled",
      start: 113.19228499427795,
      end: 125.80711898283386,
      videoUrl:
        "https://www.youtube.com/watch?v=aJ2pYRN8DH0&list=PL7Q0DQYATmvg5Ip7hpXypLf_G3-zEWhR6&index=5",
      videoId: "aJ2pYRN8DH0",
      createdAt: "2023-02-10T16:07:08.004Z",
      updatedAt: "2023-02-10T16:07:08.004Z",
      publishedAt: "2023-02-10T16:07:08.002Z",
    },
  },
  {
    id: 25,
    attributes: {
      name: "untitled",
      start: 185.9982720076294,
      end: 288.35388380735776,
      videoUrl: "",
      videoId: null,
      createdAt: "2023-02-10T18:12:48.466Z",
      updatedAt: "2023-02-10T18:12:48.466Z",
      publishedAt: "2023-02-10T18:12:48.462Z",
    },
  },
  {
    id: 26,
    attributes: {
      name: "untitled",
      start: 282.8813708893738,
      end: 321.10369987602235,
      videoUrl: "",
      videoId: null,
      createdAt: "2023-02-10T18:13:31.403Z",
      updatedAt: "2023-02-10T18:13:31.403Z",
      publishedAt: "2023-02-10T18:13:31.401Z",
    },
  },
  {
    id: 27,
    attributes: {
      name: "untitled",
      start: 334.3456799294281,
      end: 349.7483709599457,
      videoUrl: "",
      videoId: null,
      createdAt: "2023-02-10T18:15:01.790Z",
      updatedAt: "2023-02-10T18:15:01.790Z",
      publishedAt: "2023-02-10T18:15:01.789Z",
    },
  },
  {
    id: 28,
    attributes: {
      name: "untitled",
      start: 375.7071480267029,
      end: 500.106997835968,
      videoUrl: "",
      videoId: null,
      createdAt: "2023-02-10T18:17:37.240Z",
      updatedAt: "2023-02-10T18:17:37.240Z",
      publishedAt: "2023-02-10T18:17:37.238Z",
    },
  },
  {
    id: 29,
    attributes: {
      name: "untitled",
      start: 499.4712218455048,
      end: 536.9005941659393,
      videoUrl: "",
      videoId: null,
      createdAt: "2023-02-10T18:18:19.130Z",
      updatedAt: "2023-02-10T18:18:19.130Z",
      publishedAt: "2023-02-10T18:18:19.127Z",
    },
  },
];
export default function SingleResourceRoute() {
  const [player, setPlayer] = useState<any>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  return (
    <section className="py-6 bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <YouTubePlayer
            videoId="evN89fdKOxU"
            playlist={playlist}
            player={player}
            setPlayer={setPlayer}
            currentClipIndex={currentClipIndex}
            setCurrentClipIndex={setCurrentClipIndex}
          />

          <YouTubePlaylistDescription />
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          <aside className="rounded-3xl">
            <YouTubePlaylist
              playlist={playlist}
              player={player}
              currentClipIndex={currentClipIndex}
              setCurrentClipIndex={setCurrentClipIndex}
            />
            <Bio />
          </aside>
        </div>
      </div>
    </section>
  );
}
