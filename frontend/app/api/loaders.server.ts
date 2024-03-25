import qs from "qs";
import { flattenAttributes, getStrapiURL } from "~/lib/utils";
import { getYTTranscript } from "~/services/get-yt-transcript.server";

const baseUrl = getStrapiURL();

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

export async function getAllLinksData() {
  const url = new URL("/api/links", baseUrl);
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
      blocks: {
        populate: {
          clip: {
            populate: true,
          },
        },
      },
    },
  });
  return await fetchData(url.href);
}

export async function getSinglePreviewPostsData(slug: string) {
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
      blocks: {
        populate: {
          clip: {
            populate: true,
          },
        },
      },
    },
    publicationState: "preview",
  });
  return await fetchData(url.href);
}

export async function getVideoTranscript(videoId: string) {
  const transcriptData = await getYTTranscript(videoId);
  return {
    data: transcriptData,
  };
}

const testData = [
  {
    text: "while you're all jumping in before we",
    duration: 5339,
    offset: 0,
  },
  {
    text: "continue so what is this this is our",
    duration: 6300,
    offset: 2820,
  },
  {
    text: "monthly strappy best practices AMA where",
    duration: 6300,
    offset: 5339,
  },
  {
    text: "we dive into uh deeper concepts of",
    duration: 4139,
    offset: 9120,
  },
  {
    text: "strappy and talk about some of the",
    duration: 4441,
    offset: 11639,
  },
  {
    text: "intermediate to Advanced topics we also",
    duration: 4921,
    offset: 13259,
  },
];
