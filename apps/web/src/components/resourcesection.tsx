"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ResourceCard = {
  category: string;
  title: string;
  description: string;
  image: string;
  href?: string;
};

const fallbackResources: ResourceCard[] = [
  {
    category: "BUDGETING",
    title: "The Beginner's Guide to Your First Financial Plan",
    description:
      "Learn the essential steps to creating a financial plan that works for your unique goals and lifestyle.",
    image: "/blog1.svg",
  },
  {
    category: "INVESTING",
    title: "How To Start Investing in Your 20s & 30s: A Beginner's Guide",
    description:
      "Discover the key principles of investing early and building a portfolio that grows with you.",
    image: "/blog2.svg",
  },
  {
    category: "MARKETS",
    title: "Everything You Need to Know About Investing in Stocks for Beginners",
    description:
      "A comprehensive guide to understanding the stock market and making informed investment decisions.",
    image: "/blog3.svg",
  },
];

function normalisePublishedBlogs(rows: any[]): ResourceCard[] {
  return rows
    .filter((row) => row?.title)
    .map((row) => {
      const tag =
        Array.isArray(row?.tags) && row.tags.length
          ? row.tags[0]
          : typeof row?.tags === "string" && row.tags.trim() !== ""
            ? row.tags.split(",")[0]
            : "BLOG";
      const excerpt =
        row?.excerpt && typeof row.excerpt === "string"
          ? row.excerpt
          : row?.content && typeof row.content === "string"
            ? `${row.content.slice(0, 120)}...`
            : "Fresh insight from our latest blog post.";

      return {
        category: (tag || "BLOG").toString().toUpperCase(),
        title: row.title,
        description: excerpt,
        image:
          (row?.coverImage && typeof row.coverImage === "string" && row.coverImage.trim() !== "")
            ? row.coverImage
            : "/blog1.svg",
        href: row?.slug ? `/sepblog/${row.slug}` : undefined,
      };
    });
}

export default function ResourcesSection() {
  const [resources, setResources] = useState<ResourceCard[]>(fallbackResources);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/blog?published=true")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const published = Array.isArray(data?.data) ? normalisePublishedBlogs(data.data) : [];
        if (!published.length) return;
        const merged = [...published, ...fallbackResources].reduce<ResourceCard[]>((acc, item) => {
          const key = (item.title || "").toLowerCase();
          if (key && !acc.some((r) => (r.title || "").toLowerCase() === key)) {
            acc.push(item);
          }
          return acc;
        }, []);
        setResources(merged.slice(0, 3));
      })
      .catch(() => {
        /* If the API fails, we stay on the fallback cards */
        setResources(fallbackResources);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full bg-[#1a3a2a] py-16 px-8">
      <style>{`
        @media (max-width: 767px) {
          .resources-header {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .resources-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="resources-header flex items-start justify-between mb-10">
          <h2 className="text-3xl font-bold text-white leading-snug">
            Resources to{" "}
            <em className="text-[#c9a84c] italic font-serif">Grow</em>
            <br />
            Your Knowledge
          </h2>
         <a href="/Blog">
  <button className="border border-white text-white text-sm px-5 py-2 rounded-full hover:bg-white hover:text-[#1a3a2a] transition-colors mt-2">
    View All Resources
  </button>
</a>
        </div>

        {/* Cards */}
        <div className="resources-grid grid grid-cols-3 gap-6">
          {resources.map(({ category, title, description, image, href }) => {
            const CardWrapper = href ? "a" : "div";
            return (
              <CardWrapper
                key={title}
                className="bg-white rounded-2xl overflow-hidden flex flex-col"
                {...(href ? { href } : {})}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                <span className="text-[#c9a84c] text-xs font-semibold tracking-widest">
                  {category}
                </span>
                <h3 className="text-sm font-bold text-[#1a3a2a] leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {description}
                </p>
              </div>
              </CardWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
