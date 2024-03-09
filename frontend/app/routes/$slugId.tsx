import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPageData } from '~/api/loaders.server';

import { MusicHeading } from '~/components/custom/MusicHeader';


export async function loader({ params, request }: LoaderFunctionArgs) {
  const { slugId } = params;

  if (!slugId) return json({ error: "No slugId provided" }, { status: 400 });
  const data = await getPageData(slugId);
  console.dir(data, { depth: null });


  console.dir(data.data[0], { depth: null })
  return json({  params: params,  data: data.data[0]});
}

interface PageData {
  params: { slugId: string };
  data: {
    id: string;
    title: string;
    slug: string;
    description: string;
    blocks: any[];
  }
}

function blocksRenderer(block: any, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <MusicHeading key={index} data={block} />
    default:
      return null;
  }

}

export default function PageSlugRoute() {
  const { data } = useLoaderData<typeof loader>() as PageData;
  console.dir(data.blocks, { depth: null });
  return <div>{data.blocks.map(blocksRenderer)}</div>
}
