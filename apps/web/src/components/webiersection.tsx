import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useEffect, useState } from "react";
import PersonalizeModal from "@/components/confrimation";

const playfair = Playfair_Display({ subsets: ["latin"] });

type PublicWebinar = {
  date: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  status?: "completed" | "live" | "upcoming";
};

const staticWebinars: PublicWebinar[] = [
  {
    date: "March 15, 2026",
    title: "Shubharambh – Make Your Financial Plan",
    description:
      "Learn how to build a diversified investment portfolio from scratch with expert guidance.",
    image: "/webinar1.svg",
    link: "",
  },
  {
    date: "March 22, 2026",
    title: "Nipuna – Equity Investing",
    description:
      "Discover strategies to make your money work harder and grow your wealth faster.",
    image: "/webinar2.svg",
    link: "",
  },
  {
    date: "April 5, 2026",
    title: "Nivritti – Make your Retirement Plan",
    description:
      "A hands-on workshop to help you understand the stock market and make your first investment.",
    image: "/webinar3.svg",
    link: "",
  },
];

function getWebinarStatus(dateStr: string): "completed" | "live" | "upcoming" {
  const webinarDate = new Date(dateStr);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(
    webinarDate.getFullYear(),
    webinarDate.getMonth(),
    webinarDate.getDate()
  );

  if (eventDay < today) return "completed";
  if (eventDay.getTime() === today.getTime()) return "live";
  return "upcoming";
}

function StatusButton({
  status,
  link,
  onRegister,
}: {
  status: "completed" | "live" | "upcoming";
  link?: string;
  onRegister: (link?: string) => void;
}) {
  if (status === "completed") {
    return (
      <button
        disabled
        className="bg-[#f5f0e8] text-[#1a3a2a] text-xs font-semibold px-5 py-2 rounded-full w-fit cursor-not-allowed opacity-90"
      >
        Completed
      </button>
    );
  }

  if (status === "live") {
    return (
      <a
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#4CAF50] text-white text-xs font-semibold px-5 py-2 rounded-full w-fit hover:bg-[#43a047] transition-colors inline-block"
      >
        Join Now
      </a>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        disabled
        className="bg-[#C6A553] text-[#1a3a2a] text-xs font-semibold px-5 py-2 rounded-full w-fit cursor-default opacity-90"
      >
        Up-Coming
      </button>
      <button
        type="button"
        onClick={() => onRegister(link)}
        className="bg-[#4CAF50] text-white text-xs font-semibold px-5 py-2 rounded-full w-fit hover:bg-[#43a047] transition-colors inline-block"
      >
        Register Now
      </button>
    </div>
  );
}

export default function WebinarsSection() {
  const STORAGE_KEY = "personalize_submitted";
  const [showConfirm, setShowConfirm] = useState(false);
  const [webinars, setWebinars] = useState<PublicWebinar[]>(staticWebinars);
  const [pendingLink, setPendingLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/webinars");
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped = items.map((w: any, idx: number) => {
          const status = typeof w.status === "string" ? w.status.toLowerCase() : undefined;
          return {
            date: w.scheduledAt ?? w.date ?? w.createdAt ?? new Date().toISOString(),
            title: w.title ?? `Webinar ${idx + 1}`,
            description: w.description ?? "Join us to learn more about personal finance and investing.",
            link: w.link ?? "#",
            image: "/webinar1.svg",
            status: status === "live" || status === "completed" || status === "upcoming" ? status : undefined,
          } satisfies PublicWebinar;
        });
        const merged = mapped.length ? mapped : [];
        const padded = [...merged];
        for (const seed of staticWebinars) {
          if (padded.length >= 3) break;
          if (!padded.find((p) => p.title === seed.title)) padded.push(seed);
        }
        while (padded.length < 3) padded.push(staticWebinars[padded.length % staticWebinars.length]);
        setWebinars(padded);
      } catch (err) {
        console.error("Failed to load webinars", err);
        if (!cancelled) setWebinars(staticWebinars);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={`${playfair.variable} w-full bg-[#f5f0e8] py-16 px-8`}>
      <style>{`
        @media (max-width: 767px) {
          .webinars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1a3a2a] leading-snug text-center">
            Upcoming Webinars &amp; <br /> Workshops
          </h2>
        </div>

        <div className="webinars-grid grid grid-cols-3 gap-6">
          {webinars.map(({ date, title, description, image, link, status: apiStatus }, idx) => {
            const status = apiStatus ?? getWebinarStatus(date);

            return (
              <div
                key={`${title}-${date}-${idx}`}
                className="flex flex-col rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="h-52 relative">
                  <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={220}
                    className="object-cover w-full h-full"
                  />
                  {status === "live" && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                      • Live
                    </span>
                  )}
                </div>

                <div className="bg-[#1a3a2a] p-5 flex flex-col gap-3 flex-1">
                  <span className="text-[#C6A553] text-xs">{new Date(date).toDateString()}</span>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed flex-1">
                    {description}
                  </p>
          <StatusButton
            status={status}
            link={link}
            onRegister={(destination?: string) => {
              if (typeof window !== "undefined") {
                const done = window.localStorage.getItem(STORAGE_KEY) === "1";
                if (done && destination) {
                  window.open(destination, "_blank", "noopener,noreferrer");
                  return;
                }
              }
              setPendingLink(destination);
              setShowConfirm(true);
            }}
          />
        </div>
      </div>
    );
  })}
        </div>
      </div>
      {showConfirm && (
        <PersonalizeModal
          onClose={() => {
            setShowConfirm(false);
            // If already submitted earlier, still allow redirect on close
            if (pendingLink && typeof window !== "undefined") {
              const done = window.localStorage.getItem(STORAGE_KEY) === "1";
              if (done) {
                window.open(pendingLink, "_blank", "noopener,noreferrer");
                setPendingLink(undefined);
              }
            }
          }}
          onSuccess={() => {
            // Immediately redirect after successful submit
            if (pendingLink) {
              window.open(pendingLink, "_blank", "noopener,noreferrer");
              setPendingLink(undefined);
            }
            setShowConfirm(false);
          }}
        />
      )}
    </section>
  );
}
