import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_URL ?? "https://moneymati.com").replace(/\/$/, "");
const ogImage = `${siteUrl}/bg-image.png`;

export const metadata: Metadata = {
  title: "Moneymati",
  description: "Moneymati App",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/best%20new%20moneymati%20logo.svg", type: "image/svg+xml" },
    ],
    apple: "/best%20new%20moneymati%20logo.svg",
  },
  openGraph: {
    title: "Moneymati | Smarter money decisions, made simple",
    description: "Workshops, tools, and guidance to help you plan and invest with confidence.",
    url: siteUrl,
    siteName: "Moneymati",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Moneymati – Financial confidence for everyone",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/best%20new%20moneymati%20logo.svg" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
