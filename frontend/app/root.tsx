import { json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { getGlobalData } from "~/api/loaders.server";

import styles from "./tailwind.css";

import { RootErrorComponent } from "~/components/custom/RootErrorComponent";
import { TopNav } from "~/components/custom/TopNav";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader() {
  const globalDataResponse = await getGlobalData();
  return json({ globalDataResponse, ENV });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <RootErrorComponent>
        <p className="mb-4 text-4xl font-bold text-pink-600 dark:text-gray-100">
          {error.status} {error.statusText}
        </p>
        <p>{error.data}</p>
      </RootErrorComponent>
    );
  } else if (error instanceof Error) {
    return (
      <RootErrorComponent>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <p>{error.stack}</p>
      </RootErrorComponent>
    );
  } else {
    return (
      <html lang="en">
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <h1>Unknown Error</h1>;
          <Scripts />
        </body>
      </html>
    );
  }
}

export default function App() {
  const { globalDataResponse, ENV} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TopNav data={globalDataResponse.topNav} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}
