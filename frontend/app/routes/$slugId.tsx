import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { getPageData } from "~/api/loaders.server";
import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
  Scripts,
} from "@remix-run/react";

import { PageHeader} from "~/components/custom/PageHeader";
import { RootErrorComponent } from "~/components/custom/RootErrorComponent";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { slugId } = params;

  if (!slugId) return json({ error: "No slugId provided" }, { status: 400 });
  const data = await getPageData(slugId);
  console.dir(data, { depth: null });

  console.dir(data.data[0], { depth: null });
  return json({ params: params, data: data.data[0] });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <RootErrorComponent heading="Oh no! Something went wrong when loading the dynamic route!">
        <div>
          <p className="mb-4 text-4xl font-bold text-pink-600 dark:text-gray-100">
            {error.status} {error.statusText}
          </p>
          <p>{error.data}</p>
        </div>
      </RootErrorComponent>
    );
  } else if (error instanceof Error) {
    return (
      <RootErrorComponent heading="Oh no! Something went wrong when loading the dynamic route!">
        <div>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <p>{error.stack}</p>
        </div>
      </RootErrorComponent>
    );
  } else {
    return (
      <RootErrorComponent heading="Oh no! Something went wrong when loading the dynamic route!">
        <div>
          <h1>Unknown Error</h1>;
        </div>
        <Scripts />
      </RootErrorComponent>
    );
  }
}

interface PageData {
  params: { slugId: string };
  data: {
    id: string;
    title: string;
    slug: string;
    description: string;
    blocks: any[];
  };
}

function blocksRenderer(block: any, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <PageHeader key={index} data={block} />;
    default:
      return null;
  }
}

export default function PageSlugRoute() {
  const { data } = useLoaderData<typeof loader>() as PageData;
  console.dir(data.blocks, { depth: null });
  return <div>{data.blocks.map(blocksRenderer)}</div>;
}
