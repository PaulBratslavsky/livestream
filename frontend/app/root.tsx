import { json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getGlobalData } from "~/api/loaders.server";

import styles from "./tailwind.css";
import { TopNav } from "./components/custom/TopNav";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export async function loader() {
  const globalDataResponse = await getGlobalData();
  return json(globalDataResponse);
}

export default function App() {
  const data = useLoaderData<typeof loader>(); 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TopNav data={data.topNav} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
