import { useFetcher } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useEffect } from "react";
import { getVideoTranscript } from "~/api/loaders.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const videoId = params.videoId;
  if (!videoId)
    return json({ message: "No videoId provided" }, { status: 400 });
  const transcript = await getVideoTranscript(videoId);
  return json({ data: transcript.data });
}


interface VideoTranscriptProps {
  videoId: string;
  title: string;
  setTimestamp: (timestamp: number) => void;
}

export function VideoTranscript({
  videoId,
  title,
  setTimestamp,
}: Readonly<VideoTranscriptProps>) {
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load("/resources/video-transcript/" + videoId);
  }, []);

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  if (!fetcher.data) return null;
  if (isLoading) return <div className="bg-pink-500">Loading...</div>;

  const { data } = fetcher.data as any;

  if (!data) return null;

  return (
    <section className="relative py-20 bg-gray-900 rounded-3xl p-20 m-4">
      <h2 className="mb-10 text-3xl text-white ont-semibold font-heading">
        {title}
      </h2>
      <div className="space-y-2 h-[400px] overflow-y-scroll">
      {data.map((item: any, index: number) => (
        <button
          key={index}
          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 py-0.5 px-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={() => setTimestamp(item.offset / 1000)} // Convert milliseconds to seconds
        >
          {item.text}
        </button>
      ))}
    </div>
    </section>
  );
}
