import { NextResponse } from "next/server";
import { SOCIAL_POSTS } from "@/data/socialPosts";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  username?: string;
};

type InstagramMediaResponse = {
  data?: InstagramMedia[];
  error?: {
    message?: string;
  };
};

export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 4;
const DEFAULT_FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
  "username",
].join(",");

const getInstagramLimit = () => {
  const limit = Number(process.env.INSTAGRAM_MEDIA_LIMIT);
  return Number.isFinite(limit) && limit > 0 ? Math.min(limit, 12) : DEFAULT_LIMIT;
};

const getInstagramEndpoint = () => {
  if (process.env.INSTAGRAM_MEDIA_URL) {
    return process.env.INSTAGRAM_MEDIA_URL;
  }

  const baseUrl = process.env.INSTAGRAM_GRAPH_BASE_URL ?? "https://graph.instagram.com";
  const apiVersion = process.env.INSTAGRAM_GRAPH_VERSION ?? "v24.0";
  const userId = process.env.INSTAGRAM_USER_ID ?? "me";

  return `${baseUrl.replace(/\/$/, "")}/${apiVersion}/${userId}/media`;
};

const mapInstagramMedia = (media: InstagramMedia) => {
  const image = media.thumbnail_url || media.media_url || "";

  return {
    id: `instagram-${media.id}`,
    image,
    caption: media.caption || "New update from MoneyMati on Instagram.",
    permalink: media.permalink,
    username: media.username || "moneymatiofficial",
    timestamp: media.timestamp,
    source: "instagram",
  };
};

async function getInstagramPosts() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) return [];

  const url = new URL(getInstagramEndpoint());
  url.searchParams.set("fields", process.env.INSTAGRAM_MEDIA_FIELDS ?? DEFAULT_FIELDS);
  url.searchParams.set("limit", String(getInstagramLimit()));
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url, {
    cache: "no-store",
  });

  const payload = (await response.json()) as InstagramMediaResponse;
  if (!response.ok) {
    throw new Error(payload.error?.message || "Instagram feed request failed");
  }

  return (payload.data ?? []).map(mapInstagramMedia).filter((post) => post.image);
}

export async function GET() {
  try {
    const instagramPosts = await getInstagramPosts();

    if (instagramPosts.length) {
      return NextResponse.json({
        items: instagramPosts,
        source: "live",
      });
    }
  } catch (error) {
    console.warn("Instagram feed unavailable:", error);
  }

  return NextResponse.json({
    items: SOCIAL_POSTS,
    source: "static",
  });
}
