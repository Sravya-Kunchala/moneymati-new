import { NextResponse } from "next/server";
import { SOCIAL_POSTS, type SocialPost } from "@/data/socialPosts";

const APIFY_DATASET_ID = process.env.APIFY_DATASET_ID;
const APIFY_TOKEN = process.env.APIFY_TOKEN;
const APIFY_LIMIT = Number(process.env.APIFY_LIMIT ?? 6);
const APIFY_LINKEDIN_DATASET_ID = process.env.APIFY_LINKEDIN_DATASET_ID;
const LINKEDIN_LIMIT = Number(process.env.LINKEDIN_LIMIT ?? 1);
const APIFY_TWITTER_DATASET_ID = process.env.APIFY_TWITTER_DATASET_ID;
const TWITTER_LIMIT = Number(process.env.TWITTER_LIMIT ?? 1);
const APIFY_FACEBOOK_DATASET_ID = process.env.APIFY_FACEBOOK_DATASET_ID;
const FACEBOOK_LIMIT = Number(process.env.FACEBOOK_LIMIT ?? 1);

type ApifyItem = {
  id?: string;
  url?: string;
  postUrl?: string;
  post_url?: string;
  link?: string;
  linkedinUrl?: string;
  tweetUrl?: string;
  statusUrl?: string;
  caption?: string;
  text?: string;
  alt?: string;
  imageUrls?: string[];
  firstImage?: string;
  displayUrl?: string;
  thumbnailUrl?: string;
  image_url?: string;
  imageUrl?: string;
  picture?: string;
  images?: { url?: string }[];
  media?: { items?: { url?: string; image?: { url?: string } }[] } | null;
  document?: { cover_images?: { url?: string }[]; coverImages?: { url?: string }[] } | null;
  previewImage?: string;
  preview?: { imageUrl?: string; imageUrls?: string[]; thumbnailUrl?: string };
  contentAttributes?: { previewImage?: { url?: string }; imageUrl?: string; imageUrls?: string[]; mediaUrls?: string[]; thumbnail?: string; content?: string; title?: string };
  content?: string;
  title?: string;
  timestamp?: string | { date?: string; timestamp?: number };
  created_at?: string;
  postedAt?: string;
  postedAtISO?: string;
  postedAtTimestamp?: number;
  posted_at?: { timestamp?: number; date?: string };
  publishedAt?: string;
  createdAt?: string;
  created_time?: string;
  published_time?: string;
  likesCount?: number;
};

const pickPermalink = (item: ApifyItem) =>
  item.url ||
  item.postUrl ||
  item.post_url ||
  item.link ||
  item.linkedinUrl ||
  (item as Record<string, string | undefined>)?.permalink;

const detectSource = (permalink: string | undefined, fallback: "instagram" | "linkedin" | "twitter" | "facebook") => {
  if (permalink?.includes("instagram.com")) return "instagram";
  if (permalink?.includes("linkedin.com")) return "linkedin";
  if (permalink?.includes("twitter.com") || permalink?.includes("x.com")) return "twitter";
  if (permalink?.includes("facebook.com") || permalink?.includes("fb.com")) return "facebook";
  return fallback;
};

