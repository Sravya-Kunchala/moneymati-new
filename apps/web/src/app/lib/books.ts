// app/lib/books.ts
"use client";
// app/lib/books.ts

export interface BookMeta {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  pdf: string;
  cover: string;
  cardImage: string;
  ctaLabel: string;
  ctaIcon: "read" | "download";
  features: { title: string; description: string }[];
}

export const BOOKS: BookMeta[] = [
  {
    id: 1,
    title: "5 Investing Mistakes",
    subtitle: "You Must Avoid",
    description: "Protect your capital by understanding common psychological and technical pitfalls in modern markets.",
    category: "INVESTING",
    categoryColor: "#EC5B13",
    date: "Oct 24, 2023 · By Admin",
    readTime: "8 min read",
    pdf: "/ebook1.pdf",
    cover: "/e-bookchapter.svg",
    cardImage: "/i1.svg",
    ctaLabel: "Read Guide",
    ctaIcon: "read",
    features: [
      { title: "Behavioural Traps",  description: "Identify emotions that silently erode your returns." },
      { title: "Risk Calibration",   description: "Match your portfolio risk to your actual risk tolerance." },
      { title: "Entry & Exit Rules", description: "Systematic rules that remove guesswork." },
      { title: "Long-term Vision",   description: "Mapping out 5, 10, and 20-year financial milestones." },
    ],
  },
  {
    id: 2,
    title: "Top Government",
    subtitle: "Saving Schemes",
    description: "Detailed comparison of PPF, SSY, and SCSS for risk-free long-term wealth accumulation.",
    category: "GOVERNMENT",
    categoryColor: "#EC5B13",
    date: "Oct 20, 2023 · By Admin",
    readTime: "6 min read",
    pdf: "/ebook2.pdf",
    cover: "/e-book.svg",
    cardImage: "/i2 (2).svg",
    ctaLabel: "Download PDF",
    ctaIcon: "download",
    features: [
      { title: "PPF Deep Dive",     description: "Why the Public Provident Fund remains a cornerstone." },
      { title: "SSY for Daughters", description: "Sukanya Samriddhi Yojana — the ultimate girl-child scheme." },
      { title: "SCSS Returns",      description: "Senior Citizens' Savings Scheme rates & eligibility." },
      { title: "Zero Risk",         description: "Government-backed instruments with guaranteed returns." },
    ],
  },
  {
    id: 3,
    title: "Highest Paying Jobs",
    subtitle: "of 2024",
    description: "A roadmap to high-income careers in fintech, AI, and sustainable energy sectors.",
    category: "CAREER",
    categoryColor: "#EC5B13",
    date: "Oct 15, 2023 · By Admin",
    readTime: "7 min read",
    pdf: "/ebook3.pdf",
    cover: "/e-bookchapter.svg",
    cardImage: "/i3 (2).svg",
    ctaLabel: "Download PDF",
    ctaIcon: "download",
    features: [
      { title: "Fintech Roles",   description: "Top-paying roles in India's booming fintech sector." },
      { title: "AI & ML Careers", description: "Why AI engineers command premium salaries globally." },
      { title: "Green Energy",    description: "Sustainable energy jobs that pay well and matter." },
      { title: "Upskilling Path", description: "Certifications that fast-track your income growth." },
    ],
  },
  {
    id: 4,
    title: "Start Early,",
    subtitle: "Be Wealthy!",
    description: "The math behind compounding and why starting at 20 is better than starting at 30.",
    category: "PLANNING",
    categoryColor: "#EC5B13",
    date: "Oct 12, 2023 · By Admin",
    readTime: "9 min read",
    pdf: "/ebook.pdf",
    cover: "/e-bookchapter.svg",
    cardImage: "/i4 (2).svg",
    ctaLabel: "Read Online",
    ctaIcon: "read",
    features: [
      { title: "Growth Mindset",   description: "Learn to identify high-yield opportunities in emerging markets." },
      { title: "Risk Mitigation",  description: "How to diversify your portfolio to weather economic storms." },
      { title: "Savings Hacks",    description: "Automate your finances to save 30% more without effort." },
      { title: "Long-term Vision", description: "Mapping out your 5, 10, and 20-year financial milestones." },
    ],
  },
];

export const PUBLICATIONS = BOOKS;

export function getBook(id: number): BookMeta | undefined {
  return BOOKS.find((b) => b.id === id);
}