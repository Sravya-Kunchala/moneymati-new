export type BlogArticle = {
  id: string | number;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  href: string;
  image: string;
  date?: string;
  published?: boolean;
  status?: "published" | "draft" | "hidden";
  tags?: string;
};

// Shared blog seed data used by public Blog pages and admin manage blog.
export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    image: "/financial-goals.svg",
    title: "Family's Financial Goals",
    excerpt: "As a hashtag #couple we have some mandatory financial goals as a family and some individual goals...",
    author: "Amit Sharma",
    readTime: "5 min read",
    href: "/sepblog-family",
    date: "2025-10-24",
    status: "published",
    tags: "Family, Goals, Planning",
  },
  {
    id: 2,
    image: "/black-swan.svg",
    title: "How to deal with losses during black swan events?",
    excerpt: "Dealing with substantial portfolio losses during a black swan event requires a combination of emotion...",
    author: "Priya Kapur",
    readTime: "8 min read",
    href: "/sepblog-tax",
    date: "2025-10-21",
    status: "hidden",
    tags: "Risk, Markets, Crisis",
  },
  {
    id: 3,
    image: "/midas.svg",
    title: "The midas touch for your portfolio",
    excerpt: "Add the midas touch to your portfolio. As the founder of Moneymati, I've seen firsthand how a we...",
    author: "Rajesh V.",
    readTime: "6 min read",
    href: "/sepblog-mutual",
    date: "2025-10-19",
    status: "draft",
    tags: "Investing, Mutual Funds",
  },
  {
    id: 4,
    image: "/ulips.svg",
    title: "Problems with ULIPs in India",
    excerpt: "Unit Linked Insurance Plans (ULIPs) have historically faced criticism due to several issues that made them...",
    author: "Sarah M.",
    readTime: "10 min read",
    href: "/sepblog-ulips",
    date: "2025-10-15",
    status: "published",
    tags: "Insurance, ULIP",
  },
];
