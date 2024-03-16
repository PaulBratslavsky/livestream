import { useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";

import { getSinglePostsData } from "~/api/loaders.server";
import { Markdown } from "~/components/custom/Markdown";
import YouTubePlayer from "~/components/custom/YouTubePlayer/YouTubePlayer";


interface MetaProps {
  data: {
    postData: {
      title: string;
      description: string;
    };
  };
}

export function meta({ data }: MetaProps) {
  return [
    { title: data?.postData?.title, description: data?.postData.description },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slugId = params;
  // if (!slugId) return json({ message: "No slugId provided" }, { status: 400 });
  // const postData = await getSinglePostsData(slugId);
  return json({ postData: "test" });
}

interface PostDataProps {
  postData: {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    blocks: any[];
  };
}

function blocksRenderer(block: any,) {
  switch (block.__component) {
    case "layout.video":
      return (
        <YouTubePlayer
          id={block.videoId}
          key={block.id}
          playerKey={block.id}
          playlist={block.clip}
        />
      );

    default:
      return null;
  }
}

export default function SinglePreviewBlogRoute() {
  // const data = useLoaderData<typeof loader>() as PostDataProps;

  // const blocks = data.postData?.blocks;
  // const { content } = data.postData;

  return <h1>hello</h1>

  return (
    <div>
      <div>
        {blocks
          ? blocks.map((block) => blocksRenderer(block))
          : null}
      </div>
      <div className="container max-w-[720px] mx-auto my-12">
        <Markdown content={content} />
      </div>
    </div>
  );
}