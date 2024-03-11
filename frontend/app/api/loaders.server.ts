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

export async function getPageData(slug: string) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  });

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getGlobalData() {
  const query = qs.stringify({
    populate: ["topNav.logoLink", "topNav.navItem"],
  });

  const url = `${baseUrl}/api/global?${query}`;
  return await fetchData(url);
}

export async function getHomePageData() {
  const query = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          buttonLink: {
            populate: true,
          },
        },
      },
    },
  });

  const url = `${baseUrl}/api/home-page?${query}`;
  return fetchData(url);
}

export async function getAllMusicData() {
  const url = new URL("/api/songs", baseUrl);

  url.search = qs.stringify({
    sort: ["createdAt:desc"],
    populate: {
      artist: {
        fields: ["name"],
      },
      image: {
        fields: ["url", "alternativeText"],
      },
      audio: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  return await fetchData(url.href);
}

export async function getAllPostsData() {
  const url = new URL("/api/posts", baseUrl);
  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });
  return await fetchData(url.href);
}

export async function getSinglePostsData(slug: string) {
  const url = new URL("/api/posts", baseUrl);
  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });
  return await fetchData(url.href);
}