const pickImage = (item: ApifyItem) =>
  item.firstImage ||
  item.thumbnailUrl ||
  item.imageUrl ||
  item.image_url ||
  (typeof (item as any).image === "string" ? (item as any).image : undefined) ||
  (typeof (item as any).pictureUrl === "string" ? (item as any).pictureUrl : undefined) ||
  (typeof (item as any).picture_url === "string" ? (item as any).picture_url : undefined) ||
  (typeof (item as any).pictureLargeUrl === "string" ? (item as any).pictureLargeUrl : undefined) ||
  (typeof (item as any).imageHighRes === "string" ? (item as any).imageHighRes : undefined) ||
  (typeof (item as any).image_highres === "string" ? (item as any).image_highres : undefined) ||
  item.picture ||
  (item as any)?.fullPicture ||
  (item as any)?.full_picture ||
  (item as any)?.media?.image?.src ||
  (item as any)?.media?.image?.url ||
  (item as any)?.media?.image ||
  (item as any)?.media?.source ||
  (Array.isArray((item as any)?.photos) ? (item as any).photos[0] : undefined) ||
  (Array.isArray((item as any)?.images) ? (item as any).images[0] : undefined) ||
  (Array.isArray((item as any)?.pictures) ? (item as any).pictures[0] : undefined) ||
  (Array.isArray((item as any)?.attachments?.data)
    ? (item as any).attachments.data[0]?.media?.image?.src ||
      (item as any).attachments.data[0]?.media?.image?.url ||
      (item as any).attachments.data[0]?.media?.image?.uri ||
      (item as any).attachments.data[0]?.media?.source
    : undefined) ||
  (Array.isArray((item as any)?.attachments)
    ? (item as any).attachments[0]?.media?.image?.src ||
      (item as any).attachments[0]?.media?.image?.url ||
      (item as any).attachments[0]?.media?.image?.uri ||
      (item as any).attachments[0]?.media?.source
    : undefined) ||
  item.preview?.imageUrl ||
  item.preview?.imageUrls?.[0] ||
  item.preview?.thumbnailUrl ||
  item.previewImage ||
  item.contentAttributes?.previewImage?.url ||
  item.contentAttributes?.imageUrl ||
  item.contentAttributes?.imageUrls?.[0] ||
  item.contentAttributes?.mediaUrls?.[0] ||
  item.contentAttributes?.thumbnail ||
  (Array.isArray(item.media?.items) ? item.media?.items?.[0]?.url || item.media?.items?.[0]?.image?.url : undefined) ||
  (Array.isArray((item as any).mediaUrls) ? (item as any).mediaUrls[0] : undefined) ||
  item.imageUrls?.[0] ||
  item.displayUrl ||
  item.images?.[0]?.url ||
  item.document?.cover_images?.[0]?.url ||
  item.document?.coverImages?.[0]?.url;

const pickTimestamp = (item: ApifyItem) =>
  (typeof item.timestamp === "object" ? (item.timestamp as any)?.date : item.timestamp) ||
  item.postedAt ||
  item.postedAtISO ||
  item.publishedAt ||
  item.createdAt ||
  item.created_at ||
  item.created_time ||
  item.published_time ||
  (item.posted_at?.date ?? (item.postedAtTimestamp ? new Date(item.postedAtTimestamp).toISOString() : undefined)) ||
  (item.posted_at?.timestamp ? new Date(item.posted_at.timestamp).toISOString() : undefined);

const mapApify = (item: ApifyItem, source: "instagram" | "linkedin" | "twitter" | "facebook" = "instagram"): SocialPost => {
  const permalink = pickPermalink(item);
  const resolvedSource = detectSource(permalink, source);
  const ts = pickTimestamp(item) || new Date().toISOString();
  const captionText =
    item.caption ||
    item.text ||
    item.alt ||
    item.contentAttributes?.content ||
    item.contentAttributes?.title ||
    item.content ||
    item.title ||
    `View this post on ${resolvedSource === "instagram" ? "Instagram" : "LinkedIn"}.`;
  return {
    id: item.id ?? permalink ?? crypto.randomUUID(),
    image: pickImage(item) || "/hero.svg",
    caption: captionText,
    permalink,
    username: resolvedSource === "instagram" ? "instagram" : resolvedSource === "twitter" ? "Twitter" : resolvedSource === "facebook" ? "Facebook" : "LinkedIn",
    timestamp: ts,
    source: resolvedSource,
  };
};

async function fetchFromApify(): Promise<SocialPost[]> {
  if (!APIFY_DATASET_ID || !APIFY_TOKEN) return [];

  try {
    const url = `https://api.apify.com/v2/datasets/${APIFY_DATASET_ID}/items?token=${APIFY_TOKEN}&clean=true`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Apify HTTP ${res.status}`);

    const data = await res.json();
    const items = Array.isArray(data) ? data : [];
    const mapped = items
      .map(mapApify)
      // Allow posts without permalink so they still render; component already shows "No Link" state.
      .filter((p) => p.image);

    // Newest first by timestamp; fallback to original order if no timestamp
    mapped.sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tb - ta;
    });

    return mapped.slice(0, APIFY_LIMIT);
  } catch (err) {
    console.error("apify fetch error", err);
    return [];
  }
}

async function fetchLinkedIn(): Promise<SocialPost[]> {
  if (!APIFY_LINKEDIN_DATASET_ID || !APIFY_TOKEN) return [];
  try {
    const url = `https://api.apify.com/v2/datasets/${APIFY_LINKEDIN_DATASET_ID}/items?token=${APIFY_TOKEN}&clean=true`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`LinkedIn Apify HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : [];
    const mapped = items
      .map((item: ApifyItem) => mapApify(item, "linkedin"))
      .filter((p: SocialPost) => p.image);
    mapped.sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tb - ta;
    });
    return mapped.slice(0, LINKEDIN_LIMIT);
  } catch (err) {
    console.error("linkedin apify fetch error", err);
    return [];
  }
}

