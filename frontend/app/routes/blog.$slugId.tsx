import { useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";

import { getSinglePostsData } from "~/api/loaders.server";
import { Markdown } from "~/components/custom/Markdown";

export async function loader({ params, request }: LoaderFunctionArgs) {
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
  };
}

export default function SingleBlogRoute() {
  const data = useLoaderData<typeof loader>() as PostDataProps;
  const { content } = data.postData;
  return (
    <div className="max-w-[720px] mx-auto my-12">
      <Markdown content={content} />
    </div>
  )
}
