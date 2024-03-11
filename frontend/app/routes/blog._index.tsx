import { type LoaderFunctionArgs, json } from "@remix-run/node";

import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
  Scripts,
  Link,
} from "@remix-run/react";

import { formatDate } from "~/lib/utils";
import { getAllPostsData, getPageData } from "~/api/loaders.server";

import { PageHeader } from "~/components/custom/PageHeader";
import { FeaturedPosts } from "~/components/custom/FeaturedPosts";
import { RootErrorComponent } from "~/components/custom/RootErrorComponent";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const pageData = await getPageData("blog");
  const postData = await getAllPostsData();
  return json({
    params: params,
    pageData: pageData.data[0],
    postData: postData,
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

  postData: {
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
    case "layout.post-list":
      return <FeaturedPosts key={index} data={block} />;
    default:
      return null;
  }
}

export default function BlogRoute() {
  const { pageData, postData } = useLoaderData<typeof loader>() as PageData;
  if (!pageData) return null;

  console.dir(postData, { depth: null });

  return (
    <div>
      <section>{pageData.blocks.map(blocksRenderer)}</section>
      <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
        <h2 className="text-4xl font-bold text-pink-500 text-center">All Posts</h2>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {postData.data.map((post) => {
            return (
              <Link
                to={`/blog/${post?.slug}`}
                key={post.id}
                prefetch="intent"
                className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="p-6 space-y-2 relative">
                  <h3 className="text-2xl text-violet-400 font-semibold group-hover:underline group-focus:underline">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-xs text-white">by Paul</span>
                  </div>
                  <p className="py-4 text-white">{post.description}</p>
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
      <RootErrorComponent heading="Oh no! Something went wrong when loading the blog page!">
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
      <RootErrorComponent heading="Oh no! Something went wrong when loading the blog page!">
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
