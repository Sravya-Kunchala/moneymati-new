export type SocialPost = {
  id: string;
  image: string;
  caption: string;
  permalink?: string;
  username?: string;
  timestamp?: string;
  source?: string;
};

// Single source of truth for homepage social cards. Update this list to change
// what appears on the site without touching components.
export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "instagram-1",
    image: "/bg-image.png",
    caption: "Behind the scenes of how we plan each MoneyMati workshop.",
    permalink: "https://www.instagram.com/moneymati2022/",
    username: "moneymati2022",
    timestamp: "2026-03-15T10:00:00Z",
    source: "instagram",
  },
  {
    id: "twitter-1",
    image: "/hero.svg",
    caption: "3 quick tips to get your first SIP right—thread on X.",
    permalink: "https://x.com/imoneymati",
    username: "imoneymati",
    timestamp: "2026-03-12T08:30:00Z",
    source: "twitter",
  },
  {
    id: "facebook-1",
    image: "/webinar1.svg",
    caption: "Highlights from our latest community Q&A on budgeting habits.",
    permalink: "https://www.facebook.com/MoneymatiOfficial/",
    username: "MoneyMati",
    timestamp: "2026-03-10T14:15:00Z",
    source: "facebook",
  },
  {
    id: "linkedin-1",
    image: "/webinar2.svg",
    caption: "New blog: building an emergency fund with goal-based investing.",
    permalink: "https://www.linkedin.com/company/moneymati/",
    username: "MoneyMati",
    timestamp: "2026-03-08T09:45:00Z",
    source: "linkedin",
  },
];
