import { YoutubeTranscript } from "youtube-transcript";

async function getTranscript(id: string) {
  try {
    return await YoutubeTranscript.fetchTranscript(id);
  } catch (error) {
    console.error("Failed to get transcript:", error);
    throw error;
  }
}

export async function getYTTranscript(videoId: string) {
    return await getTranscript(videoId);
}