async function fetchTwitter(): Promise<SocialPost[]> {
  if (!APIFY_TWITTER_DATASET_ID || !APIFY_TOKEN) return [];
  try {
    const url = `https://api.apify.com/v2/datasets/${APIFY_TWITTER_DATASET_ID}/items?token=${APIFY_TOKEN}&clean=true`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Twitter Apify HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : [];
    const mapped = items
      .map((item: ApifyItem) => {
        const permalink =
          item.tweetUrl ||
          item.statusUrl ||
          item.url ||
          (item.id ? `https://x.com/i/web/status/${item.id}` : undefined);

        const image =
          pickImage(item) ||
          (Array.isArray((item as any).photos) && (item as any).photos[0]?.url) ||
          (Array.isArray((item as any).media) && (item as any).media[0]?.url);

        return {
          id: item.id ?? permalink ?? crypto.randomUUID(),
          image: image || "/hero.svg",
          caption:
            item.text ||
            item.caption ||
            (item as any).full_text ||
            item.content ||
            item.title ||
            "View this post on Twitter",
          permalink,
          username: (item as any).username || (item as any).userName || "Twitter",
          timestamp:
            pickTimestamp(item) ||
            (item as any).created_at ||
            (item as any).createdAt ||
            new Date().toISOString(),
          source: "twitter",
        } satisfies SocialPost;
      })
      .filter((p: SocialPost) => p.image);

    mapped.sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tb - ta;
    });

    return mapped.slice(0, TWITTER_LIMIT);
  } catch (err) {
    console.error("twitter apify fetch error", err);
    return [];
  }
}

async function fetchFacebook(): Promise<SocialPost[]> {
  if (!APIFY_FACEBOOK_DATASET_ID || !APIFY_TOKEN) return [];
  try {
    const url = `https://api.apify.com/v2/datasets/${APIFY_FACEBOOK_DATASET_ID}/items?token=${APIFY_TOKEN}&clean=true`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Facebook Apify HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : [];
    const mapped = items
      .map((item: ApifyItem) =>
        mapApify(
          {
            ...item,
            link: item.link || item.url || item.postUrl || item.post_url,
          },
          "facebook",
        ),
      )
      .filter((p: SocialPost) => p.image);

    mapped.sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tb - ta;
    });

    return mapped.slice(0, FACEBOOK_LIMIT);
  } catch (err) {
    console.error("facebook apify fetch error", err);
    return [];
  }
}

export async function GET() {
  const [insta, linkedin, twitter, facebook] = await Promise.all([fetchFromApify(), fetchLinkedIn(), fetchTwitter(), fetchFacebook()]);

  const instaOrFallback = insta.length ? insta : SOCIAL_POSTS.filter((p) => p.source === "instagram");
  const linkedinOrFallback =
    linkedin.length
      ? linkedin
      : [
          SOCIAL_POSTS.find((p) => p.source === "linkedin") ?? {
            id: "linkedin-static",
            image: "/webinar2.svg",
            caption: "See our latest update on LinkedIn.",
            permalink: "https://www.linkedin.com/company/moneymati/",
            username: "LinkedIn",
            timestamp: new Date().toISOString(),
            source: "linkedin",
          },
        ];

  const twitterFallback = SOCIAL_POSTS.filter((p) => p.source === "twitter");

  const twitterOrFallback = twitter.length ? twitter : twitterFallback;
  const facebookFallback = SOCIAL_POSTS.filter((p) => p.source === "facebook");
  const facebookOrFallback = facebook.length ? facebook : facebookFallback;

  const items = [...instaOrFallback, ...linkedinOrFallback, ...twitterOrFallback, ...facebookOrFallback];
  const source =
    (insta.length ? "instagram-apify" : "instagram-static") +
    "+" +
    (linkedin.length ? "linkedin-apify" : "linkedin-static") +
    "+" +
    (twitter.length ? "twitter-apify" : "twitter-static") +
    "+" +
    (facebook.length ? "facebook-apify" : "facebook-static");

  return NextResponse.json({ items, source });
}
