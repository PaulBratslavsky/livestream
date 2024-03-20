import { useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";

import { getSinglePostsData } from "~/api/loaders.server";
import { Markdown } from "~/components/custom/Markdown";
import { CodeEditor } from "~/components/custom/CodeEditor";
import { PlayerAndControls } from "~/components/custom/YouTubePlayerV2/PlayerAndControls";

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
  const slugId = params.slugId;
  if (!slugId) return json({ message: "No slugId provided" }, { status: 400 });
  const postData = await getSinglePostsData(slugId);
  return json({ postData: postData.data[0] });
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

function blocksRenderer(block: any) {
  switch (block.__component) {
    case "layout.video":
      return (
        <PlayerAndControls
          videoId={block.videoId}
          playlist={block.clip}
          title={block.title}
          description={block.description}
        />
      );

    case "layout.code":
      return <CodeEditor data={block} />;

    default:
      return null;
  }
}

export default function SingleBlogRoute() {
  const data = useLoaderData<typeof loader>() as PostDataProps;

  const blocks = data.postData?.blocks;
  const { content } = data.postData;

  return (
    <div>
      <div>{blocks ? blocks.map((block) => blocksRenderer(block)) : null}</div>
      <div className="container max-w-[720px] mx-auto my-12">
        <Markdown content={content} />
      </div>
    </div>
  );
}
