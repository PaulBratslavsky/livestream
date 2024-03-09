import { type MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getHomePageData } from "~/api/loaders.server";
import { Hero } from "~/components/custom/Hero";

export async function loader() {
  const response = await getHomePageData();
  return json({...response});
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (!data.blocks) return <p>No content found</p>;

  const heroData = data.blocks[0];
  return (
    <div>
      <Hero data={heroData}/>
    </div>
  );
}
