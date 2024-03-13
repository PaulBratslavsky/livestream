import { type LoaderFunctionArgs, json } from "@remix-run/node";

import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
  Scripts,
  Link,
} from "@remix-run/react";

import { formatDate } from "~/lib/utils";
import { getAllLinksData, getPageData } from "~/api/loaders.server";

import { PageHeader } from "~/components/custom/PageHeader";
import { RootErrorComponent } from "~/components/custom/RootErrorComponent";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const pageData = await getPageData("links");
  const linksData = await getAllLinksData();
  return json({
    params: params,
    pageData: pageData.data[0],
    linksData: linksData,
  });
}

interface PageData {
  params: { slugId: string };
  pageData: {
    id: string;
    title: string;
    slug: string;
    description: string;
    blocks: any[];
  };

  linksData: {
    data: any[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
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

export default function BlogRoute() {
  const { pageData, linksData } = useLoaderData<typeof loader>() as PageData;
  if (!pageData) return null;

  console.dir(linksData, { depth: null });

  return (
    <div>
      <section>{pageData.blocks.map(blocksRenderer)}</section>
      <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {linksData.data.map((link) => {
            return (
              <Link
                to={link.link}
                target="_blank"
                key={link.id}
              >
                <div className="p-6 space-y-2 relative">
                  <h3 className="text-2xl text-violet-600 font-semibold">
                    {link.title}
                  </h3>

                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">
                      {formatDate(link.publishedAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <RootErrorComponent heading="Oh no! Something went wrong when loading the links page!">
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
      <RootErrorComponent heading="Oh no! Something went wrong when loading the links page!">
        <div>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <p>{error.stack}</p>
        </div>
      </RootErrorComponent>
    );
  } else {
    return (
      <RootErrorComponent heading="Oh no! Something went wrong when loading links page!">
        <div>
          <h1>Unknown Error</h1>;
        </div>
        <Scripts />
      </RootErrorComponent>
    );
  }
}
