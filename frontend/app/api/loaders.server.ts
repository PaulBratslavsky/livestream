import qs from "qs";
import { flattenAttributes } from "~/lib/utils";

const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export async function getGlobalData() {
  const query = qs.stringify({
    populate: [
      "topNav.logoLink",
      "topNav.navItem",
    ],
  });

  const url = `${baseUrl}/api/global?${query}`;
  return fetchData(url);
}

