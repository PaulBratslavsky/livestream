import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPageData } from '~/api/loaders.server';


export async function loader({ params, request }: LoaderFunctionArgs) {
  const { slugId } = params;

  if (!slugId) return json({ error: "No slugId provided" }, { status: 400 });
  const data = await getPageData(slugId);

  console.dir(data, { depth: null })
  return json({  params: params,  data: data.data[0]});
}

interface PageData {
  params: { slugId: string };
  data: {
    id: string;
    title: string;
    slug: string;
    description: string;
  }
}

export default function PageSlugRoute() {
  const data = useLoaderData<typeof loader>() as PageData;
  return (
    <div>
      <p>Dynamic Route in Remix Page Slug Route: {data.params.slugId}</p>
      <h1>{data.data.title}</h1>
      <p>{data.data.description}</p>
      <p>{data.data.slug}</p>
    </div>
  )
}
